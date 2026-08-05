import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/products";

export type CartLine = { id: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  items: { product: Product; qty: number }[];
  count: number;
  subtotal: number;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "aqua-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const add = useCallback((id: string, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { id, qty }];
    });
  }, []);

  const remove = useCallback((id: string) => setLines((prev) => prev.filter((l) => l.id !== id)), []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const items = lines
      .map((l) => {
        const product = products.find((p) => p.id === l.id);
        return product ? { product, qty: l.qty } : null;
      })
      .filter(Boolean) as { product: Product; qty: number }[];
    return {
      lines,
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.qty * i.product.price, 0),
      add,
      remove,
      setQty,
      clear,
    };
  }, [lines, add, remove, setQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

const RECENT_KEY = "aqua-recent-v1";

export function pushRecentlyViewed(id: string) {
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    const prev: string[] = raw ? JSON.parse(raw) : [];
    const next = [id, ...prev.filter((p) => p !== id)].slice(0, 8);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function readRecentlyViewed(): string[] {
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
