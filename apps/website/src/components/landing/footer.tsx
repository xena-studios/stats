"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Discord", href: "#" },
      { label: "GitHub", href: "https://github.com/xena-studios/serverstats" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy-policy" },
      { label: "Terms", href: "/legal/terms-of-service" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/20">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-8 md:grid-cols-5"
        >
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
              <span className="text-base font-semibold text-foreground">
                ServerStats
              </span>
            </a>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Minecraft server analytics without the hassle. Real-time insights,
              zero configuration.
            </p>
          </div>

          {/* Link columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {"\u00A9"} {new Date().getFullYear()} ServerStats. All rights
            reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs text-muted-foreground">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
