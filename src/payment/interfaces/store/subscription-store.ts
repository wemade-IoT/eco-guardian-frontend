import { defineStore } from "pinia";
import { SubscriptionAssembler } from "../../domain/assembler/subscription-assembler";
import { SubscriptionService } from "../../infrastructure/services/subscription.service";
import type { SubscriptionResponse } from "../../domain/assembler/subscription-response";
import type { SubscriptionRequest } from "../../domain/assembler/subscription-request";

const subscriptionService = new SubscriptionService();
const subscriptionAssembler = new SubscriptionAssembler();

export const useSubscriptionStore = defineStore("subscription", {
  state: () => ({
    subscriptions: [] as SubscriptionResponse[],
  }),

  actions: {
    async createSubscription(req: SubscriptionRequest) {
      try {
        const response = await subscriptionService.createSubscription(req);
        const subscriptionResponse = subscriptionAssembler.toResponse(response);
        return subscriptionResponse;
      } catch (error) {
        console.error("Error creating subscription:", error);
        throw error;
      }
    },

    async fetchAllSubscriptions() {
      try {
        const response = await subscriptionService.getAllSubscriptions();
        this.subscriptions = response.map(subscriptionAssembler.toResponse);
      } catch (error) {
        console.error("Error fetching all subscriptions:", error);
        throw error;
      }
    },

    async fetchSubscriptionByUserId(userId: string) {
      try {
        const response = await subscriptionService.getSubscriptionByUserId(
          userId
        );
        return response.map(subscriptionAssembler.toResponse);
      } catch (error) {
        console.error("Error fetching subscription by user ID:", error);
        throw error;
      }
    },
  },
});
