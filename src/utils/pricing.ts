import { coupons } from "@/constants/coupons";
import { DELIVERY_FEE, FREE_DELIVERY_MINIMUM_ORDER } from "@/constants/delivery";
import type { ICartItem, ICartPricing } from "@/typescript";

export const calculateSubtotal = (cartItems: ICartItem[]): number => {
  return cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

export const getCouponByCode = (couponCode: string) => {
  return coupons.find(
    (coupon) => coupon.code.toLowerCase() === couponCode.trim().toLowerCase()
  );
};

export const calculateCouponDiscount = (
  subtotal: number,
  couponCode: string | null
): number => {
  if (!couponCode) {
    return 0;
  }

  const matchedCoupon = getCouponByCode(couponCode);

  if (!matchedCoupon) {
    return 0;
  }

  if (subtotal < matchedCoupon.minimumOrderAmount) {
    return 0;
  }

  return Math.floor((subtotal * matchedCoupon.discountPercentage) / 100);
};

export const calculateDeliveryFee = (subtotal: number): number => {
  if (subtotal >= FREE_DELIVERY_MINIMUM_ORDER) {
    return 0;
  }

  return DELIVERY_FEE;
};

export const calculateCartPricing = (
  cartItems: ICartItem[],
  couponCode: string | null
): ICartPricing => {
  const subtotal = calculateSubtotal(cartItems);
  const discount = calculateCouponDiscount(subtotal, couponCode);
  const deliveryFee = calculateDeliveryFee(subtotal);
  const total = subtotal - discount + deliveryFee;

  return {
    subtotal,
    discount,
    deliveryFee,
    total,
    appliedCouponCode: couponCode,
  };
};