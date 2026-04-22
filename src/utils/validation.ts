import * as yup from "yup";

export const couponSchema = yup.object({
  couponCode: yup
    .string()
    .trim()
    .required("Coupon code is required"),
});

export const addressSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("Full name is required"),

  phoneNumber: yup
    .string()
    .trim()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),

  addressLine: yup
    .string()
    .trim()
    .required("Address is required"),

  city: yup
    .string()
    .trim()
    .required("City is required"),

  state: yup
    .string()
    .trim()
    .required("State is required"),

  pincode: yup
    .string()
    .trim()
    .required("Pincode is required")
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digits"),
});