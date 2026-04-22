"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useCartStore } from "@/store/use-cart-store";
import { couponSchema } from "@/utils/validation";
import type { ICouponFormValues } from "@/typescript";

const CouponForm = () => {
  const applyCoupon = useCartStore((state) => state.applyCoupon);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ICouponFormValues>({
    resolver: yupResolver(couponSchema),
    defaultValues: {
      couponCode: "",
    },
  });

  const onSubmit = (values: ICouponFormValues) => {
    const response = applyCoupon(values.couponCode.trim().toUpperCase());

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);
    reset();
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-extrabold text-slate-900">Apply Coupon</h2>
      <p className="mt-2 text-sm text-slate-500">
        Use <span className="font-semibold text-slate-700">SAVE10</span> on ₹100+
        or <span className="font-semibold text-slate-700">SAVE20</span> on ₹200+.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
        <div>
          <Controller
            name="couponCode"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter coupon code"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            )}
          />

          {errors.couponCode ? (
            <p className="mt-2 text-sm text-red-500">
              {errors.couponCode.message}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Apply Coupon
        </button>
      </form>
    </div>
  );
};

export default CouponForm;