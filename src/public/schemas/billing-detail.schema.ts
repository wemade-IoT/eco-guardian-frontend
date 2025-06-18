import * as yup from "yup";

const billingDetailSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  country: yup.string().required("Country is required"),
  discountCode: yup
  .string()
  .nullable()
  .notRequired()
  .test(
    'is-valid-or-empty',
    'Discount code must be in the format WORD-YYYY',
    value => !value || /^[A-Za-z]+-\d{4}$/.test(value)
  ),
});

export default billingDetailSchema;
