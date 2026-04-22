import type { ICoupon } from "@/typescript";

export const coupons: ICoupon[] = [
  {
    code: "SAVE10",
    discountPercentage: 10,
    minimumOrderAmount: 100,
  },
  {
    code: "SAVE20",
    discountPercentage: 20,
    minimumOrderAmount: 200,
  },
];