import { motion } from "framer-motion";
import { AnimatedSection, AnimatedText } from "./animated-section";

const servers = [
	{
		name: "Hypixel",
		players: "48,000+",
		color: "from-amber-500/20 to-amber-600/5",
	},
	{
		name: "CubeCraft",
		players: "12,500+",
		color: "from-emerald-500/20 to-emerald-600/5",
	},
	{
		name: "Mineplex",
		players: "8,200+",
		color: "from-blue-500/20 to-blue-600/5",
	},
	{
		name: "The Hive",
		players: "6,100+",
		color: "from-orange-500/20 to-orange-600/5",
	},
	{
		name: "PvPLands",
		players: "3,800+",
		color: "from-red-500/20 to-red-600/5",
	},
	{
		name: "MineHeroes",
		players: "2,400+",
		color: "from-violet-500/20 to-violet-600/5",
	},
	{
		name: "OPBlocks",
		players: "1,900+",
		color: "from-cyan-500/20 to-cyan-600/5",
	},
	{
		name: "ManaCube",
		players: "1,600+",
		color: "from-pink-500/20 to-pink-600/5",
	},
];

function ServerLogo({ name }: { name: string }) {
	const initial = name.charAt(0);
	return (
		<div className="flex h-10 w-10 select-none items-center justify-center rounded-lg border border-border/30 bg-foreground/6 font-bold text-foreground/60 text-lg">
			{initial}
		</div>
	);
}

export function ServerShowcase() {
	return (
		<section className="relative overflow-hidden py-16 md:py-24">
			<div className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-border to-transparent" />

			{/* Ambient background orbs */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/3 blur-[120px]" />
				<div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-primary/2 blur-[100px]" />
			</div>

			<div className="relative mx-auto max-w-6xl px-6">
				<AnimatedSection className="mb-16 text-center">
					<AnimatedText
						as="p"
						className="mb-3 font-medium text-primary text-sm uppercase tracking-wide"
					>
						Trusted by Servers
					</AnimatedText>
					<AnimatedText
						as="h2"
						className="text-balance font-bold text-3xl text-foreground tracking-tight sm:text-4xl md:text-5xl"
					>
						Powering servers worldwide
					</AnimatedText>
					<AnimatedText
						as="p"
						className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground leading-relaxed"
					>
						From small communities to massive networks, thousands of servers
						trust Xena Stats for their analytics.
					</AnimatedText>
				</AnimatedSection>

				{/* Glassmorphism logo grid */}
				<AnimatedSection className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
					{servers.map((server, index) => (
						<motion.div
							key={server.name}
							variants={{
								hidden: { opacity: 0, y: 20, scale: 0.95 },
								visible: {
									opacity: 1,
									y: 0,
									scale: 1,
									transition: {
										duration: 0.5,
										delay: index * 0.06,
										ease: "easeOut",
									},
								},
							}}
							whileHover={{ y: -6, scale: 1.02 }}
							transition={{ duration: 0.3, ease: "easeOut" }}
							className="group relative"
						>
							<div className="relative overflow-hidden rounded-2xl border border-border/30 bg-card/40 p-5 backdrop-blur-xl transition-all duration-300 group-hover:border-border/50 group-hover:shadow-lg group-hover:shadow-primary/4">
								{/* Glass gradient */}
								<div
									className={`absolute inset-0 bg-linear-to-br ${server.color} pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
								/>

								{/* Glass shine */}
								<div className="pointer-events-none absolute inset-0 bg-linear-to-br from-foreground/2 to-transparent" />

								{/* Hover shimmer */}
								<motion.div
									className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-foreground/3 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
									initial={false}
								/>

								<div className="relative flex flex-col items-center gap-3 text-center">
									<ServerLogo name={server.name} />
									<div>
										<h3 className="font-semibold text-foreground text-sm">
											{server.name}
										</h3>
										<p className="mt-0.5 text-muted-foreground text-xs">
											{server.players} players
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</AnimatedSection>

				{/* Bottom CTA */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mt-12 text-center"
				>
					<p className="text-muted-foreground text-sm">
						Join <span className="font-medium text-foreground">4,200+</span>{" "}
						servers already using Xena Stats
					</p>
				</motion.div>
			</div>
		</section>
	);
}
