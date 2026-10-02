"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type CartItem = { id: string; title: string; qty: number; price: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  /** Increments each time anything is added; drives the badge "pop". */
  pulse: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  has: (id: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [pulse, setPulse] = useState(0);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((p) => p.id === item.id);
      if (i === -1) return [...prev, { ...item, qty }];
      const next = [...prev];
      next[i] = { ...next[i], qty: next[i].qty + qty };
      return next;
    });
    setPulse((p) => p + 1);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      pulse,
      add,
      has: (id) => items.some((i) => i.id === id),
    }),
    [items, pulse, add],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
