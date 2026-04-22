"use client";

import { useQuery } from "@tanstack/react-query";
import { groceryItems } from "@/data/grocery-items";
import type { IGroceryItem } from "@/typescript";

const GROCERY_QUERY_KEY = ["grocery-items"];

const getGroceryItems = async (): Promise<IGroceryItem[]> => {
  return Promise.resolve(groceryItems);
};

export const useGroceryQuery = () => {
  return useQuery({
    queryKey: GROCERY_QUERY_KEY,
    queryFn: getGroceryItems,
  });
};