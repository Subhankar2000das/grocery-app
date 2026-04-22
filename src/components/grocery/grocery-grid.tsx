"use client";

import GroceryCard from "./grocery-card";
import type { IGroceryItem } from "@/typescript";

interface Props {
  items: IGroceryItem[];
}

const GroceryGrid = ({ items }: Props) => {
  if (!items.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <h3 className="text-xl font-bold text-slate-800">No items found</h3>
        <p className="mt-2 text-sm text-slate-500">
          Try changing your search or category filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <GroceryCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default GroceryGrid;