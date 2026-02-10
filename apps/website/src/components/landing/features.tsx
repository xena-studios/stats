"use client";

import { Users, Gauge, Clock, Shield, WifiOff, Blocks } from "lucide-react";
import {
  AnimatedSection,
  AnimatedItem,
  AnimatedText,
} from "./animated-section";

const features = [
  {
    icon: Users,
    title: "Real-time Player Tracking",
    description:
      "See who's online, join/leave events, and player counts updated every second.",
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
    <section id="features" className="py-24 md:py-32 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[80px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative">
        <AnimatedSection className="text-center mb-16">
          <AnimatedText
            as="p"
            className="text-sm font-medium text-primary mb-3 tracking-wide uppercase"
          >
            Features
          </AnimatedText>
          <AnimatedText
            as="h2"
            className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Everything you need to monitor your server
          </AnimatedText>
          <AnimatedText
            as="p"
            className="mt-4 text-muted-foreground max-w-lg mx-auto text-pretty leading-relaxed"
          >
            Powerful analytics built for Minecraft server owners. Simple to use,
            impossible to outgrow.
          </AnimatedText>
        </AnimatedSection>

        <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <AnimatedItem key={feature.title}>
              <div className="group relative rounded-2xl border border-primary/12 bg-card/55 p-6 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/[0.12] backdrop-blur-sm h-full">
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.12] border border-primary/25 text-primary group-hover:bg-primary/[0.16] group-hover:border-primary/40 group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-500">
                    <feature.icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
