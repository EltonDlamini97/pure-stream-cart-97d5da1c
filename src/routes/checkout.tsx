import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { formatPrice } from "@/data/products";
import { useCart } from "@/lib/cart";
import { PageHeader } from "@/components/Section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | AquaPure Water Delivery" },
      { name: "description", content: "Complete your demo water order: delivery details, method and payment option." },
      { property: "og:title", content: "Checkout | AquaPure" },
      { property: "og:description", content: "Complete your water order in a few quick steps." },
    ],
  }),
  component: Checkout,
});

const deliveryOptions = [
  { id: "standard", label: "Standard Delivery", note: "2–3 working days", fee: 0 },
  { id: "express", label: "Express Delivery", note: "Same day before 17:00", fee: 89 },
  { id: "collection", label: "Collection", note: "Pick up at our depot", fee: 0 },
];

const paymentOptions = [
  { id: "card", label: "Card" },
  { id: "eft", label: "EFT" },
  { id: "cod", label: "Cash on Delivery" },
];

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("card");
  const [placed, setPlaced] = useState(false);

  const fee = deliveryOptions.find((d) => d.id === delivery)?.fee ?? 0;
  const total = subtotal + (subtotal >= 500 ? 0 : fee);

  if (placed) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
          <CheckCircle2 className="h-20 w-20 text-primary" />
        </motion.div>
        <h1 className="mt-6 text-3xl font-bold">Thank you for your purchase!</h1>
        <p className="mt-3 text-muted-foreground">Your order has been received.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          A demo confirmation would normally be emailed to you with your delivery window.
        </p>
        <Button asChild className="mt-8 rounded-full px-8">
          <Link to="/shop">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <PageHeader title="Checkout" subtitle="Demo checkout — no payment is processed." />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          clear();
          setPlaced(true);
          window.scrollTo({ top: 0 });
        }}
        className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[minmax(0,1fr)_380px]"
      >
        <div className="space-y-6">
          <section className="card-surface p-6">
            <h2 className="text-lg font-bold">Customer information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" name="name" placeholder="Thandi Mokoena" />
              <Field label="Email" name="email" type="email" placeholder="you@email.com" />
              <Field label="Phone Number" name="phone" type="tel" placeholder="082 000 0000" />
              <Field label="Delivery Address" name="address" placeholder="14 Fountain Rd, Cape Town" />
            </div>
          </section>

          <section className="card-surface p-6">
            <h2 className="text-lg font-bold">Delivery method</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {deliveryOptions.map((o) => (
                <button
                  type="button"
                  key={o.id}
                  onClick={() => setDelivery(o.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    delivery === o.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <p className="text-sm font-semibold">{o.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{o.note}</p>
                  <p className="mt-2 text-xs font-semibold text-primary">{o.fee === 0 ? "Free" : formatPrice(o.fee)}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="card-surface p-6">
            <h2 className="text-lg font-bold">Payment method</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {paymentOptions.map((o) => (
                <button
                  type="button"
                  key={o.id}
                  onClick={() => setPayment(o.id)}
                  className={`rounded-2xl border p-4 text-sm font-semibold transition ${
                    payment === o.id ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside className="card-surface h-fit p-6 lg:sticky lg:top-28">
          <h2 className="text-lg font-bold">Order summary</h2>
          {items.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Your cart is empty — this will place a demo order of R0.00.</p>
          ) : (
            <ul className="mt-4 space-y-3 text-sm">
              {items.map(({ product, qty }) => (
                <li key={product.id} className="flex justify-between gap-3">
                  <span className="min-w-0 truncate text-muted-foreground">
                    {qty} × {product.name}
                  </span>
                  <span className="shrink-0 font-semibold">{formatPrice(product.price * qty)}</span>
                </li>
              ))}
            </ul>
          )}
          <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-semibold">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd className="font-semibold">{total - subtotal === 0 ? "Free" : formatPrice(total - subtotal)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base">
              <dt className="font-bold">Total</dt>
              <dd className="font-extrabold text-primary">{formatPrice(total)}</dd>
            </div>
          </dl>
          <Button type="submit" size="lg" className="mt-6 w-full rounded-full shadow-soft">
            Place Order
          </Button>
        </aside>
      </form>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
