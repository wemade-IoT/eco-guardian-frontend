import * as yup from "yup";

const paymentCardSchema = yup.object({
  cardNumber: yup
    .string()
    .matches(/^\d{16}$/, "Card number must be exactly 16 digits")
    .required("Card number is required"),
  cardHolderName: yup
    .string()
    .min(3, "Card holder name must be at least 3 characters")
    .required("Card holder name is required"),
  expirationDate: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Expiration date must be in MM/YY format")
    .required("Expiration date is required"),
  cvv: yup
    .string()
    .matches(/^\d{3}$/, "CVV must be exactly 3 digits")
    .required("CVV is required"),
});

export default paymentCardSchema;