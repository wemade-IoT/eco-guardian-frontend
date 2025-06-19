import { defineStore } from "pinia";
import { PaymentAssembler } from "../../domain/assembler/payment-assembler";
import { PaymentService } from "../../infrastructure/services/payment.service";
import type { IPaymentIntent } from "../../../public/utils/interfaces/payment-intent";
import type { PaymentRequest } from "../../domain/assembler/payment-request";

const paymentService = new PaymentService();
const paymentAssembler = new PaymentAssembler();

export const usePaymentStore = defineStore("payment", {
  state: () => ({
    payments: [] as PaymentResponse[],
  }),

  actions: {
    async createPaymentIntent(data: IPaymentIntent): Promise<any> {
      try {
        const response = await paymentService.createPaymentIntent(data);
        return response;
      } catch (error) {
        console.error("Error creating payment intent:", error);
        throw error;
      }
    },

    async createPayment(req: PaymentRequest) {
      try {
        const response = await paymentService.createPayment(req);
        const paymentResponse = paymentAssembler.toResponse(response);
        return paymentResponse;
      } catch (error) {
        console.error("Error creating payment intent:", error);
        throw error;
      }
    },

    async confirmPaymentIntent(paymentIntentId: string) {
      try {
        const response = await paymentService.confirmPaymentIntent(
          paymentIntentId
        );
        return response;
      } catch (error) {
        console.error("Error confirming payment intent:", error);
        throw error;
      }
    },

    async fetchAllPayments() {
      try {
        const response = await paymentService.getAllPayments();
        this.payments = response.data.map(paymentAssembler.toResponse);
      } catch (error) {
        console.error("Error fetching payments:", error);
        throw error;
      }
    },

    async fetchPaymentByUserId(userId: string) {
      try {
        const response = await paymentService.getPaymentByUserId(userId);
        return response.data.map(paymentAssembler.toResponse);
      } catch (error) {
        console.error("Error fetching payment by user ID:", error);
        throw error;
      }
    },
  },
});
