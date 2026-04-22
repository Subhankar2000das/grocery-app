"use client";

import CartItem from "./cart-item";
import { useCartStore } from "@/store/use-cart-store";

const CartList = () => {
  const cartItems = useCartStore((state) => state.cartItems);

  if (!cartItems.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <h3 className="text-xl font-bold text-slate-800">Your cart is empty</h3>
        <p className="mt-2 text-sm text-slate-500">
          Add some fresh items from the grocery page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CartList;