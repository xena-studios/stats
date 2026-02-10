import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/features";
import { ServerShowcase } from "@/components/landing/server-showcase";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/landing/")({
	component: RouteComponent,
});

export function RouteComponent() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      <ServerShowcase />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
