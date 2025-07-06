export class PaymentResponse {
  id: number;
  paymentIntentId: string;
  paymentMethodId: string;
  amount: number;
  currency: string;
  paymentStatus: string;
  userId: number;
  referenceId: number;
  referenceType: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    paymentIntentId: string,
    paymentMethodId: string,
    amount: number,
    currency: string,
    paymentStatus: string,
    userId: number,
    referenceId: number,
    referenceType: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.paymentIntentId = paymentIntentId;
    this.paymentMethodId = paymentMethodId;
    this.amount = amount;
    this.currency = currency;
    this.paymentStatus = paymentStatus;
    this.userId = userId;
    this.referenceId = referenceId;
    this.referenceType = referenceType;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}