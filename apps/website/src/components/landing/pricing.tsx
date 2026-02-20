import { motion } from "framer-motion";
import { Check, Rocket, /*Sparkles,*/ Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
//import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AnimatedSection, AnimatedText } from "./animated-section";

const plans = [
	{
		name: "Free",
		popular: false,
		price: "$0",
		period: "/month",
		description: "Perfect for getting started",
		icon: Rocket,
		gradient: "from-slate-500/10 via-slate-500/5 to-transparent",
		iconColor: "text-muted-foreground",
		features: [
			"1 server",
			"7-day data history",
			"Real-time player tracking",
			"Community support",
		],
	},
	{
		name: "Pro",
		popular: true,
		price: "$10",
		period: "/month",
		description: "For serious server owners",
		icon: Star,
		gradient: "from-primary/20 via-primary/10 to-transparent",
		iconColor: "text-primary",
		features: [
			"Unlimited servers",
			"Unlimited data history",
			"Advanced session analytics",
			"Uptime alerts",
			"Priority support",
		],
	},
];

export function Pricing() {
	const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

	return (
		<section id="pricing" className="relative py-16 md:py-24">
			<div className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-primary/35 to-transparent" />

			<div className="mx-auto max-w-6xl px-6">
				<AnimatedSection className="mb-16 text-center">
					<AnimatedText
						as="p"
						className="mb-3 font-medium text-primary text-sm uppercase tracking-wide"
					>
						Pricing
					</AnimatedText>
					<AnimatedText
						as="h2"
						className="text-balance font-bold text-3xl text-foreground tracking-tight sm:text-4xl md:text-5xl"
					>
						Choose the right plan for you
					</AnimatedText>
					<AnimatedText
						as="p"
						className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground leading-relaxed"
					>
						Compare features across all plans and find the perfect fit for your
						server.
					</AnimatedText>
				</AnimatedSection>

				{/* Pricing Cards */}
				<AnimatedSection className="mx-auto mb-16 flex max-w-5xl flex-wrap justify-center gap-5">
					{plans.map((plan, index) => {
						const Icon = plan.icon;
						const isHovered = hoveredPlan === index;

						return (
							<motion.div
								key={plan.name}
								variants={{
									hidden: { opacity: 0, y: 24 },
									visible: {
										opacity: 1,
										y: 0,
										transition: { duration: 0.6, ease: "easeOut" },
									},
								}}
								onHoverStart={() => setHoveredPlan(index)}
								onHoverEnd={() => setHoveredPlan(null)}
								whileHover={{ y: -4 }}
								transition={{ duration: 0.3, ease: "easeOut" }}
								className="relative w-full max-w-md md:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
							>
								{/* Popular badge glow */}
								{plan.popular && (
									<div className="absolute -inset-px rounded-2xl bg-linear-to-b from-primary/30 via-primary/10 to-transparent blur-sm" />
								)}

								<Card
									className={cn(
										"relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300",
										plan.popular
											? "border-primary/45 bg-card shadow-primary/16 shadow-xl"
											: "border-border/40 bg-card/50 hover:border-primary/18"
									)}
								>
									{/* Gradient overlay */}
									<div
										className={cn(
											"pointer-events-none absolute inset-0 bg-linear-to-br opacity-60",
											plan.gradient
										)}
									/>

									{/* Shimmer effect */}
									{isHovered && (
										<motion.div
											initial={{ x: "-100%", opacity: 0 }}
											animate={{ x: "100%", opacity: 0.07 }}
											transition={{ duration: 0.6, ease: "easeOut" }}
											className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-foreground to-transparent"
										/>
									)}

									<div className="relative flex flex-1 flex-col">
										<div className="mb-4 flex items-center justify-between gap-3">
											{/* Icon */}
											<div
												className={cn(
													"flex h-10 w-10 items-center justify-center rounded-xl border border-border/40 bg-secondary/40",
													plan.popular && "border-primary/35 bg-primary/12"
												)}
											>
												<Icon className={cn("h-5 w-5", plan.iconColor)} />
											</div>

											{/*{plan.popular && (
                        <Badge className="shrink-0 bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-xs gap-1.5">
                          <Sparkles className="h-3 w-3" />
                          Most Popular
                        </Badge>
                      )}*/}
										</div>

										{/* Name & description */}
										<h3 className="font-semibold text-foreground text-lg">
											{plan.name}
										</h3>
										<p className="mt-1 text-muted-foreground text-sm">
											{plan.description}
										</p>

										{/* Price */}
										<div className="mt-5 flex items-baseline gap-1">
											<span className="font-bold text-4xl text-foreground">
												{plan.price}
											</span>
											<span className="text-muted-foreground text-sm">
												{plan.period}
											</span>
										</div>

										{/* Features */}
										<ul className="mt-6 flex flex-1 flex-col gap-3">
											{plan.features.map((feature) => (
												<li
													key={feature}
													className="flex items-start gap-2.5 text-sm"
												>
													<div
														className={cn(
															"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
															plan.popular
																? "bg-primary/25 text-primary"
																: "bg-muted text-muted-foreground"
														)}
													>
														<Check className="h-2.5 w-2.5" strokeWidth={3} />
													</div>
													<span className="text-foreground/80">{feature}</span>
												</li>
											))}
										</ul>

										{/* CTA */}
										<Button
											className={cn(
												"group mt-7 h-11 w-full gap-2 transition-all duration-300",
												plan.popular
													? "bg-primary text-primary-foreground shadow-md shadow-primary/35 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/45"
													: "border border-border/50 bg-secondary text-foreground hover:bg-secondary/80"
											)}
										>
											{plan.popular ? "Get Started Now" : "Choose Plan"}
											<span className="transition-transform group-hover:translate-x-0.5">
												&rarr;
											</span>
										</Button>

										{plan.popular && (
											<p className="mt-3 text-center text-muted-foreground text-xs">
												Best value for server owners
											</p>
										)}
									</div>
								</Card>
							</motion.div>
						);
					})}
				</AnimatedSection>
			</div>
		</section>
	);
}
