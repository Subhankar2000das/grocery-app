export type Nullable<T> = T | null;

export type CartActionType =
  | "ADD_ITEM"
  | "DECREASE_ITEM"
  | "REMOVE_ITEM"
  | "CLEAR_CART"
  | "APPLY_COUPON"
  | "REMOVE_COUPON"
  | "UNDO_LAST_ACTION"
  | "SET_LAST_ACTION"
  | "SET_ADDRESS"
  | "PLACE_ORDER"
  | "HYDRATE_CART";

export type UndoActionType = "add" | "remove" | null;