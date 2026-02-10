"use client";

import React from "react"

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check, Crown, Rocket, Sparkles, Star, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  AnimatedSection,
  AnimatedText,
} from "./animated-section";

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
      "5 servers",
      "30-day data history",
      "Advanced session analytics",
      "Uptime alerts",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    popular: false,
    price: "$30",
    period: "/month",
    description: "For networks & large teams",
    icon: Crown,
    gradient: "from-amber-500/15 via-amber-500/5 to-transparent",
    iconColor: "text-amber-500",
    features: [
      "Unlimited servers",
      "Unlimited data history",
      "API access",
      "Dedicated support",
      "Custom integrations",
    ],
  },
];

const features = [
  {
    category: "Server Monitoring",
    items: [
      { name: "Real-time player tracking", free: true, pro: true, enterprise: true },
      { name: "TPS monitoring", free: true, pro: true, enterprise: true },
      { name: "Uptime monitoring", free: true, pro: true, enterprise: true },
      { name: "Advanced session analytics", free: false, pro: true, enterprise: true },
      { name: "Uptime alerts & notifications", free: false, pro: true, enterprise: true },
    ],
  },
  {
    category: "Data & History",
    items: [
      { name: "7-day data history", free: true, pro: false, enterprise: false },
      { name: "30-day data history", free: false, pro: true, enterprise: false },
      { name: "Unlimited data history", free: false, pro: false, enterprise: true },
      { name: "Data export (CSV)", free: false, pro: true, enterprise: true },
    ],
  },
  {
    category: "Scale & Integrations",
    items: [
      { name: "1 server", free: true, pro: false, enterprise: false },
      { name: "5 servers", free: false, pro: true, enterprise: false },
      { name: "Unlimited servers", free: false, pro: false, enterprise: true },
      { name: "API access", free: false, pro: false, enterprise: true },
      { name: "Custom integrations", free: false, pro: false, enterprise: true },
    ],
  },
  {
    category: "Support",
    items: [
      { name: "Community support", free: true, pro: true, enterprise: true },
      { name: "Priority support", free: false, pro: true, enterprise: true },
      { name: "Dedicated support manager", free: false, pro: false, enterprise: true },
    ],
  },
];

export function Pricing() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  return (
    <section id="pricing" className="py-24 md:py-32 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection className="text-center mb-16">
          <AnimatedText
            as="p"
            className="text-sm font-medium text-primary mb-3 tracking-wide uppercase"
          >
            Pricing
          </AnimatedText>
          <AnimatedText
            as="h2"
            className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Choose the right plan for you
          </AnimatedText>
          <AnimatedText
            as="p"
            className="mt-4 text-muted-foreground max-w-lg mx-auto text-pretty leading-relaxed"
          >
            Compare features across all plans and find the perfect fit for your
            server.
          </AnimatedText>
        </AnimatedSection>

        {/* Pricing Cards */}
        <AnimatedSection className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3 mb-16">
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
                className="relative"
              >
                {/* Popular badge glow */}
                {plan.popular && (
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-sm" />
                )}

                <Card
                  className={cn(
                    "relative flex flex-col rounded-2xl border p-6 h-full overflow-hidden transition-all duration-300",
                    plan.popular
                      ? "border-primary/30 bg-card shadow-xl shadow-primary/[0.06]"
                      : "border-border/40 bg-card/50 hover:border-border/60"
                  )}
                >
                  {/* Gradient overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-60 pointer-events-none",
                      plan.gradient
                    )}
                  />

                  {/* Shimmer effect */}
                  {isHovered && (
                    <motion.div
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={{ x: "100%", opacity: 0.07 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground to-transparent pointer-events-none"
                    />
                  )}

                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="relative mb-4">
                      <Badge className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-xs gap-1.5">
                        <Sparkles className="h-3 w-3" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <div className="relative flex flex-col flex-1">
                    {/* Icon */}
                    <div
                      className={cn(
                        "mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-border/40 bg-secondary/40",
                        plan.popular && "border-primary/20 bg-primary/[0.06]"
                      )}
                    >
                      <Icon className={cn("h-5 w-5", plan.iconColor)} />
                    </div>

                    {/* Name & description */}
                    <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>

                    {/* Price */}
                    <div className="mt-5 flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </div>

                    {/* Features */}
                    <ul className="mt-6 flex flex-col gap-3 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm">
                          <div
                            className={cn(
                              "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                              plan.popular
                                ? "bg-primary/15 text-primary"
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
                        "mt-7 w-full h-11 gap-2 group transition-all duration-300",
                        plan.popular
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
                          : "bg-secondary text-foreground hover:bg-secondary/80 border border-border/50"
                      )}
                    >
                      {plan.popular ? "Get Started Now" : "Choose Plan"}
                      <span className="transition-transform group-hover:translate-x-0.5">
                        &rarr;
                      </span>
                    </Button>

                    {plan.popular && (
                      <p className="text-center text-xs text-muted-foreground mt-3">
                        Best value for server owners
                      </p>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatedSection>

        {/* Feature Comparison Table */}
        <AnimatedSection className="mx-auto max-w-5xl">
          <div className="overflow-x-auto rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground w-[40%]">
                    Feature
                  </th>
                  <th className="p-4 text-center text-sm font-medium text-muted-foreground w-[20%]">
                    Free
                  </th>
                  <th className="p-4 text-center text-sm font-medium text-primary w-[20%]">
                    Pro
                  </th>
                  <th className="p-4 text-center text-sm font-medium text-amber-500 w-[20%]">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((category) => (
                  <React.Fragment key={category.category}>
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 pt-6 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                      >
                        {category.category}
                      </td>
                    </tr>
                    {category.items.map((feature, featureIndex) => (
                      <motion.tr
                        key={feature.name}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: featureIndex * 0.04,
                        }}
                        className="border-b border-border/20 last:border-0 hover:bg-secondary/20 transition-colors"
                      >
                        <td className="p-4 text-sm text-foreground/80">
                          {feature.name}
                        </td>
                        {(["free", "pro", "enterprise"] as const).map((tier) => (
                          <td key={tier} className="p-4 text-center">
                            {feature[tier] ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 15,
                                  delay: featureIndex * 0.04 + 0.1,
                                }}
                                className={cn(
                                  "inline-flex h-6 w-6 items-center justify-center rounded-full",
                                  tier === "pro"
                                    ? "bg-primary/15 text-primary"
                                    : tier === "enterprise"
                                      ? "bg-amber-500/15 text-amber-500"
                                      : "bg-muted text-muted-foreground"
                                )}
                              >
                                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                              </motion.div>
                            ) : (
                              <X className="inline h-4 w-4 text-muted-foreground/30" />
                            )}
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground"
          >
            <span>Need a custom plan?</span>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-border/50 text-foreground hover:bg-secondary/50 gap-1.5"
            >
              Contact Sales
              <span>&rarr;</span>
            </Button>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
