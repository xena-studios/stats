"use client";

import { useEffect, useRef } from "react";

interface WaveConfig {
	offset: number;
	amplitude: number;
	frequency: number;
	color: string;
	opacity: number;
}

interface Point {
	x: number;
	y: number;
}

export function GlowyWaves() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const mouseRef = useRef<Point>({ x: 0, y: 0 });
	const targetMouseRef = useRef<Point>({ x: 0, y: 0 });
	const frameRef = useRef(0);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return undefined;

		const ctx = canvas.getContext("2d");
		if (!ctx) return undefined;

		let animationId: number | undefined;
		let time = 0;
		let isVisible = true;
		let isInViewport = false;
		let observer: IntersectionObserver | undefined;
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;

		if (prefersReducedMotion) {
			return undefined;
		}

		const waves: WaveConfig[] = [
			{
				offset: 0.55,
				amplitude: 40,
				frequency: 0.008,
				color: "59, 130, 246",
				opacity: 0.12,
			},
			{
				offset: 0.6,
				amplitude: 50,
				frequency: 0.006,
				color: "99, 102, 241",
				opacity: 0.1,
			},
			{
				offset: 0.65,
				amplitude: 35,
				frequency: 0.01,
				color: "139, 92, 246",
				opacity: 0.08,
			},
			{
				offset: 0.7,
				amplitude: 45,
				frequency: 0.007,
				color: "59, 130, 246",
				opacity: 0.06,
			},
		];

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
			const rect = canvas.getBoundingClientRect();
			canvas.width = rect.width * dpr;
			canvas.height = rect.height * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		const drawWave = (
			w: number,
			h: number,
			wave: WaveConfig,
			t: number,
			mouse: Point
		) => {
			ctx.beginPath();
			const baseY = h * wave.offset;
			const step = w < 768 ? 4 : 3;

			for (let x = 0; x <= w; x += step) {
				const distX = (x - mouse.x) / w;
				const mouseInfluence = Math.exp(-distX * distX * 8) * 30;

				const y =
					baseY +
					Math.sin(x * wave.frequency + t * 0.8 + wave.offset * 10) *
						wave.amplitude +
					Math.sin(x * wave.frequency * 0.5 + t * 0.4) * wave.amplitude * 0.5 +
					mouseInfluence;

				if (x === 0) {
					ctx.moveTo(x, y);
				} else {
					ctx.lineTo(x, y);
				}
			}

			ctx.lineTo(w, h);
			ctx.lineTo(0, h);
			ctx.closePath();

			const gradient = ctx.createLinearGradient(
				0,
				baseY - wave.amplitude,
				0,
				h
			);
			gradient.addColorStop(0, `rgba(${wave.color}, ${wave.opacity})`);
			gradient.addColorStop(0.5, `rgba(${wave.color}, ${wave.opacity * 0.4})`);
			gradient.addColorStop(1, `rgba(${wave.color}, 0)`);
			ctx.fillStyle = gradient;
			ctx.fill();
		};

		const animate = () => {
			if (!isVisible || !isInViewport) {
				return;
			}

			frameRef.current += 1;
			if (frameRef.current % 2 !== 0) {
				animationId = requestAnimationFrame(animate);
				return;
			}

			const rect = canvas.getBoundingClientRect();
			const w = rect.width;
			const h = rect.height;

			mouseRef.current.x +=
				(targetMouseRef.current.x - mouseRef.current.x) * 0.05;
			mouseRef.current.y +=
				(targetMouseRef.current.y - mouseRef.current.y) * 0.05;

			ctx.clearRect(0, 0, w, h);
			time += 0.015;

			for (const wave of waves) {
				drawWave(w, h, wave, time, mouseRef.current);
			}

			animationId = requestAnimationFrame(animate);
		};

		const startAnimation = () => {
			if (animationId || !isVisible || !isInViewport) {
				return;
			}
			resize();
			animationId = requestAnimationFrame(animate);
		};

		const stopAnimation = () => {
			if (!animationId) {
				return;
			}
			cancelAnimationFrame(animationId);
			animationId = undefined;
		};

		const handleMouseMove = (e: PointerEvent) => {
			const rect = canvas.getBoundingClientRect();
			targetMouseRef.current = {
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			};
		};

		const handleVisibilityChange = () => {
			isVisible = document.visibilityState === "visible";
			if (isVisible) startAnimation();
			if (!isVisible) stopAnimation();
		};

		observer = new IntersectionObserver(
			([entry]) => {
				isInViewport = entry.isIntersecting;
				if (isInViewport) startAnimation();
				if (!isInViewport) stopAnimation();
			},
			{ threshold: 0.15 }
		);
		observer.observe(canvas);

		window.addEventListener("resize", resize);
		window.addEventListener("pointermove", handleMouseMove, { passive: true });
		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			stopAnimation();
			window.removeEventListener("resize", resize);
			window.removeEventListener("pointermove", handleMouseMove);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			observer?.disconnect();
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="pointer-events-none absolute inset-0 h-full w-full"
		/>
	);
}
