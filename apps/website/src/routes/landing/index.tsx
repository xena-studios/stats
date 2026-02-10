import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/features";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { createFileRoute } from "@tanstack/react-router";
import "./globals.css";

export const Route = createFileRoute("/landing/")({
  component: RouteComponent,
});

export function RouteComponent() {
  return (
    <main className="landing-theme min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      {/* <ServerShowcase /> Include later when we have servers to show off */}
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}