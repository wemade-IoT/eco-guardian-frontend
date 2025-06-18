export interface IPaymentIntent {
  amount: number;
  currency: string;
  paymentMethodId?: string;
}