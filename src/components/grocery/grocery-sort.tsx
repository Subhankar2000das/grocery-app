"use client";

import type { GrocerySortOption } from "@/typescript";

interface Props {
  value: GrocerySortOption;
  onChange: (value: GrocerySortOption) => void;
}

const GrocerySort = ({ value, onChange }: Props) => {
  return (
    <div className="w-full sm:w-[220px]">
      <label
        htmlFor="sort"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Sort By Price
      </label>

      <select
        id="sort"
        value={value}
        onChange={(event) => onChange(event.target.value as GrocerySortOption)}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
      >
        <option value="default">Default</option>
        <option value="low-to-high">Low to High</option>
        <option value="high-to-low">High to Low</option>
      </select>
    </div>
  );
};

export default GrocerySort;