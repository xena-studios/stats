import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
	end: number;
	duration?: number;
	decimals?: number;
	startOnView?: boolean;
}

function easeOutExpo(t: number): number {
	return t === 1 ? 1 : 1 - 2 ** (-10 * t);
}

export function useCountUp({
	end,
	duration = 2000,
	decimals = 0,
	startOnView = true,
}: UseCountUpOptions) {
	const [value, setValue] = useState(0);
	const ref = useRef<HTMLElement>(null);
	const frameRef = useRef<number>(0);

	useEffect(() => {
		const element = ref.current;
		let started = false;

		function runAnimation() {
			if (started) return;
			started = true;

			const startTime = performance.now();

			function animate(currentTime: number) {
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / duration, 1);
				const easedProgress = easeOutExpo(progress);

				const currentValue = easedProgress * end;
				setValue(
					decimals > 0
						? Number.parseFloat(currentValue.toFixed(decimals))
						: Math.round(currentValue)
				);

				if (progress < 1) {
					frameRef.current = requestAnimationFrame(animate);
				}
			}

			frameRef.current = requestAnimationFrame(animate);
		}

		// Run immediately if we don't need to wait for visibility
		if (!startOnView) {
			runAnimation();
			return () => cancelAnimationFrame(frameRef.current);
		}

		if (!element) return;

		// Start animation when the element scrolls into view
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						runAnimation();
						observer.disconnect();
					}
				}
			},
			{ threshold: 0.1 }
		);

		observer.observe(element);

		return () => {
			observer.disconnect();
			cancelAnimationFrame(frameRef.current);
		};
	}, [end, duration, decimals, startOnView]);

	return { value, ref };
}
