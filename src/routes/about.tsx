import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Eye, HeartHandshake, Target } from "lucide-react";
import heroImage from "@/assets/hero-water.jpg";
import { PageHeader, Section } from "@/components/Section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AquaPure — Purified Water Since 2011" },
      {
        name: "description",
        content: "Our story, mission and vision: purified water delivered to 25,000+ homes and businesses since 2011.",
      },
      { property: "og:title", content: "About AquaPure — Purified Water Since 2011" },
      { property: "og:description", content: "Our story, mission and why customers trust AquaPure." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader title="About AquaPure" subtitle="Fifteen years of getting clean water to the people who need it." />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.img
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            src={heroImage}
            alt="AquaPure purified water bottles"
            loading="lazy"
            width={1600}
            height={1008}
            className="rounded-4xl object-cover shadow-float"
          />
          <div>
            <h2 className="text-3xl font-bold">Our story</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              AquaPure started in 2011 with one delivery van and a small purification plant in Cape Town. A family
              frustrated by unreliable water supply built a service they would trust themselves — filtered, tested and
              delivered on time, every time.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Today we run a fleet of refrigerated vehicles, supply hundreds of offices and deliver to thousands of homes
              across the Western Cape — while keeping the same promise: clean water, fair prices, no fuss.
            </p>
          </div>
        </div>
      </Section>

      <div className="bg-surface">
        <Section eyebrow="Purpose" title="Mission & vision">
          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                icon: Target,
                title: "Our mission",
                text: "To make safe, great-tasting drinking water effortlessly available to every home and workplace we serve.",
              },
              {
                icon: Eye,
                title: "Our vision",
                text: "A country where nobody thinks twice about the water they drink — supplied sustainably in reusable, recyclable packaging.",
              },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card-surface p-8"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl gradient-hero">
                  <c.icon className="h-6 w-6 text-primary-foreground" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{c.title}</h3>
                <p className="mt-3 text-muted-foreground">{c.text}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      <Section eyebrow="By the numbers" title="Fifteen years in the water business">
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            ["25,400+", "Customers served"],
            ["182,000+", "Deliveries completed"],
            ["15", "Years in business"],
          ].map(([n, l], i) => (
            <motion.div
              key={l}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card-surface p-8 text-center"
            >
              <p className="text-4xl font-extrabold text-gradient">{n}</p>
              <p className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">{l}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="bg-surface">
        <Section eyebrow="Trust" title="Why customers trust us">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["Lab-tested every batch", "Independent testing on microbiology and mineral balance before dispatch."],
              ["On-time or it's free", "If a scheduled delivery misses its window, that delivery is on us."],
              ["Real people on the phone", "A local support team that answers, not a call-centre queue."],
            ].map(([t, d]) => (
              <div key={t} className="card-surface p-6">
                <HeartHandshake className="h-6 w-6 text-primary" />
                <h3 className="mt-4 font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
