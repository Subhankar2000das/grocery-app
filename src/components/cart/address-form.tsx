"use client";

import { Controller, type Control, type FieldErrors } from "react-hook-form";
import type { IAddressFormValues } from "@/typescript";

interface Props {
  control: Control<IAddressFormValues>;
  errors: FieldErrors<IAddressFormValues>;
}

const AddressForm = ({ control, errors }: Props) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-extrabold text-slate-900">Delivery Address</h2>
      <p className="mt-2 text-sm text-slate-500">
        Add your address and phone number before placing the order.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Full Name"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            )}
          />
          {errors.fullName ? (
            <p className="mt-2 text-sm text-red-500">{errors.fullName.message}</p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Phone Number"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            )}
          />
          {errors.phoneNumber ? (
            <p className="mt-2 text-sm text-red-500">
              {errors.phoneNumber.message}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <Controller
            name="addressLine"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={4}
                placeholder="House / Flat / Area / Street"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            )}
          />
          {errors.addressLine ? (
            <p className="mt-2 text-sm text-red-500">
              {errors.addressLine.message}
            </p>
          ) : null}
        </div>

        <div>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="City"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            )}
          />
          {errors.city ? (
            <p className="mt-2 text-sm text-red-500">{errors.city.message}</p>
          ) : null}
        </div>

        <div>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="State"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            )}
          />
          {errors.state ? (
            <p className="mt-2 text-sm text-red-500">{errors.state.message}</p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <Controller
            name="pincode"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Pincode"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            )}
          />
          {errors.pincode ? (
            <p className="mt-2 text-sm text-red-500">{errors.pincode.message}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AddressForm;