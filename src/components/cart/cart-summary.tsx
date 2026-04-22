"use client";

import { useCartStore } from "@/store/use-cart-store";

const CartSummary = () => {
  const pricing = useCartStore((state) => state.getPricing());
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const removeAppliedCoupon = useCartStore((state) => state.removeAppliedCoupon);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-slate-900">Order Summary</h2>

        {appliedCoupon ? (
          <button
            type="button"
            onClick={removeAppliedCoupon}
            className="text-sm font-semibold text-red-600 transition hover:text-red-700"
          >
            Remove Coupon
          </button>
        ) : null}
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-900">₹{pricing.subtotal}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Discount</span>
          <span className="font-semibold text-green-600">-₹{pricing.discount}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Delivery Fee</span>
          <span className="font-semibold text-slate-900">
            {pricing.deliveryFee === 0 ? "Free" : `₹${pricing.deliveryFee}`}
          </span>
        </div>

        {appliedCoupon ? (
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Coupon</span>
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
              {appliedCoupon.code}
            </span>
          </div>
        ) : null}

        <div className="border-t border-dashed border-slate-200 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-slate-900">Total</span>
            <span className="text-2xl font-extrabold text-slate-900">
              ₹{pricing.total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;