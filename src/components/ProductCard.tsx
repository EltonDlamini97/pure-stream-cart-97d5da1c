import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Eye, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";

export function Rating({ value, reviews }: { value: number; reviews?: number }) {
  return (
    <div className="flex items-center gap-1 text-xs text-muted-foreground">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i <= Math.round(value) ? "fill-chart-4 text-chart-4" : "text-border"}`}
        />
      ))}
      <span className="ml-1 font-medium text-foreground">{value.toFixed(1)}</span>
      {reviews !== undefined && <span>({reviews})</span>}
    </div>
  );
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3) }}
      whileHover={{ y: -6 }}
      className="group card-surface flex flex-col overflow-hidden shadow-soft"
    >
      <Link
        to="/product/$productId"
        params={{ productId: product.id }}
        className="relative block overflow-hidden bg-surface"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-52 w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
          {product.size}
        </span>
        {product.stock < 30 && (
          <span className="absolute right-3 top-3 rounded-full bg-destructive/10 px-3 py-1 text-[11px] font-semibold text-destructive">
            Low stock
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{product.category}</p>
        <Link
          to="/product/$productId"
          params={{ productId: product.id }}
          className="line-clamp-2 font-semibold leading-snug transition hover:text-primary"
        >
          {product.name}
        </Link>
        <Rating value={product.rating} reviews={product.reviews} />
        <p className="mt-auto pt-2 text-lg font-bold text-primary">{formatPrice(product.price)}</p>
        <div className="flex gap-2 pt-1">
          <Button
            className="flex-1 rounded-full"
            onClick={() => {
              add(product.id);
              toast.success("Added to cart", { description: product.name });
            }}
          >
            <ShoppingCart className="mr-1 h-4 w-4" /> Add
          </Button>
          <Button asChild variant="outline" size="icon" className="rounded-full">
            <Link to="/product/$productId" params={{ productId: product.id }} aria-label="Quick view">
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
