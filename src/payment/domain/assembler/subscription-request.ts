export class SubscriptionRequest {
  userId: string;
  subscriptionTypeId: string;
  subscriptionStateId: string;
  currency: string;
  amount: number;

  constructor(
    userId: string,
    subscriptionTypeId: string,
    subscriptionStateId: string,
    currency: string,
    amount: number
  ) {
    this.userId = userId;
    this.subscriptionTypeId = subscriptionTypeId;
    this.subscriptionStateId = subscriptionStateId;
    this.currency = currency;
    this.amount = amount;
  }
}
