"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CartList from "@/components/cart/cart-list";
import CartSummary from "@/components/cart/cart-summary";
import CouponForm from "@/components/cart/coupon-form";
import AddressForm from "@/components/cart/address-form";
import UndoButton from "@/components/cart/undo-button";
import OrderSuccess from "@/components/cart/order-success";
import { useCartStore } from "@/store/use-cart-store";
import { addressSchema } from "@/utils/validation";
import type { IAddressFormValues } from "@/typescript";

const CartPage = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const savedAddress = useCartStore((state) => state.address);
  const setAddress = useCartStore((state) => state.setAddress);
  const placeOrder = useCartStore((state) => state.placeOrder);
  const hydrateCart = useCartStore((state) => state.hydrateCart);
  const isHydrated = useCartStore((state) => state.isHydrated);

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IAddressFormValues>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    hydrateCart();
  }, [hydrateCart]);

  useEffect(() => {
    if (savedAddress) {
      reset(savedAddress);
    }
  }, [savedAddress, reset]);

  const onSubmit = async (values: IAddressFormValues) => {
    if (!cartItems.length) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsOrdering(true);
    setAddress(values);

    await new Promise((resolve) => setTimeout(resolve, 1400));

    placeOrder();

    toast.success("Order placed successfully 🎉");
    toast("Your order will be delivered in 30 minutes 🚚");

    setIsOrderPlaced(true);
    setIsOrdering(false);
  };

  const isOrderDisabled = !cartItems.length || !isValid || isOrdering;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-black sm:text-4xl">Your Cart</h1>
              <p className="mt-2 text-sm text-white/90 sm:text-base">
                Review your items and complete your order
              </p>
            </div>

            <Link
              href="/grocery"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-green-700 transition hover:bg-slate-100"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {!isHydrated ? (
          <div className="text-center text-slate-500">Loading cart...</div>
        ) : isOrderPlaced ? (
          <OrderSuccess />
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-6">
              <UndoButton />
              <CartList />
            </div>

            <div className="space-y-6">
              <CartSummary />
              <CouponForm />
              <AddressForm control={control} errors={errors} />

              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isOrderDisabled}
                className="flex w-full items-center justify-center gap-3 rounded-3xl bg-green-600 px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-green-200 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              >
                {isOrdering ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Processing Order...
                  </>
                ) : (
                  "Place Order"
                )}
              </button>

              {!cartItems.length ? (
                <p className="text-center text-sm text-red-500">
                  Add items to your cart to place an order.
                </p>
              ) : null}

              {cartItems.length > 0 && !isValid ? (
                <p className="text-center text-sm text-amber-600">
                  Complete the address form to enable ordering.
                </p>
              ) : null}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default CartPage;