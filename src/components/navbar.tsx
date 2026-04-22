"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";

const Navbar = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const isHydrated = useCartStore((state) => state.isHydrated);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/grocery" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-600 text-xl font-black text-white shadow-lg shadow-green-200">
            F
          </div>
          <div>
            <p className="text-lg font-black text-slate-900">Fresh Grocery</p>
            <p className="text-xs text-slate-500">Fast delivery, fresh picks</p>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            href="/grocery"
            className="rounded-2xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Grocery
          </Link>

          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            <ShoppingCart size={18} />
            <span>Cart</span>

            <span className="absolute -right-2 -top-2 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-green-600 px-1.5 text-xs font-extrabold text-white shadow">
              {isHydrated ? totalItems : 0}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;