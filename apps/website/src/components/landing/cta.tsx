"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  AnimatedSection,
  AnimatedItem,
} from "./animated-section";

export function CTA() {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <AnimatedItem>
            <motion.div
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-3xl border border-border/40 bg-card/60 p-12 md:p-20 text-center backdrop-blur-sm"
            >
              {/* Animated glows */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/[0.04] rounded-full blur-[100px]" />
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-400/[0.03] rounded-full blur-[80px]" />
              </div>

              <div className="relative">
                <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                  Ready to see your server data?
                </h2>
                <p className="mt-5 text-muted-foreground max-w-md mx-auto text-pretty leading-relaxed text-lg">
                  {/*
				  Join thousands of Minecraft server owners who trust
                  ServerStats for their analytics. Start free today.
				  */}
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-12 text-base gap-2 group shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
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
