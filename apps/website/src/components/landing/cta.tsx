import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedItem, AnimatedSection } from "./animated-section";

export function CTA() {
	return (
		<section className="relative py-16 md:py-24">
			<div className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-border to-transparent" />

			<div className="mx-auto max-w-6xl px-6">
				<AnimatedSection>
					<AnimatedItem>
						<motion.div
							whileHover={{ scale: 1.005 }}
							transition={{ duration: 0.3 }}
							className="relative overflow-hidden rounded-3xl border border-border/40 bg-card/60 p-12 text-center backdrop-blur-sm md:p-20"
						>
							{/* Animated glows */}
							<div className="pointer-events-none absolute inset-0 overflow-hidden">
								<div className="absolute top-1/2 left-1/2 h-100 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/4 blur-[100px]" />
								<div className="absolute top-0 right-0 h-75 w-75 rounded-full bg-blue-400/3 blur-[80px]" />
							</div>

							<div className="relative">
								<h2 className="text-balance font-bold text-3xl text-foreground tracking-tight sm:text-4xl md:text-5xl">
									Ready to see your server data?
								</h2>
								<p className="mx-auto mt-5 max-w-md text-pretty text-lg text-muted-foreground leading-relaxed">
									{/*
				  Join thousands of Minecraft server owners who trust
                  ServerStats for their analytics. Start free today.
				  */}
								</p>
								<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
									<Button
										size="lg"
										className="group h-12 gap-2 bg-primary px-8 text-base text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/30 hover:shadow-xl"
									>
										Get Started Free
										<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
									</Button>
								</div>
							</div>
						</motion.div>
					</AnimatedItem>
				</AnimatedSection>
			</div>
		</section>
	);
}
