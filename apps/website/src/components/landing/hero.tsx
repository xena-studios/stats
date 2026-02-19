import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { GlowyWaves } from "./glowy-waves";

const containerVariants: Variants = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, staggerChildren: 0.12 },
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 24 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const statsVariants: Variants = {
	hidden: { opacity: 0, scale: 0.95 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 },
	},
};

const highlightPills = [
	"Real-time analytics",
	"Zero config",
	"No open ports",
] as const;

const chartBars = [
	{ id: "b01", h: 35 },
	{ id: "b02", h: 45 },
	{ id: "b03", h: 40 },
	{ id: "b04", h: 60 },
	{ id: "b05", h: 55 },
	{ id: "b06", h: 70 },
	{ id: "b07", h: 65 },
	{ id: "b08", h: 80 },
	{ id: "b09", h: 75 },
	{ id: "b10", h: 85 },
	{ id: "b11", h: 90 },
	{ id: "b12", h: 70 },
	{ id: "b13", h: 65 },
	{ id: "b14", h: 78 },
	{ id: "b15", h: 82 },
	{ id: "b16", h: 88 },
	{ id: "b17", h: 72 },
	{ id: "b18", h: 68 },
	{ id: "b19", h: 75 },
	{ id: "b20", h: 90 },
	{ id: "b21", h: 85 },
	{ id: "b22", h: 92 },
	{ id: "b23", h: 88 },
	{ id: "b24", h: 78 },
] as const;

function CountUpStat({
	label,
	end,
	suffix,
	prefix,
	decimals = 0,
}: {
	label: string;
	end: number;
	suffix?: string;
	prefix?: string;
	decimals?: number;
}) {
	const [displayValue, setDisplayValue] = useState(0);
	const hasAnimated = useRef(false);
	const elementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = elementRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !hasAnimated.current) {
					hasAnimated.current = true;
					observer.disconnect();

					const duration = 2200;
					const startTime = performance.now();

					function animate(currentTime: number) {
						const elapsed = currentTime - startTime;
						const progress = Math.min(elapsed / duration, 1);
						const eased = progress === 1 ? 1 : 1 - 2 ** (-10 * progress);
						const current = eased * end;

						setDisplayValue(
							decimals > 0
								? Number.parseFloat(current.toFixed(decimals))
								: Math.round(current)
						);

						if (progress < 1) {
							requestAnimationFrame(animate);
						}
					}

					requestAnimationFrame(animate);
				}
			},
			{ threshold: 0.5 }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [end, decimals]);

	const formattedValue =
		decimals > 0
			? displayValue.toFixed(decimals)
			: displayValue.toLocaleString("en-US");

	return (
		<motion.div
			ref={elementRef}
			variants={itemVariants}
			className="text-center"
		>
			<p className="font-bold text-3xl text-foreground tabular-nums tracking-tight md:text-4xl">
				{prefix}
				{formattedValue}
				{suffix}
			</p>
			<p className="mt-1.5 text-muted-foreground text-xs uppercase tracking-wide">
				{label}
			</p>
		</motion.div>
	);
}

