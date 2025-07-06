export class PaymentRequest {
  paymentIntentId: string;
  paymentMethodId: string;
  amount: number;
  currency: string;
  paymentStatus: string;
  userId: number;
  referenceId: number;
  referenceType: number;

  constructor(
    paymentIntentId: string,
    paymentMethodId: string,
    amount: number,
    currency: string,
    paymentStatus: string,
    userId: number,
    referenceId: number,
    referenceType: number
  ) {
    this.paymentIntentId = paymentIntentId;
    this.paymentMethodId = paymentMethodId;
    this.amount = amount;
    this.currency = currency;
    this.paymentStatus = paymentStatus;
    this.userId = userId;
    this.referenceId = referenceId;
    this.referenceType = referenceType;
  }
}
