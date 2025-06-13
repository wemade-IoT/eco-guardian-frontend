import * as yup from "yup";

const billingDetailSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  country: yup.string().required("Country is required"),
  discountCode: yup
    .string()
    .test(
      "empty-or-16-no-spaces",
      "Discount code must be exactly 16 non-space characters",
      value => !value || (value.length === 16 && !/\s/.test(value))
    )
    .optional(),
});

export default billingDetailSchema;
