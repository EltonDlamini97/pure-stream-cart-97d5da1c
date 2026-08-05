import { useMemo, useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { CATEGORIES, SIZES, products, type Category } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { PageHeader, ProductSkeleton } from "@/components/Section";
import { Button } from "@/components/ui/button";

type ShopSearch = { q?: string; category?: string; size?: string; sort?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search.q === "string" ? search.q : undefined,
    category: typeof search.category === "string" ? search.category : undefined,
    size: typeof search.size === "string" ? search.size : undefined,
    sort: typeof search.sort === "string" ? search.sort : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop Purified Water — Bottles, Containers & Bulk | AquaPure" },
      {
        name: "description",
        content: "Browse 25+ purified water products: 500ml to 25L containers, office packs and bulk cases.",
      },
      { property: "og:title", content: "Shop Purified Water | AquaPure" },
      { property: "og:description", content: "Bottles, containers, office water and bulk cases with fast delivery." },
    ],
  }),
  component: Shop,
});

const MAX_PRICE = 5000;

function Shop() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [query, setQuery] = useState(search.q ?? "");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => setQuery(search.q ?? ""), [search.q]);

  const update = (patch: ShopSearch) => navigate({ search: (prev) => ({ ...prev, ...patch }) });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      if (q && !`${p.name} ${p.description} ${p.category} ${p.size}`.toLowerCase().includes(q)) return false;
      if (search.category && p.category !== search.category) return false;
      if (search.size && p.size !== search.size) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
    const sort = search.sort ?? "popular";
    list = [...list].sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "new") return b.addedAt.localeCompare(a.addedAt);
      return b.popularity - a.popularity;
    });
    return list;
  }, [query, search.category, search.size, search.sort, maxPrice]);

  return (
    <>
      <PageHeader title="Shop Water" subtitle="25+ purified water products, from lunchbox bottles to event pallets." />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Filter sidebar */}
        <aside className="card-surface h-fit p-6 lg:sticky lg:top-28">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
            <SlidersHorizontal className="h-4 w-4 text-primary" /> Filters
          </h2>

          <div className="mt-5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Search</label>
            <div className="relative mt-2">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  update({ q: e.target.value || undefined });
                }}
                placeholder="Search products…"
                className="h-10 w-full rounded-full border border-input bg-background pl-9 pr-3 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</p>
            <div className="mt-2 space-y-1">
              <FilterButton active={!search.category} onClick={() => update({ category: undefined })}>
                All categories
              </FilterButton>
              {CATEGORIES.map((c) => (
                <FilterButton
                  key={c.name}
                  active={search.category === c.name}
                  onClick={() => update({ category: c.name as Category })}
                >
                  {c.name}
                </FilterButton>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Bottle size</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <SizeChip active={!search.size} onClick={() => update({ size: undefined })}>
                All
              </SizeChip>
              {SIZES.map((s) => (
                <SizeChip key={s} active={search.size === s} onClick={() => update({ size: s })}>
                  {s}
                </SizeChip>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Max price: R{maxPrice}
            </p>
            <input
              type="range"
              min={10}
              max={MAX_PRICE}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-3 w-full accent-primary"
              aria-label="Maximum price"
            />
          </div>

          <Button
            variant="outline"
            className="mt-6 w-full rounded-full"
            onClick={() => {
              setQuery("");
              setMaxPrice(MAX_PRICE);
              navigate({ search: {} });
            }}
          >
            Reset filters
          </Button>
        </aside>

        <div>
          <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <p className="truncate text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> products
            </p>
            <select
              value={search.sort ?? "popular"}
              onChange={(e) => update({ sort: e.target.value })}
              aria-label="Sort products"
              className="h-10 shrink-0 rounded-full border border-input bg-background px-4 text-sm outline-none focus:border-primary"
            >
              <option value="popular">Popular</option>
              <option value="new">Newest</option>
              <option value="low">Lowest Price</option>
              <option value="high">Highest Price</option>
            </select>
          </div>

          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="card-surface p-12 text-center">
              <p className="font-semibold">No products match your filters</p>
              <p className="mt-2 text-sm text-muted-foreground">Try widening your price range or clearing the search.</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`block w-full rounded-xl px-3 py-2 text-left text-sm transition ${
        active ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:bg-accent"
      }`}
    >
      {children}
    </button>
  );
}

function SizeChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
        active ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary"
      }`}
    >
      {children}
    </button>
  );
}
