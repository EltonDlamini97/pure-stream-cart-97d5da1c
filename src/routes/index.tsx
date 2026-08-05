import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  BadgeCheck,
  Droplets,
  Leaf,
  MapPin,
  Quote,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";
import heroImage from "@/assets/hero-water.jpg";
import { CATEGORIES, products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AquaPure — Fresh Pure Water Delivered to Your Door" },
      {
        name: "description",
        content:
          "Premium purified drinking water for homes, offices and businesses. Bottles, containers and bulk orders with fast delivery.",
      },
      { property: "og:title", content: "AquaPure — Fresh Pure Water Delivered to Your Door" },
      {
        property: "og:description",
        content: "Premium purified drinking water for homes, offices and businesses.",
      },
    ],
  }),
  component: Index,
});

const reasons = [
  { icon: Droplets, title: "100% Purified Water", text: "Seven-stage filtration with UV and ozone finishing." },
  { icon: Truck, title: "Fast Delivery", text: "Same-day dispatch and scheduled doorstep drops." },
  { icon: Wallet, title: "Affordable Prices", text: "Honest pricing with bulk savings on every case." },
  { icon: Leaf, title: "Eco-Friendly Bottles", text: "BPA-free, fully recyclable and refill-ready." },
  { icon: ShieldCheck, title: "Quality Guaranteed", text: "Every batch lab tested and certified." },
];

const testimonials = [
  { name: "Naledi M.", role: "Home customer", text: "Our weekly 5L delivery has become the easiest part of our routine. The water tastes genuinely clean." },
  { name: "Riaan V.", role: "Office manager", text: "Two 20L containers a week for a team of 30 — never once late, and the dispenser install was free." },
  { name: "Fatima K.", role: "Café owner", text: "We switched our whole café to AquaPure cases. Great pricing and the drivers are brilliant." },
];

function Index() {
  const featured = products.filter((p) => p.category === "Bottled Water" || p.size === "20L").slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-soft">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-brand-glow/25 blur-3xl animate-float-slow" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <BadgeCheck className="h-4 w-4" /> SABS-standard purified water
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              Fresh Pure Water <span className="text-gradient">Delivered</span> to Your Door
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Premium purified drinking water for homes, offices, and businesses.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-8 shadow-soft">
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[
                ["25k+", "Customers"],
                ["180k+", "Deliveries"],
                ["15", "Years"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="text-2xl font-bold text-primary">{n}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <img
              src={heroImage}
              alt="Bottles of purified AquaPure drinking water splashing in fresh water"
              width={1600}
              height={1008}
              className="w-full rounded-4xl object-cover shadow-float"
            />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <Section eyebrow="Categories" title="Water for every space" subtitle="From lunchbox bottles to pallets for events.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                to="/shop"
                search={{ category: c.name }}
                className="card-surface block overflow-hidden p-4 text-center transition hover:shadow-soft"
              >
                <img src={c.image} alt={c.name} loading="lazy" width={800} height={800} className="mx-auto h-28 object-contain" />
                <h3 className="mt-3 text-sm font-semibold">{c.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{c.blurb}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Featured */}
      <Section eyebrow="Bestsellers" title="Featured products" subtitle="Our most-ordered bottles and containers.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild size="lg" variant="outline" className="rounded-full px-8">
            <Link to="/shop">Browse all products</Link>
          </Button>
        </div>
      </Section>

      {/* Why choose us */}
      <div className="bg-surface">
        <Section eyebrow="Why choose us" title="Water you can trust, every drop">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="card-surface p-6 text-center"
              >
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl gradient-hero">
                  <r.icon className="h-6 w-6 text-primary-foreground" />
                </span>
                <h3 className="mt-4 text-sm font-semibold">{r.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{r.text}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      {/* Delivery coverage */}
      <Section eyebrow="Coverage" title="Where we deliver" subtitle="Free delivery on orders above R500 across our coverage zones.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Cape Town Metro", "Same day • before 14:00"],
            ["Winelands & Paarl", "Next day delivery"],
            ["West Coast", "Tue & Thu routes"],
            ["Overberg", "Weekly Friday route"],
          ].map(([zone, note]) => (
            <div key={zone} className="card-surface flex items-start gap-3 p-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-semibold">{zone}</p>
                <p className="text-sm text-muted-foreground">{note}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <div className="bg-surface">
        <Section eyebrow="Testimonials" title="Loved by 25,000+ customers">
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card-surface p-6"
              >
                <Quote className="h-7 w-7 text-primary/40" />
                <blockquote className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.text}</blockquote>
                <figcaption className="mt-5 text-sm font-semibold">
                  {t.name}
                  <span className="block text-xs font-normal text-muted-foreground">{t.role}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
