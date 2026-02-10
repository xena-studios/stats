"use client";

import { motion, useInView } from "framer-motion";
import { Download, Link, BarChart3 } from "lucide-react";
import { useRef } from "react";
import {
  AnimatedSection,
  AnimatedText,
} from "./animated-section";

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
      "Your stats appear instantly on your dashboard. Players, performance, uptime — all in one place.",
    step: "03",
  },
];

function GlowyConnector({ index }: { index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className="absolute top-10 left-[calc(50%+44px)] w-[calc(100%-88px)] hidden md:flex items-center"
      style={{ right: "calc(-50% + 44px)", left: "calc(50% + 44px)", width: "calc(100% - 88px)" }}
    >
      {/* Track line */}
      <div className="relative w-full h-[2px]">
        {/* Background track */}
        <div className="absolute inset-0 bg-border/30 rounded-full" />

        {/* Animated fill */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 0.6 + index * 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-primary/80 to-primary"
        />

        {/* Glow effect on the animated fill */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 0.6 + index * 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-primary/80 to-primary blur-[6px]"
        />

        {/* Traveling light dot - repeats */}
        <motion.div
          initial={{ left: "-4%", opacity: 0 }}
          animate={
            isInView
              ? {
                  left: ["-4%", "104%"],
                  opacity: [0, 1, 1, 0],
                }
              : { left: "-4%", opacity: 0 }
          }
          transition={{
            duration: 1.6,
            delay: 0.8 + index * 0.4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_4px_hsl(217_91%_60%/0.6)]"
        />
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="py-24 md:py-32 relative">
      {/* Subtle section divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection className="text-center mb-16">
          <AnimatedText
            as="p"
            className="text-sm font-medium text-primary mb-3 tracking-wide uppercase"
          >
            How it works
          </AnimatedText>
          <AnimatedText
            as="h2"
            className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Up and running in minutes
          </AnimatedText>
          <AnimatedText
            as="p"
            className="mt-4 text-muted-foreground max-w-lg mx-auto text-pretty leading-relaxed"
          >
            Three simple steps to complete server visibility. No technical
            expertise required.
          </AnimatedText>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              className="relative"
            >
              {/* Glowy connector */}
              {index < steps.length - 1 && <GlowyConnector index={index} />}

              <div className="relative flex flex-col items-center text-center px-6 py-8 rounded-2xl group">
                {/* Step number */}
                <span className="absolute top-2 right-6 text-xs font-mono text-muted-foreground/30">
                  {step.step}
                </span>

                {/* Icon container with glow */}
                <div className="relative mb-6">
                  {/* Glow ring behind icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: 0.3 + index * 0.2,
                      ease: "easeOut",
                    }}
                    className="absolute -inset-2 rounded-2xl bg-primary/[0.06] blur-md"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + index * 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-card border border-primary/20 text-primary shadow-lg shadow-primary/[0.08] group-hover:border-primary/40 group-hover:shadow-primary/15 transition-all duration-500"
                  >
                    <step.icon className="h-7 w-7" strokeWidth={1.5} />
                  </motion.div>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
