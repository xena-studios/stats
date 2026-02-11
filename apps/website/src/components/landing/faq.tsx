"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	AnimatedItem,
	AnimatedSection,
	AnimatedText,
} from "./animated-section";

const faqs = [
	{
		id: "no-ports",
		question: "How does it work without opening ports?",
		answer:
			"ServerStats uses an outbound-only connection. Your server plugin pushes data to our cloud via HTTPS, the same way your browser loads a webpage. No inbound ports, no firewall changes, no security risks.",
	},
	{
		id: "mc-versions",
		question: "What Minecraft versions are supported?",
		answer:
			"We support Minecraft 1.8 through the latest release. Our plugin is compatible with Spigot, Paper, and Purpur server software. We regularly test against new versions to ensure compatibility on day one.",
	},
	{
		id: "data-security",
		question: "Is my server data secure?",
		answer:
			"Absolutely. All data is encrypted in transit and stored securely. We never share your data with third parties, and you can delete your data at any time from your dashboard.",
	},
	{
		id: "export",
		question: "Can I export my data?",
		answer:
			"Yes. Pro users can export all analytics data in CSV or JSON format directly from the dashboard. We also provide a REST API for programmatic access to your server statistics.",
	},
];

export function FAQ() {
	return (
		<section id="faq" className="relative py-16 md:py-24">
			<div className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-border to-transparent" />

			<div className="mx-auto max-w-3xl px-6">
				<AnimatedSection className="mb-16 text-center">
					<AnimatedText
						as="p"
						className="mb-3 font-medium text-primary text-sm uppercase tracking-wide"
					>
						FAQ
					</AnimatedText>
					<AnimatedText
						as="h2"
						className="text-balance font-bold text-3xl text-foreground tracking-tight sm:text-4xl md:text-5xl"
					>
						Frequently asked questions
					</AnimatedText>
					<AnimatedText
						as="p"
						className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground leading-relaxed"
					>
						Got questions? We have answers.
					</AnimatedText>
				</AnimatedSection>

				<AnimatedSection>
					<AnimatedItem>
						<Accordion type="single" collapsible className="w-full">
							{faqs.map((faq) => (
								<AccordionItem
									key={faq.id}
									value={faq.id}
									className="border-border/40 transition-colors data-[state=open]:border-border/60"
								>
									<AccordionTrigger className="py-5 text-left font-medium text-base text-foreground hover:text-foreground hover:no-underline [&[data-state=open]>svg]:text-primary">
										{faq.question}
									</AccordionTrigger>
									<AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
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