export function Hero() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const isInView = useInView(sectionRef, { amount: 0.2 });

	return (
		<section
			ref={sectionRef}
			className="relative flex min-h-dvh items-center overflow-hidden"
		>
			{/* Glowy waves canvas background */}
			<GlowyWaves />

			{/* Radial glow overlay */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute top-0 left-1/2 h-155 w-245 -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
				<div className="absolute right-0 bottom-0 left-0 h-32 bg-linear-to-t from-background to-transparent" />
			</div>

			<div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24 pb-20">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="text-center"
				>
					{/* Badge */}
					<motion.div
						variants={itemVariants}
						className="mb-8 flex justify-center"
					>
						<div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/9 px-4 py-1.5 text-primary text-sm backdrop-blur-sm">
							<span className="relative flex h-2 w-2">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
								<span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
							</span>
							Now supporting Paper, Spigot & Purpur
						</div>
					</motion.div>

					{/* Headline */}
					<motion.h1
						variants={itemVariants}
						className="text-balance font-bold text-4xl text-foreground tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
					>
						Minecraft Server Analytics
						<br />
						<span className="bg-linear-to-r from-[#7ca0ff] via-[#6c8ff8] to-[#7397ff] bg-clip-text text-transparent">
							Without the Hassle
						</span>
					</motion.h1>

					{/* Subheadline */}
					<motion.p
						variants={itemVariants}
						className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground leading-relaxed md:text-xl"
					>
						Install one plugin. Link your server. Done. No hosting, no open
						ports, no headaches.
					</motion.p>

					{/* CTAs */}
					<motion.div
						variants={itemVariants}
						className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
					>
						<Button
							size="lg"
							className="group h-12 gap-2 bg-primary px-8 text-base text-primary-foreground shadow-lg shadow-primary/35 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/45 hover:shadow-xl"
						>
							Get Started Free
							<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
						</Button>
						<Button
							variant="outline"
							size="lg"
							className="h-12 gap-2 border-primary/20 bg-secondary/20 px-8 text-base text-foreground backdrop-blur-sm hover:bg-secondary/60"
						>
							<BookOpen className="h-4 w-4" />
							View Docs
						</Button>
					</motion.div>

					{/* Highlight pills */}
					<motion.div
						variants={itemVariants}
						className="mt-10 flex flex-wrap items-center justify-center gap-3"
					>
						{highlightPills.map((pill) => (
							<span
								key={pill}
								className="inline-flex items-center rounded-full border border-border/40 bg-secondary/30 px-3.5 py-1.5 text-muted-foreground text-xs backdrop-blur-sm"
							>
								{pill}
							</span>
						))}
					</motion.div>

					{/* Stats */}
					<motion.div
						variants={statsVariants}
						className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-8"
					>
						<CountUpStat label="Servers tracked" end={4200} suffix="+" />
						<CountUpStat label="Avg. latency" end={12} suffix="ms" />
						<CountUpStat label="Uptime" end={99.99} suffix="%" decimals={2} />
					</motion.div>

					{/* Dashboard Preview */}
					<motion.div
						variants={itemVariants}
						className="relative mt-16 md:mt-20"
					>
						<div className="relative mx-auto max-w-4xl">
							<div className="overflow-hidden rounded-xl border border-primary/20 bg-card/90 shadow-[0_20px_45px_-32px_rgba(88,120,232,0.55)] backdrop-blur-sm">
								{/* Mock browser bar */}
								<div className="flex items-center gap-2 border-primary/15 border-b px-4 py-3">
									<div className="flex gap-1.5">
										<div className="h-3 w-3 rounded-full bg-red-500/60" />
										<div className="h-3 w-3 rounded-full bg-yellow-500/60" />
										<div className="h-3 w-3 rounded-full bg-green-500/60" />
									</div>
									<div className="mx-auto flex h-7 w-72 items-center justify-center rounded-md border border-primary/10 bg-secondary/70 px-3">
										<span className="font-mono text-muted-foreground text-xs">
											app.serverstats.io/dashboard
										</span>
									</div>
								</div>
								{/* Mock dashboard content */}
								<div className="p-6 md:p-8">
									<div className="mb-6 grid grid-cols-3 gap-4">
										<DashboardStat
											label="Players Online"
											value="47"
											change="+12%"
										/>
										<DashboardStat label="TPS" value="20.0" change="Stable" />
										<DashboardStat label="Uptime" value="99.7%" change="30d" />
									</div>
									{/* Animated chart bars */}
									<div className="flex h-40 items-end gap-0.75 rounded-lg border border-primary/15 bg-secondary/40 p-4 md:h-52">
										{chartBars.map((bar, i) => (
											<motion.div
												key={bar.id}
												initial={{ height: 0 }}
												animate={
													isInView
														? { height: `${bar.h}%` }
														: { height: 0 }
												}
												transition={{
													duration: 0.8,
													delay: 1.2 + i * 0.03, // index is fine for animation timing
													ease: "easeOut",
												}}
												className="flex-1 cursor-default rounded-t bg-linear-to-t from-primary/30 to-primary/80 transition-colors hover:from-primary/45 hover:to-primary"
											/>
										))}
									</div>
								</div>
							</div>
							{/* Bottom fade (scoped to preview width) */}
							<div className="pointer-events-none absolute inset-x-0 -bottom-px h-24 rounded-b-xl bg-linear-to-t from-background via-background/70 to-transparent" />
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}

function DashboardStat({
	label,
	value,
	change,
}: {
	label: string;
	value: string;
	change: string;
}) {
	return (
		<div className="rounded-lg border border-primary/15 bg-secondary/35 p-4 backdrop-blur-sm">
			<p className="mb-1 text-muted-foreground text-xs">{label}</p>
			<p className="font-bold text-foreground text-xl md:text-2xl">{value}</p>
			<p className="mt-1 text-primary text-xs">{change}</p>
		</div>
	);
}
