import { PaymentRequest } from './payment-request';
import { PaymentResponse } from './payment-response';

export class PaymentAssembler {
  toResponse(paymentRequest: any): PaymentResponse {
    return new PaymentResponse(
      paymentRequest.id,
      paymentRequest.paymentIntentId,
      paymentRequest.paymentMethodId,
      paymentRequest.amount,
      paymentRequest.currency,
      paymentRequest.paymentStatus,
      paymentRequest.userId,
      paymentRequest.referenceId,
      paymentRequest.referenceType,
      new Date(paymentRequest.createdAt),
      new Date(paymentRequest.updatedAt)
    );
  }

  toRequest(paymentResponse: any): PaymentRequest {
    return new PaymentRequest(
      paymentResponse.paymentIntentId,
      paymentResponse.paymentMethodId,
      paymentResponse.amount,
      paymentResponse.currency,
      paymentResponse.paymentStatus,
      paymentResponse.userId,
      paymentResponse.referenceId,
    );
  }
}