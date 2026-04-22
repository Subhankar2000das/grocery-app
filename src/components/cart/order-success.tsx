"use client";

import Link from "next/link";

const OrderSuccess = () => {
  return (
    <div className="rounded-3xl border border-green-200 bg-green-50 p-8 text-center shadow-sm">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-3xl font-black text-white">
        ✓
      </div>

      <h2 className="mt-5 text-2xl font-black text-slate-900">
        Order Successful
      </h2>

      <p className="mt-3 text-sm text-slate-600 sm:text-base">
        Your order has been placed successfully and will be delivered in
        approximately 30 minutes.
      </p>

      <Link
        href="/grocery"
        className="mt-6 inline-flex rounded-2xl bg-green-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;