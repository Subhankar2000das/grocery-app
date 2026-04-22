import type { GroceryCategory } from "../types/category.type";

export interface IGroceryItem {
  id: string;
  name: string;
  price: number;
  category: GroceryCategory;
  image: string;
}