import { motion, useInView } from "framer-motion";
import { BarChart3, Download, Link } from "lucide-react";
import { useRef } from "react";
import { AnimatedSection, AnimatedText } from "./animated-section";

const steps = [
	{
		icon: Download,
		title: "Install the Plugin",
		description:
			"Download and drop the plugin into your server's plugins folder. One file, no dependencies.",
		step: "01",
	},
	{
		icon: Link,
		title: "Link Your Server",
		description:
			"Paste your unique API key in the config. Your server connects securely to our cloud.",
		step: "02",
	},
	{
		icon: BarChart3,
		title: "Track Everything",
		description:
			"Your stats appear instantly on your dashboard. Players, performance, uptime: all in one place.",
		step: "03",
	},
] as const;

function Connector({ isActive, index }: { isActive: boolean; index: number }) {
	return (
		<div
			aria-hidden="true"
			className="absolute top-10 left-[calc(50%+44px)] hidden h-0.5 w-[calc(100%-88px)] md:block"
		>
			<div className="h-full w-full rounded-full bg-primary/20" />
			<motion.div
				initial={false}
				animate={
					isActive ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0.85 }
				}
				transition={{
					duration: 0.9,
					delay: 0.45 + index * 0.2,
					ease: [0.16, 1, 0.3, 1],
				}}
				className="absolute inset-0 origin-left rounded-full bg-linear-to-r from-primary/70 to-primary/90"
				style={{ transform: "scaleX(0)", opacity: 0.85 }}
			/>
			<motion.div
				initial={false}
				animate={
					isActive
						? { left: "104%", opacity: [0, 1, 1, 0] }
						: { left: "-4%", opacity: 0 }
				}
				transition={{
					duration: 1.45,
					delay: 0.7 + index * 0.2,
					ease: "easeInOut",
					repeat: isActive ? Infinity : 0,
					repeatDelay: 0.55,
				}}
				className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_3px_hsl(217_91%_60%/0.45)]"
				style={{ left: "-4%", opacity: 0 }}
			/>
		</div>
	);
}

export function HowItWorks() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const hasEnteredView = useInView(sectionRef, {
		once: true,
		margin: "-80px 0px",
	});
	const isInView = useInView(sectionRef, { margin: "-80px 0px" });

	return (
		<section ref={sectionRef} className="relative py-24 md:py-32">
			<div className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-primary/35 to-transparent" />

			<div className="mx-auto max-w-6xl px-6">
				<AnimatedSection className="mb-16 text-center">
					<AnimatedText
						as="p"
						className="mb-3 font-medium text-primary text-sm uppercase tracking-wide"
					>
						How it works
					</AnimatedText>
					<AnimatedText
						as="h2"
						className="text-balance font-bold text-3xl text-foreground tracking-tight sm:text-4xl md:text-5xl"
					>
						Up and running in minutes
					</AnimatedText>
					<AnimatedText
						as="p"
						className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground leading-relaxed"
					>
						Three simple steps to complete server visibility. No technical
						expertise required.
					</AnimatedText>
				</AnimatedSection>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
					{steps.map((step, index) => {
						const Icon = step.icon;

						return (
							<motion.div
								key={step.step}
								initial={{ opacity: 0, y: 24 }}
								animate={
									hasEnteredView
										? {
												opacity: 1,
												y: 0,
												transition: {
													duration: 0.55,
													delay: 0.1 + index * 0.12,
													ease: "easeOut",
												},
											}
										: { opacity: 0, y: 24 }
								}
								className="relative"
							>
								{index < steps.length - 1 && (
									<Connector isActive={isInView} index={index} />
								)}

								<div className="group relative flex flex-col items-center rounded-2xl px-6 py-8 text-center">
									<div className="relative mb-6">
										<motion.div
											initial={{ opacity: 0, scale: 0.6 }}
											animate={
												hasEnteredView
													? {
															opacity: 1,
															scale: 1,
															transition: {
																duration: 0.6,
																delay: 0.2 + index * 0.12,
																ease: "easeOut",
															},
														}
													: { opacity: 0, scale: 0.6 }
											}
											className="absolute -inset-2 rounded-2xl bg-primary/11 blur-md"
										/>
										<motion.div
											initial={{ opacity: 0, scale: 0.8 }}
											animate={
												hasEnteredView
													? {
															opacity: 1,
															scale: 1,
															transition: {
																duration: 0.45,
																delay: 0.15 + index * 0.12,
																ease: "easeOut",
															},
														}
													: { opacity: 0, scale: 0.8 }
											}
											className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-card text-primary shadow-lg shadow-primary/18 transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-primary/30"
										>
											<Icon className="h-7 w-7" strokeWidth={1.5} />
										</motion.div>
									</div>

									<h3 className="mb-2 font-semibold text-foreground text-lg tracking-tight">
										{step.title}
									</h3>
									<p className="max-w-60 text-muted-foreground text-sm leading-relaxed">
										{step.description}
									</p>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
