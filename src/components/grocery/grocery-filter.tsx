"use client";

import type { GroceryCategoryFilter } from "@/typescript";

interface Props {
  selectedCategory: GroceryCategoryFilter;
  onSelectCategory: (category: GroceryCategoryFilter) => void;
}

const categories: GroceryCategoryFilter[] = [
  "All",
  "Fruits",
  "Veggies",
  "Groceries",
];

const GroceryFilter = ({ selectedCategory, onSelectCategory }: Props) => {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const isActive = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-green-600 text-white shadow-lg shadow-green-200"
                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default GroceryFilter;