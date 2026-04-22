"use client";

import { create } from "zustand";
import { getCouponCookie, removeCouponCookie, setCouponCookie } from "@/lib/cookies";
import { calculateCartPricing, getCouponByCode } from "@/utils/pricing";
import type {
  IAddressFormValues,
  ICartItem,
  ICartState,
  ICoupon,
  IGroceryItem,
  ILastAction,
} from "@/typescript";

interface ICartStore extends ICartState {
  isHydrated: boolean;
  hydrateCart: () => void;
  addItem: (item: IGroceryItem) => void;
  decreaseItem: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  applyCoupon: (couponCode: string) => { success: boolean; message: string };
  removeAppliedCoupon: () => void;
  setAddress: (address: IAddressFormValues) => void;
  undoLastAction: () => void;
  placeOrder: () => void;
  getTotalItems: () => number;
  getPricing: () => {
    subtotal: number;
    discount: number;
    deliveryFee: number;
    total: number;
    appliedCouponCode: string | null;
  };
}

const CART_STORAGE_KEY = "grocery_cart";
const ADDRESS_STORAGE_KEY = "grocery_address";
const LAST_ACTION_STORAGE_KEY = "grocery_last_action";

const getInitialLastAction = (): ILastAction => ({
  type: null,
  item: null,
});

const getStoredCartItems = (): ICartItem[] => {
  if (typeof window === "undefined") return [];

  const storedCart = localStorage.getItem(CART_STORAGE_KEY);
  if (!storedCart) return [];

  try {
    return JSON.parse(storedCart) as ICartItem[];
  } catch {
    return [];
  }
};

const getStoredAddress = (): IAddressFormValues | null => {
  if (typeof window === "undefined") return null;

  const storedAddress = localStorage.getItem(ADDRESS_STORAGE_KEY);
  if (!storedAddress) return null;

  try {
    return JSON.parse(storedAddress) as IAddressFormValues;
  } catch {
    return null;
  }
};

const getStoredLastAction = (): ILastAction => {
  if (typeof window === "undefined") return getInitialLastAction();

  const storedLastAction = localStorage.getItem(LAST_ACTION_STORAGE_KEY);
  if (!storedLastAction) return getInitialLastAction();

  try {
    return JSON.parse(storedLastAction) as ILastAction;
  } catch {
    return getInitialLastAction();
  }
};

const persistCartState = (
  cartItems: ICartItem[],
  address: IAddressFormValues | null,
  lastAction: ILastAction
) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(address));
  localStorage.setItem(LAST_ACTION_STORAGE_KEY, JSON.stringify(lastAction));
};

