import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/Section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact AquaPure — Water Delivery Support" },
      { name: "description", content: "Call, email or message AquaPure about deliveries, bulk orders and office dispensers." },
      { property: "og:title", content: "Contact AquaPure" },
      { property: "og:description", content: "Get in touch about deliveries, bulk orders and office water." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHeader title="Contact Us" subtitle="Questions about delivery, bulk pricing or dispensers? We're here." />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[minmax(0,1fr)_380px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Message sent (demo)", { description: "We'll get back to you within one business day." });
            (e.target as HTMLFormElement).reset();
          }}
          className="card-surface p-6 sm:p-8"
        >
          <h2 className="text-xl font-bold">Send us a message</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full name</span>
              <input required className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-primary" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</span>
              <input required type="email" className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-primary" />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Subject</span>
              <input required className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-primary" />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</span>
              <textarea required rows={6} className="mt-2 w-full rounded-xl border border-input bg-background p-4 text-sm outline-none focus:border-primary" />
            </label>
          </div>
          <Button type="submit" size="lg" className="mt-6 rounded-full px-8">
            Send message
          </Button>
        </form>

        <aside className="space-y-4">
          {[
            { icon: Phone, title: "Phone", lines: ["+27 21 555 0198", "WhatsApp: +27 82 555 0198"] },
            { icon: Mail, title: "Email", lines: ["orders@aquapure.demo", "support@aquapure.demo"] },
            { icon: MapPin, title: "Address", lines: ["14 Fountain Road", "Observatory, Cape Town, 7925"] },
            { icon: Clock, title: "Business hours", lines: ["Mon–Fri: 07:30 – 17:30", "Sat: 08:00 – 13:00", "Sun & public holidays: closed"] },
          ].map((c) => (
            <div key={c.title} className="card-surface flex gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10">
                <c.icon className="h-5 w-5 text-primary" />
              </span>
              <div className="min-w-0">
                <p className="font-semibold">{c.title}</p>
                {c.lines.map((l) => (
                  <p key={l} className="text-sm text-muted-foreground">
                    {l}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </aside>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12">
        <div className="card-surface flex h-72 flex-col items-center justify-center gap-2 overflow-hidden bg-surface text-center">
          <MapPin className="h-8 w-8 text-primary" />
          <p className="font-semibold">Map placeholder</p>
          <p className="text-sm text-muted-foreground">14 Fountain Road, Observatory, Cape Town</p>
        </div>
      </div>
    </>
  );
}
