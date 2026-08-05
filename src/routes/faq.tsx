import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Water Delivery Questions | AquaPure" },
      { name: "description", content: "Answers on delivery areas, purification, lead times, payment methods and bulk orders." },
      { property: "og:title", content: "FAQ — Water Delivery Questions | AquaPure" },
      { property: "og:description", content: "Everything about delivery, purification and bulk water orders." },
    ],
  }),
  component: Faq,
});

const faqs = [
  {
    q: "Where do you deliver?",
    a: "We deliver across the Cape Town metro, the Winelands, the West Coast and the Overberg. Metro orders placed before 14:00 go out the same day; outlying areas run on fixed weekly routes.",
  },
  {
    q: "Is the water purified?",
    a: "Yes. Every litre goes through a seven-stage process — sediment filtration, carbon filtration, reverse osmosis, re-mineralisation, ozone treatment and UV sterilisation — and each batch is independently lab tested.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard delivery is 2–3 working days, express delivery arrives the same day before 17:00, and collection orders are ready at our depot within two hours.",
  },
  {
    q: "What payment methods are accepted?",
    a: "This demo store accepts Card, EFT and Cash on Delivery at checkout. No real payment is processed.",
  },
  {
    q: "Can I order in bulk?",
    a: "Absolutely. We supply cases, pallets and multi-container contracts for offices, events, restaurants and construction sites, with tiered pricing on larger volumes.",
  },
  {
    q: "Do you take back empty containers?",
    a: "Yes — every 10L, 20L and 25L container is exchangeable. Hand your sanitised empty to the driver and only pay the refill price.",
  },
  {
    q: "Can I change or pause my delivery schedule?",
    a: "Recurring home and office plans can be paused, rescheduled or cancelled at any time with 24 hours' notice.",
  },
];

function Faq() {
  return (
    <>
      <PageHeader title="Frequently Asked Questions" subtitle="Delivery, purification, payments and bulk supply — answered." />

      <Section className="max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="card-surface mb-3 px-5">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="card-surface mt-10 p-8 text-center">
          <h2 className="text-xl font-bold">Still have a question?</h2>
          <p className="mt-2 text-sm text-muted-foreground">Our team replies within one business day.</p>
          <Button asChild className="mt-5 rounded-full px-8">
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
