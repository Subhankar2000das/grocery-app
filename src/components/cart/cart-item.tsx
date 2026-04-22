"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useCartStore } from "@/store/use-cart-store";
import type { ICartItem } from "@/typescript";

interface Props {
  item: ICartItem;
}

const CartItem = ({ item }: Props) => {
  const addItem = useCartStore((state) => state.addItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleIncrease = () => {
    addItem(item);
    toast.success(`${item.name} quantity increased`);
  };

  const handleDecrease = () => {
    decreaseItem(item.id);
    toast.success(`${item.name} quantity decreased`);
  };

  const handleRemove = () => {
    removeItem(item.id);
    toast.success(`${item.name} removed from cart`);
  };

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-50 p-3">
          <Image
            src={item.image}
            alt={item.name}
            width={90}
            height={90}
            className="h-16 w-16 object-contain"
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
            {item.category}
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-900">{item.name}</h3>
          <p className="mt-1 text-sm text-slate-500">₹{item.price} each</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:items-end">
        <p className="text-lg font-extrabold text-slate-900">
          ₹{item.price * item.quantity}
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDecrease}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg font-bold text-slate-700 transition hover:bg-slate-50"
          >
            -
          </button>

          <span className="min-w-[36px] text-center text-base font-bold text-slate-900">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={handleIncrease}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-green-600 bg-green-600 text-lg font-bold text-white transition hover:bg-green-700"
          >
            +
          </button>

          <button
            type="button"
            onClick={handleRemove}
            className="ml-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;