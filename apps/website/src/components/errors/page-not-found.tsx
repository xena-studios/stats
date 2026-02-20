import { Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, Compass, Home } from "lucide-react";
import { GlowyWaves } from "@/components/landing/glowy-waves";
import { Button } from "@/components/ui/button";
import "@/routes/home/styles.css";

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

export function PageNotFound() {
	return (
		<main className="landing-theme relative flex min-h-screen items-center overflow-hidden bg-background px-6 py-12 text-foreground">
			<GlowyWaves />

			<div className="pointer-events-none absolute inset-0">
				<div className="absolute top-0 left-1/2 h-155 w-245 -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
				<div className="absolute right-0 bottom-0 left-0 h-32 bg-linear-to-t from-background to-transparent" />
			</div>

			<div className="relative z-10 mx-auto w-full max-w-3xl">
				<motion.section
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="overflow-hidden rounded-2xl border border-primary/20 bg-card/80 p-8 text-center shadow-[0_20px_45px_-32px_rgba(88,120,232,0.55)] backdrop-blur-sm md:p-10"
				>
					<motion.div
						variants={itemVariants}
						className="mb-6 flex justify-center"
					>
						<div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/9 px-4 py-1.5 text-primary text-sm backdrop-blur-sm">
							<Compass className="h-4 w-4" />
							ERROR 404
						</div>
					</motion.div>

					<motion.h1
						variants={itemVariants}
						className="text-balance font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl"
					>
						Page{" "}
						<span className="bg-linear-to-r from-[#7ca0ff] via-[#6c8ff8] to-[#7397ff] bg-clip-text text-transparent">
							Not Found
						</span>
					</motion.h1>

					<motion.p
						variants={itemVariants}
						className="mx-auto mt-5 max-w-2xl text-pretty text-muted-foreground leading-relaxed md:text-lg"
					>
						The page you requested doesn&apos;t exist, may have moved, or is no
						longer available.
					</motion.p>

					<motion.div
						variants={itemVariants}
						className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
					>
						<Button
							asChild
							size="lg"
							className="group h-12 gap-2 bg-primary px-8 text-base text-primary-foreground shadow-lg shadow-primary/35 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/45 hover:shadow-xl"
						>
							<Link to="/home">
								<Home className="h-4 w-4" />
								Go to home
							</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							size="lg"
							className="h-12 gap-2 border-primary/20 bg-secondary/20 px-8 text-base text-foreground backdrop-blur-sm hover:bg-secondary/60"
						>
							<Link to="/">
								<ArrowLeft className="h-4 w-4" />
								Back to dashboard
							</Link>
						</Button>
					</motion.div>
				</motion.section>
			</div>
		</main>
	);
}
