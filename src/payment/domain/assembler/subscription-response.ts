export class SubscriptionResponse {
  id: number;
  userId: string;
  subscriptionTypeId: string;
  subscriptionStateId: string;
  currency: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  expirationDate: Date;

  constructor(
    id: number,
    userId: string,
    subscriptionTypeId: string,
    subscriptionStateId: string,
    currency: string,
    amount: number,
    createdAt: Date,
    updatedAt: Date,
    expirationDate: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.subscriptionTypeId = subscriptionTypeId;
    this.subscriptionStateId = subscriptionStateId;
    this.currency = currency;
    this.amount = amount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.expirationDate = expirationDate;
  }
}
