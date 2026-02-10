"use client";

import { useState, useRef, useEffect } from "react";
import { motion, type Variants, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
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
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
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
    <motion.div ref={elementRef} variants={itemVariants} className="text-center">
      <p className="text-3xl md:text-4xl font-bold tracking-tight text-foreground tabular-nums">
        {prefix}
        {formattedValue}
        {suffix}
      </p>
      <p className="text-xs text-muted-foreground mt-1.5 tracking-wide uppercase">
        {label}
      </p>
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });
  const [hasScrolled, setHasScrolled] = useState(false);
  const [shouldMountWaves, setShouldMountWaves] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 8) {
        setHasScrolled(true);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (hasScrolled && isInView) {
      setShouldMountWaves(true);
    }
  }, [hasScrolled, isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh flex items-center overflow-hidden"
    >
      {/* Glowy waves canvas background */}
      {shouldMountWaves && <GlowyWaves />}

      {/* Radial glow overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-245 h-155 bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 w-full pt-24 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/9 px-4 py-1.5 text-sm text-primary backdrop-blur-sm">
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
            className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
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
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl leading-relaxed"
          >
            Install one plugin. Link your server. Done. No hosting, no open
            ports, no headaches.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-12 text-base gap-2 group shadow-lg shadow-primary/35 hover:shadow-xl hover:shadow-primary/45 transition-all duration-300"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 h-12 text-base gap-2 border-primary/20 text-foreground hover:bg-secondary/60 bg-secondary/20 backdrop-blur-sm"
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
                className="inline-flex items-center rounded-full border border-border/40 bg-secondary/30 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur-sm"
              >
                {pill}
              </span>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={statsVariants}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            <CountUpStat
              label="Servers tracked"
              end={4200}
              suffix="+"
            />
            <CountUpStat
              label="Avg. latency"
              end={12}
              suffix="ms"
            />
            <CountUpStat
              label="Uptime"
              end={99.99}
              suffix="%"
              decimals={2}
            />
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            variants={itemVariants}
            className="relative mt-16 md:mt-20"
          >
            <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-primary/20 bg-card/90 shadow-2xl shadow-primary/15 backdrop-blur-sm">
              {/* Mock browser bar */}
              <div className="flex items-center gap-2 border-b border-primary/15 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <div className="h-3 w-3 rounded-full bg-green-500/60" />
                </div>
                <div className="mx-auto flex h-7 w-72 items-center justify-center rounded-md border border-primary/10 bg-secondary/70 px-3">
                  <span className="text-xs text-muted-foreground font-mono">
                    app.serverstats.io/dashboard
                  </span>
                </div>
              </div>
              {/* Mock dashboard content */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <DashboardStat label="Players Online" value="47" change="+12%" />
                  <DashboardStat label="TPS" value="20.0" change="Stable" />
                  <DashboardStat label="Uptime" value="99.7%" change="30d" />
                </div>
                {/* Animated chart bars */}
                <div className="h-40 md:h-52 rounded-lg bg-secondary/40 border border-primary/15 flex items-end gap-0.75 p-4">
                  {[35, 45, 40, 60, 55, 70, 65, 80, 75, 85, 90, 70, 65, 78, 82, 88, 72, 68, 75, 90, 85, 92, 88, 78].map(
                    (h, i) => (
                      <motion.div
                        key={`bar-${i}`}
                        initial={{ height: 0 }}
                        animate={shouldMountWaves ? { height: `${h}%` } : { height: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: 1.2 + i * 0.03,
                          ease: "easeOut",
                        }}
                        className="flex-1 rounded-t bg-linear-to-t from-primary/30 to-primary/80 hover:from-primary/45 hover:to-primary transition-colors cursor-default"
                      />
                    )
                  )}
                </div>
              </div>
            </div>
            {/* Bottom fade */}
            <div className="absolute -bottom-px left-0 right-0 h-24 bg-linear-to-t from-background to-transparent" />
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
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-xl md:text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-primary mt-1">{change}</p>
    </div>
  );
}
