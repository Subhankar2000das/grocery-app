import type { Nullable, UndoActionType } from "../types/common.type";
import type { ICoupon } from "./coupon.interface";
import type { IAddressFormValues } from "./form.interface";
import type { IGroceryItem } from "./grocery.interface";

export interface ICartItem extends IGroceryItem {
  quantity: number;
}

export interface ILastAction {
  type: UndoActionType;
  item: Nullable<ICartItem>;
}

export interface ICartState {
  cartItems: ICartItem[];
  appliedCoupon: Nullable<ICoupon>;
  lastAction: ILastAction;
  address: Nullable<IAddressFormValues>;
}

export interface ICartPricing {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  appliedCouponCode: string | null;
}