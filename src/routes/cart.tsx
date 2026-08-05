import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { formatPrice } from "@/data/products";
import { useCart } from "@/lib/cart";
import { PageHeader } from "@/components/Section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart | AquaPure Water Delivery" },
      { name: "description", content: "Review your water order, update quantities and continue to checkout." },
      { property: "og:title", content: "Your Cart | AquaPure" },
      { property: "og:description", content: "Review your water order before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, setQty, remove } = useCart();
  const delivery = subtotal === 0 || subtotal >= 500 ? 0 : 65;

  return (
    <>
      <PageHeader title="Shopping Cart" subtitle="Your water order, saved automatically on this device." />

      <div className="mx-auto max-w-7xl px-4 py-12">
        {items.length === 0 ? (
          <div className="card-surface mx-auto max-w-lg p-12 text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-primary/50" />
            <h2 className="mt-4 text-xl font-bold">Your cart is empty</h2>
            <p className="mt-2 text-sm text-muted-foreground">Add some fresh water and it will show up here.</p>
            <Button asChild className="mt-6 rounded-full px-8">
              <Link to="/shop">Start shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {items.map(({ product, qty }) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="card-surface grid grid-cols-[80px_minmax(0,1fr)] items-center gap-4 p-4 sm:grid-cols-[96px_minmax(0,1fr)_auto]"
                  >
                    <Link to="/product/$productId" params={{ productId: product.id }} className="rounded-2xl bg-surface p-2">
                      <img src={product.image} alt={product.name} loading="lazy" width={200} height={200} className="h-20 w-full object-contain" />
                    </Link>
                    <div className="min-w-0">
                      <Link
                        to="/product/$productId"
                        params={{ productId: product.id }}
                        className="line-clamp-2 font-semibold hover:text-primary"
                      >
                        {product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {product.size} • {formatPrice(product.price)} each
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex items-center rounded-full border border-border">
                          <button onClick={() => setQty(product.id, qty - 1)} aria-label="Decrease" className="grid h-9 w-9 place-items-center rounded-full hover:bg-accent">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                          <button onClick={() => setQty(product.id, qty + 1)} aria-label="Increase" className="grid h-9 w-9 place-items-center rounded-full hover:bg-accent">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => remove(product.id)}
                          className="flex items-center gap-1 text-xs text-destructive hover:underline"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                    <p className="col-span-2 text-right text-lg font-bold text-primary sm:col-span-1">
                      {formatPrice(product.price * qty)}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <aside className="card-surface h-fit p-6 lg:sticky lg:top-28">
              <h2 className="text-lg font-bold">Order summary</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-semibold">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Delivery</dt>
                  <dd className="font-semibold">{delivery === 0 ? "Free" : formatPrice(delivery)}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-base">
                  <dt className="font-bold">Total</dt>
                  <dd className="font-extrabold text-primary">{formatPrice(subtotal + delivery)}</dd>
                </div>
              </dl>
              <Button asChild size="lg" className="mt-6 w-full rounded-full shadow-soft">
                <Link to="/checkout">Checkout</Link>
              </Button>
              <Button asChild variant="outline" className="mt-3 w-full rounded-full">
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
