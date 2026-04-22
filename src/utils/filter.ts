import type { GroceryCategoryFilter, IGroceryItem } from "@/typescript";

interface IFilterProductsParams {
  products: IGroceryItem[];
  searchTerm: string;
  selectedCategory: GroceryCategoryFilter;
}

export const filterProducts = ({
  products,
  searchTerm,
  selectedCategory,
}: IFilterProductsParams): IGroceryItem[] => {
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  return products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(normalizedSearchTerm);

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
};