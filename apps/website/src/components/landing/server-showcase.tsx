"use client";

import { motion } from "framer-motion";
import {
  AnimatedSection,
  AnimatedText,
} from "./animated-section";

const servers = [
  { name: "Hypixel", players: "48,000+", color: "from-amber-500/20 to-amber-600/5" },
  { name: "CubeCraft", players: "12,500+", color: "from-emerald-500/20 to-emerald-600/5" },
  { name: "Mineplex", players: "8,200+", color: "from-blue-500/20 to-blue-600/5" },
  { name: "The Hive", players: "6,100+", color: "from-orange-500/20 to-orange-600/5" },
  { name: "PvPLands", players: "3,800+", color: "from-red-500/20 to-red-600/5" },
  { name: "MineHeroes", players: "2,400+", color: "from-violet-500/20 to-violet-600/5" },
  { name: "OPBlocks", players: "1,900+", color: "from-cyan-500/20 to-cyan-600/5" },
  { name: "ManaCube", players: "1,600+", color: "from-pink-500/20 to-pink-600/5" },
];

function ServerLogo({ name }: { name: string }) {
  const initial = name.charAt(0);
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/6 border border-border/30 text-lg font-bold text-foreground/60 select-none">
      {initial}
    </div>
  );
}

export function ServerShowcase() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/2 rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 relative">
        <AnimatedSection className="text-center mb-16">
          <AnimatedText
            as="p"
            className="text-sm font-medium text-primary mb-3 tracking-wide uppercase"
          >
            Trusted by Servers
          </AnimatedText>
          <AnimatedText
            as="h2"
            className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Powering servers worldwide
          </AnimatedText>
          <AnimatedText
            as="p"
            className="mt-4 text-muted-foreground max-w-lg mx-auto text-pretty leading-relaxed"
          >
            From small communities to massive networks, thousands of servers
            trust ServerStats for their analytics.
          </AnimatedText>
        </AnimatedSection>

        {/* Glassmorphism logo grid */}
        <AnimatedSection className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
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
              <div className="relative rounded-2xl border border-border/30 bg-card/40 backdrop-blur-xl p-5 overflow-hidden transition-all duration-300 group-hover:border-border/50 group-hover:shadow-lg group-hover:shadow-primary/4">
                {/* Glass gradient */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${server.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Glass shine */}
                <div className="absolute inset-0 bg-linear-to-br from-foreground/2 to-transparent pointer-events-none" />

                {/* Hover shimmer */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-foreground/3 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />

                <div className="relative flex flex-col items-center text-center gap-3">
                  <ServerLogo name={server.name} />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {server.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
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
          <p className="text-sm text-muted-foreground">
            Join <span className="text-foreground font-medium">4,200+</span> servers already using ServerStats
          </p>
        </motion.div>
      </div>
    </section>
  );
}
