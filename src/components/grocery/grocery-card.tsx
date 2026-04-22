"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useCartStore } from "@/store/use-cart-store";
import type { IGroceryItem } from "@/typescript";

interface Props {
  item: IGroceryItem;
}

const GroceryCard = ({ item }: Props) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(item);
    toast.success(`${item.name} added to cart`);
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex h-52 items-center justify-center bg-gradient-to-br from-green-50 via-white to-orange-50 p-6">
        <Image
          src={item.image}
          alt={item.name}
          width={180}
          height={180}
          className="h-36 w-36 object-contain transition duration-300 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-green-700 shadow-sm ring-1 ring-slate-100">
          {item.category}
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
          <p className="mt-1 text-sm text-slate-500">
            Fresh and quality grocery item
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-xl font-extrabold text-slate-900">₹{item.price}</p>

          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-2xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroceryCard;