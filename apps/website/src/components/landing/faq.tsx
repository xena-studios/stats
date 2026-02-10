"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AnimatedSection,
  AnimatedItem,
  AnimatedText,
} from "./animated-section";

const faqs = [
  {
    question: "How does it work without opening ports?",
    answer:
      "ServerStats uses an outbound-only connection. Your server plugin pushes data to our cloud via HTTPS, the same way your browser loads a webpage. No inbound ports, no firewall changes, no security risks.",
  },
  {
    question: "What Minecraft versions are supported?",
    answer:
      "We support Minecraft 1.8 through the latest release. Our plugin is compatible with Spigot, Paper, and Purpur server software. We regularly test against new versions to ensure compatibility on day one.",
  },
  {
    question: "Is my server data secure?",
    answer:
      "Absolutely. All data is encrypted in transit and stored securely. We never share your data with third parties, and you can delete your data at any time from your dashboard.",
  },
  {
    question: "Can I export my data?",
    answer:
      "Yes. Pro and Enterprise users can export all analytics data in CSV or JSON format directly from the dashboard. We also provide a REST API for programmatic access to your server statistics.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-3xl px-6">
        <AnimatedSection className="text-center mb-16">
          <AnimatedText
            as="p"
            className="text-sm font-medium text-primary mb-3 tracking-wide uppercase"
          >
            FAQ
          </AnimatedText>
          <AnimatedText
            as="h2"
            className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Frequently asked questions
          </AnimatedText>
          <AnimatedText
            as="p"
            className="mt-4 text-muted-foreground max-w-lg mx-auto text-pretty leading-relaxed"
          >
            Got questions? We have answers.
          </AnimatedText>
        </AnimatedSection>

        <AnimatedSection>
          <AnimatedItem>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={`faq-${index}`}
                  value={`item-${index}`}
                  className="border-border/40 data-[state=open]:border-border/60 transition-colors"
                >
                  <AccordionTrigger className="text-left text-base font-medium text-foreground hover:text-foreground hover:no-underline py-5 [&[data-state=open]>svg]:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedItem>
        </AnimatedSection>
      </div>
    </section>
  );
}
