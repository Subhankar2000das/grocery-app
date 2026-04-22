import { deleteCookie, getCookie, setCookie } from "cookies-next";

const COUPON_COOKIE_KEY = "grocery_coupon";

export const setCouponCookie = (couponCode: string): void => {
  setCookie(COUPON_COOKIE_KEY, couponCode, {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
};

export const getCouponCookie = (): string | null => {
  const couponCode = getCookie(COUPON_COOKIE_KEY);

  if (!couponCode || typeof couponCode !== "string") {
    return null;
  }

  return couponCode;
};

export const removeCouponCookie = (): void => {
  deleteCookie(COUPON_COOKIE_KEY, {
    path: "/",
  });
};