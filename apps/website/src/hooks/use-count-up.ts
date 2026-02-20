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
	const hasStartedRef = useRef(false);
	const frameRef = useRef<number>(0);

	useEffect(() => {
		const element = ref.current;

		function runAnimation() {
			if (hasStartedRef.current) return;
			hasStartedRef.current = true;

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

		if (!startOnView) {
			runAnimation();
			return;
		}

		if (!element) return;

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
			if (frameRef.current) cancelAnimationFrame(frameRef.current);
		};
	}, [end, duration, decimals, startOnView]);

	return { value, ref };
}
