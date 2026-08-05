import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Check, Minus, Plus, ShoppingCart, Truck } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, getProduct, products } from "@/data/products";
import { ProductCard, Rating } from "@/components/ProductCard";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { pushRecentlyViewed, readRecentlyViewed, useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found | AquaPure" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} | AquaPure` },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} | AquaPure` },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    setQty(1);
    setActive(0);
    setRecent(readRecentlyViewed().filter((id) => id !== product.id));
    pushRecentlyViewed(product.id);
  }, [product.id]);

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const recentProducts = recent.map((id) => getProduct(id)).filter(Boolean).slice(0, 4) as typeof products;

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          {" / "}
          <Link to="/shop" className="hover:text-primary">
            Shop
          </Link>
          {" / "}
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="card-surface overflow-hidden bg-surface">
              <img
                src={product.gallery[active]}
                alt={product.name}
                width={800}
                height={800}
                className="h-[420px] w-full object-contain p-6"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`overflow-hidden rounded-2xl border-2 bg-surface p-2 transition ${
                    active === i ? "border-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  <img src={g} alt="" loading="lazy" width={200} height={200} className="h-16 w-full object-contain" />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{product.category}</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{product.name}</h1>
            <div className="mt-3">
              <Rating value={product.rating} reviews={product.reviews} />
            </div>
            <p className="mt-5 text-4xl font-extrabold text-primary">{formatPrice(product.price)}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="card-surface p-4">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Bottle size</dt>
                <dd className="mt-1 font-semibold">{product.size}</dd>
              </div>
              <div className="card-surface p-4">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Availability</dt>
                <dd className="mt-1 font-semibold text-primary">{product.stock} in stock</dd>
              </div>
            </dl>

            <ul className="mt-6 space-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 shrink-0 text-primary" /> {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="grid h-11 w-11 place-items-center rounded-full hover:bg-accent">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} aria-label="Increase quantity" className="grid h-11 w-11 place-items-center rounded-full hover:bg-accent">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button
                size="lg"
                className="flex-1 rounded-full shadow-soft"
                onClick={() => {
                  add(product.id, qty);
                  toast.success(`${qty} × added to cart`, { description: product.name });
                }}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </div>

            <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="h-4 w-4 text-primary" /> Free delivery on orders above R500
            </p>
          </motion.div>
        </div>
      </div>

      {related.length > 0 && (
        <Section eyebrow="You may also like" title="Related products">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </Section>
      )}

      {recentProducts.length > 0 && (
        <div className="bg-surface">
          <Section eyebrow="Recently viewed" title="Pick up where you left off">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {recentProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </Section>
        </div>
      )}
    </>
  );
}
