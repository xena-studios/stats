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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let animationId: number;
    let time = 0;

    const waves: WaveConfig[] = [
      { offset: 0.55, amplitude: 40, frequency: 0.008, color: "59, 130, 246", opacity: 0.12 },
      { offset: 0.6, amplitude: 50, frequency: 0.006, color: "99, 102, 241", opacity: 0.1 },
      { offset: 0.65, amplitude: 35, frequency: 0.01, color: "139, 92, 246", opacity: 0.08 },
      { offset: 0.7, amplitude: 45, frequency: 0.007, color: "59, 130, 246", opacity: 0.06 },
    ];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
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

      for (let x = 0; x <= w; x += 2) {
        const distX = (x - mouse.x) / w;
        const mouseInfluence = Math.exp(-distX * distX * 8) * 30;

        const y =
          baseY +
          Math.sin(x * wave.frequency + t * 0.8 + wave.offset * 10) * wave.amplitude +
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

      const gradient = ctx.createLinearGradient(0, baseY - wave.amplitude, 0, h);
      gradient.addColorStop(0, `rgba(${wave.color}, ${wave.opacity})`);
      gradient.addColorStop(0.5, `rgba(${wave.color}, ${wave.opacity * 0.4})`);
      gradient.addColorStop(1, `rgba(${wave.color}, 0)`);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, w, h);
      time += 0.015;

      for (const wave of waves) {
        drawWave(w, h, wave, time, mouseRef.current);
      }

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
