"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import GroceryFilter from "@/components/grocery/grocery-filter";
import GroceryGrid from "@/components/grocery/grocery-grid";
import GrocerySort from "@/components/grocery/grocery-sort";
import SearchBar from "@/components/grocery/search-bar";
import { useCartStore } from "@/store/use-cart-store";
import { useGroceryQuery } from "@/hooks/use-grocery-query";
import { filterProducts } from "@/utils/filter";
import { sortProducts } from "@/utils/sort";
import type { GroceryCategoryFilter, GrocerySortOption } from "@/typescript";

const GroceryPage = () => {
  const { data: groceryItems = [], isLoading } = useGroceryQuery();

  const totalItems = useCartStore((state) => state.getTotalItems());
  const hydrateCart = useCartStore((state) => state.hydrateCart);
  const isHydrated = useCartStore((state) => state.isHydrated);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<GroceryCategoryFilter>("All");
  const [sortOption, setSortOption] =
    useState<GrocerySortOption>("default");

  // ✅ Hydrate cart once on mount
  useEffect(() => {
    hydrateCart();
  }, [hydrateCart]);

  const filteredAndSortedItems = useMemo(() => {
    const filteredProducts = filterProducts({
      products: groceryItems,
      searchTerm,
      selectedCategory,
    });

    return sortProducts(filteredProducts, sortOption);
  }, [groceryItems, searchTerm, selectedCategory, sortOption]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* 🔥 HERO SECTION */}
      <section className="bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                Fresh items • Fast delivery • Great offers
              </span>

              <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
                Fresh Grocery Delivered To Your Door
              </h1>

              <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg">
                Shop fruits, veggies, and groceries with smart filters, coupons,
                and lightning-fast checkout.
              </p>
            </div>

            {/* 🛒 CART CARD */}
            <div className="flex flex-col gap-4 rounded-3xl bg-white/10 p-6 backdrop-blur-md sm:min-w-[280px]">
              <div>
                <p className="text-sm text-white/80">Cart Items</p>
                <h2 className="text-3xl font-extrabold">
                  {isHydrated ? totalItems : 0}
                </h2>
              </div>

              <Link
                href="/cart"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-green-700 transition hover:bg-slate-100"
              >
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 🔍 FILTER + SEARCH */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <GrocerySort value={sortOption} onChange={setSortOption} />
          </div>

          <div className="mt-6">
            <GroceryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>

        {/* 🧾 PRODUCTS */}
        <div className="mt-10">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[340px] animate-pulse rounded-3xl bg-white shadow-sm"
                />
              ))}
            </div>
          ) : (
            <GroceryGrid items={filteredAndSortedItems} />
          )}
        </div>
      </section>
    </main>
  );
};

export default GroceryPage;