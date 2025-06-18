import { SubscriptionRequest } from "./subscription-request";
import { SubscriptionResponse } from "./subscription-response";

export class SubscriptionAssembler {
  toResponse(subscriptionRequest: any): SubscriptionResponse {
    return new SubscriptionResponse(
      subscriptionRequest.id,
      subscriptionRequest.userId,
      subscriptionRequest.subscriptionTypeId,
      subscriptionRequest.subscriptionStateId,
      subscriptionRequest.currency,
      subscriptionRequest.amount,
      new Date(subscriptionRequest.createdAt),
      new Date(subscriptionRequest.updatedAt),
      subscriptionRequest.expirationDate
    );
  }

  toRequest(subscriptionResponse: any): SubscriptionRequest {
    return new SubscriptionRequest(
      subscriptionResponse.userId,
      subscriptionResponse.subscriptionTypeId,
      subscriptionResponse.subscriptionStateId,
      subscriptionResponse.currency,
      subscriptionResponse.amount
    );
  }
}