export const useCartStore = create<ICartStore>((set, get) => ({
  cartItems: [],
  appliedCoupon: null,
  lastAction: getInitialLastAction(),
  address: null,
  isHydrated: false,

  hydrateCart: () => {
    const storedCartItems = getStoredCartItems();
    const storedAddress = getStoredAddress();
    const storedLastAction = getStoredLastAction();
    const storedCouponCode = getCouponCookie();

    let appliedCoupon: ICoupon | null = null;

    if (storedCouponCode) {
      appliedCoupon = getCouponByCode(storedCouponCode) ?? null;
    }

    set({
      cartItems: storedCartItems,
      address: storedAddress,
      lastAction: storedLastAction,
      appliedCoupon,
      isHydrated: true,
    });
  },

  addItem: (item) => {
    const state = get();

    const existingCartItem = state.cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    const updatedCartItems = existingCartItem
      ? state.cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      : [...state.cartItems, { ...item, quantity: 1 }];

    const updatedLastAction: ILastAction = {
      type: "add",
      item: { ...item, quantity: 1 },
    };

    persistCartState(updatedCartItems, state.address, updatedLastAction);

    set({
      cartItems: updatedCartItems,
      lastAction: updatedLastAction,
    });
  },

  decreaseItem: (itemId) => {
    const state = get();

    const existingCartItem = state.cartItems.find(
      (cartItem) => cartItem.id === itemId
    );

    if (!existingCartItem) return;

    const updatedCartItems =
      existingCartItem.quantity === 1
        ? state.cartItems.filter((cartItem) => cartItem.id !== itemId)
        : state.cartItems.map((cartItem) =>
            cartItem.id === itemId
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          );

    const updatedLastAction: ILastAction = {
      type: "remove",
      item: { ...existingCartItem, quantity: 1 },
    };

    persistCartState(updatedCartItems, state.address, updatedLastAction);

    set({
      cartItems: updatedCartItems,
      lastAction: updatedLastAction,
    });
  },

  removeItem: (itemId) => {
    const state = get();

    const existingCartItem = state.cartItems.find(
      (cartItem) => cartItem.id === itemId
    );

    if (!existingCartItem) return;

    const updatedCartItems = state.cartItems.filter(
      (cartItem) => cartItem.id !== itemId
    );

    const updatedLastAction: ILastAction = {
      type: "remove",
      item: existingCartItem,
    };

    persistCartState(updatedCartItems, state.address, updatedLastAction);

    set({
      cartItems: updatedCartItems,
      lastAction: updatedLastAction,
    });
  },

  clearCart: () => {
    const state = get();
    const resetLastAction = getInitialLastAction();

    persistCartState([], state.address, resetLastAction);

    set({
      cartItems: [],
      lastAction: resetLastAction,
    });
  },

  applyCoupon: (couponCode) => {
    const state = get();
    const matchedCoupon = getCouponByCode(couponCode);

    if (!matchedCoupon) {
      return {
        success: false,
        message: "Invalid coupon code.",
      };
    }

    const subtotal = state.cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    if (subtotal < matchedCoupon.minimumOrderAmount) {
      return {
        success: false,
        message: `Minimum order amount should be ₹${matchedCoupon.minimumOrderAmount}.`,
      };
    }

    setCouponCookie(matchedCoupon.code);

    set({
      appliedCoupon: matchedCoupon,
    });

    return {
      success: true,
      message: `${matchedCoupon.code} applied successfully.`,
    };
  },

  removeAppliedCoupon: () => {
    removeCouponCookie();

    set({
      appliedCoupon: null,
    });
  },

  setAddress: (address) => {
    const state = get();

    persistCartState(state.cartItems, address, state.lastAction);

    set({
      address,
    });
  },

  undoLastAction: () => {
    const state = get();
    const { lastAction, cartItems, address } = state;

    if (!lastAction.item || !lastAction.type) return;

    let updatedCartItems: ICartItem[] = [...cartItems];

    if (lastAction.type === "add") {
      const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === lastAction.item?.id
      );

      if (!existingCartItem) {
        const resetLastAction = getInitialLastAction();
        persistCartState(cartItems, address, resetLastAction);
        set({ lastAction: resetLastAction });
        return;
      }

      updatedCartItems =
        existingCartItem.quantity === 1
          ? cartItems.filter((cartItem) => cartItem.id !== existingCartItem.id)
          : cartItems.map((cartItem) =>
              cartItem.id === existingCartItem.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            );
    }

    if (lastAction.type === "remove") {
      const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === lastAction.item?.id
      );

      updatedCartItems = existingCartItem
        ? cartItems.map((cartItem) =>
            cartItem.id === lastAction.item?.id
              ? {
                  ...cartItem,
                  quantity: cartItem.quantity + (lastAction.item?.quantity ?? 1),
                }
              : cartItem
          )
        : [...cartItems, lastAction.item];
    }

    const resetLastAction = getInitialLastAction();

    persistCartState(updatedCartItems, address, resetLastAction);

    set({
      cartItems: updatedCartItems,
      lastAction: resetLastAction,
    });
  },

  placeOrder: () => {
    removeCouponCookie();

    if (typeof window !== "undefined") {
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(LAST_ACTION_STORAGE_KEY);
    }

    set({
      cartItems: [],
      appliedCoupon: null,
      lastAction: getInitialLastAction(),
    });
  },

  getTotalItems: () => {
    return get().cartItems.reduce((total, item) => total + item.quantity, 0);
  },

  getPricing: () => {
    const state = get();

    return calculateCartPricing(
      state.cartItems,
      state.appliedCoupon?.code ?? null
    );
  },
}));