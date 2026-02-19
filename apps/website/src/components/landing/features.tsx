import { Blocks, Clock, Gauge, Shield, Users, WifiOff } from "lucide-react";
import {
	AnimatedItem,
	AnimatedSection,
	AnimatedText,
} from "./animated-section";

const features = [
	{
		icon: Users,
		title: "Real-time Player Tracking",
		description: "See who's online, join/leave events, and live player counts.",
	},
	{
		icon: Gauge,
		title: "TPS & Performance Monitoring",
		description:
			"Monitor ticks per second, memory usage, and CPU load in real time.",
	},
	{
		icon: Clock,
		title: "Player Session History",
		description:
			"Track play times, session durations, and player activity over days, weeks, or months.",
	},
	{
		icon: Shield,
		title: "Uptime Tracking & Alerts",
		description:
			"Get notified when your server goes down. View uptime percentages and incident history.",
	},
	{
		icon: WifiOff,
		title: "No Port Forwarding Required",
		description:
			"Your server pushes data outbound. No need to expose ports or configure firewalls.",
	},
	{
		icon: Blocks,
		title: "Works with Spigot, Paper & Purpur",
		description:
			"Native support for the most popular Minecraft server platforms out of the box.",
	},
];

export function Features() {
	return (
		<section id="features" className="relative py-16 md:py-24">
			<div className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-primary/35 to-transparent" />

			{/* Ambient glow */}
			<div className="pointer-events-none absolute top-1/2 left-0 h-100 w-100 rounded-full bg-primary/4 blur-[100px]" />
			<div className="pointer-events-none absolute top-1/3 right-0 h-75 w-75 rounded-full bg-primary/3 blur-[80px]" />

			<div className="relative mx-auto max-w-6xl px-6">
				<AnimatedSection className="mb-16 text-center">
					<AnimatedText
						as="p"
						className="mb-3 font-medium text-primary text-sm uppercase tracking-wide"
					>
						Features
					</AnimatedText>
					<AnimatedText
						as="h2"
						className="text-balance font-bold text-3xl text-foreground tracking-tight sm:text-4xl md:text-5xl"
					>
						Everything you need to monitor your server
					</AnimatedText>
					<AnimatedText
						as="p"
						className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground leading-relaxed"
					>
						Powerful analytics built for Minecraft server owners. Simple to use,
						impossible to outgrow.
					</AnimatedText>
				</AnimatedSection>

				<AnimatedSection className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((feature) => (
						<AnimatedItem key={feature.title}>
							<div className="group relative h-full rounded-2xl border border-primary/12 bg-card/55 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/12">
								{/* Hover gradient overlay */}
								<div className="absolute inset-0 rounded-2xl bg-linear-to-b from-primary/8 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

								<div className="relative">
									<div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/12 text-primary transition-all duration-500 group-hover:border-primary/40 group-hover:bg-primary/16 group-hover:shadow-md group-hover:shadow-primary/20">
										<feature.icon className="h-5 w-5" />
									</div>

									<h3 className="mb-2 font-semibold text-base text-foreground">
										{feature.title}
									</h3>
									<p className="text-muted-foreground text-sm leading-relaxed">
										{feature.description}
									</p>
								</div>
							</div>
						</AnimatedItem>
					))}
				</AnimatedSection>
			</div>
		</section>
	);
}
