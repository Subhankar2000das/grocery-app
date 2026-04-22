import type { GrocerySortOption, IGroceryItem } from "@/typescript";

export const sortProducts = (
  products: IGroceryItem[],
  sortOption: GrocerySortOption
): IGroceryItem[] => {
  const sortedProducts = [...products];

  if (sortOption === "low-to-high") {
    return sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOption === "high-to-low") {
    return sortedProducts.sort((a, b) => b.price - a.price);
  }

  return sortedProducts;
};