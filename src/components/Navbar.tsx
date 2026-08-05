import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Droplet, Menu, Moon, Search, ShoppingCart, Sun, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useDarkMode } from "@/lib/theme";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { count } = useCart();
  const { dark, toggle } = useDarkMode();
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    navigate({ to: "/shop", search: { q: query || undefined } });
  };

  return (
    <>
      <div className="gradient-hero px-4 py-2 text-center text-xs font-medium text-primary-foreground sm:text-sm">
        Free delivery on all orders above R500 — same-day dispatch before 14:00
      </div>
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:flex lg:justify-between">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl gradient-hero shadow-soft">
              <Droplet className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="truncate text-lg font-bold tracking-tight">
              Aqua<span className="text-primary">Pure</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "bg-accent text-accent-foreground" }}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <form onSubmit={submitSearch} className="relative hidden xl:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search water…"
                aria-label="Search products"
                className="h-10 w-52 rounded-full border border-input bg-muted/50 pl-9 pr-4 text-sm outline-none transition focus:w-64 focus:border-primary"
              />
            </form>
            <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle dark mode" className="rounded-full">
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link to="/cart" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-accent">
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                  {count}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-border bg-background lg:hidden"
            >
              <div className="space-y-1 px-4 py-4">
                <form onSubmit={submitSearch} className="relative mb-3">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search water…"
                    aria-label="Search products"
                    className="h-11 w-full rounded-full border border-input bg-muted/50 pl-9 pr-4 text-sm outline-none focus:border-primary"
                  />
                </form>
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: l.to === "/" }}
                    activeProps={{ className: "bg-accent text-accent-foreground" }}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
