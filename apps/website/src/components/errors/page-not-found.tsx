import { ArrowLeft, Compass, Home } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function PageNotFound() {
	return (
		<main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-12 text-foreground">
			<div className="-translate-x-1/2 pointer-events-none absolute top-0 left-1/2 h-80 w-208 rounded-full bg-primary/15 blur-[130px]" />
			<div className="pointer-events-none absolute right-0 bottom-0 left-0 h-36 bg-linear-to-t from-background to-transparent" />

			<section className="relative z-10 w-full max-w-2xl rounded-2xl border border-primary/20 bg-card/80 p-8 text-center shadow-[0_20px_60px_-36px_rgba(88,120,232,0.6)] backdrop-blur md:p-10">
				<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/25 bg-primary/15">
					<Compass className="h-8 w-8 text-primary" />
				</div>

				<p className="font-mono text-primary/80 text-sm tracking-[0.2em]">ERROR 404</p>
				<h1 className="mt-3 font-bold text-4xl tracking-tight sm:text-5xl">
					Page not found
				</h1>
				<p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
					The page you requested doesn't exist, may have moved, or is no longer
					available.
				</p>

				<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
					<Button asChild size="lg" className="h-11 px-7">
						<Link to="/home">
							<Home className="h-4 w-4" />
							Go to home
						</Link>
					</Button>
					<Button asChild variant="outline" size="lg" className="h-11 px-7">
						<Link to="/">
							<ArrowLeft className="h-4 w-4" />
							Back to dashboard
						</Link>
					</Button>
				</div>
			</section>
		</main>
	);
}
