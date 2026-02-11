"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
	{ label: "Features", href: "#features" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "FAQ", href: "#faq" },
	{ label: "Docs", href: "#" },
];

export function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		let rafId = 0;
		const handleScroll = () => {
			if (rafId) return;
			rafId = window.requestAnimationFrame(() => {
				setIsScrolled(window.scrollY > 20);
				rafId = 0;
			});
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (rafId) {
				window.cancelAnimationFrame(rafId);
			}
		};
	}, []);

	return (
		<motion.header
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className={cn(
				"fixed top-0 right-0 left-0 z-50 transition-all duration-500",
				isScrolled
					? "border-primary/20 border-b bg-background/75 shadow-lg shadow-primary/10 backdrop-blur-2xl"
					: "bg-transparent"
			)}
		>
			<div className="mx-auto max-w-6xl px-6">
				<div className="flex h-16 items-center justify-between">
					<a href="/" className="group flex items-center gap-2.5">
						<div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/12 transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-md group-hover:shadow-primary/20">
							<BarChart3 className="h-4 w-4 text-primary" />
						</div>
						<span className="font-semibold text-foreground text-lg tracking-tight">
							ServerStats
						</span>
					</a>

					<nav className="hidden items-center gap-1 md:flex">
						{navLinks.map((link) => (
							<a
								key={link.label}
								href={link.href}
								className="group relative rounded-lg px-4 py-2 text-muted-foreground text-sm transition-colors hover:text-primary"
							>
								{link.label}
								<span className="absolute bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-primary transition-all duration-300 group-hover:w-1/2" />
							</a>
						))}
					</nav>

					<div className="hidden items-center gap-3 md:flex">
						<Button
							variant="ghost"
							size="sm"
							className="text-muted-foreground hover:text-foreground"
						>
							Login
						</Button>
						<Button
							size="sm"
							className="bg-primary text-primary-foreground shadow-md shadow-primary/30 transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/45"
						>
							Get Started
						</Button>
					</div>

					<button
						type="button"
						className="p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
					>
						{isMobileMenuOpen ? (
							<X className="h-5 w-5" />
						) : (
							<Menu className="h-5 w-5" />
						)}
					</button>
				</div>
			</div>

			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="overflow-hidden border-border/50 border-b bg-background/95 backdrop-blur-2xl md:hidden"
					>
						<nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
							{navLinks.map((link, i) => (
								<motion.a
									key={link.label}
									href={link.href}
									initial={{ x: -20, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ delay: i * 0.05 }}
									className="rounded-lg px-4 py-3 text-muted-foreground text-sm transition-colors hover:bg-secondary/50 hover:text-foreground"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{link.label}
								</motion.a>
							))}
							<div className="mt-2 flex flex-col gap-2 border-border/50 border-t pt-3">
								<Button
									variant="ghost"
									size="sm"
									className="justify-start text-muted-foreground"
								>
									Login
								</Button>
								<Button
									size="sm"
									className="bg-primary text-primary-foreground hover:bg-primary/90"
								>
									Get Started
								</Button>
							</div>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.header>
	);
}
