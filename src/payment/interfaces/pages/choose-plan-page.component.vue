<template>
  <div class="payment-container py-12 text-red-100 min-[100dvh] w-full">
    <div class="flex flex-col items-center justify-center gap-5">
      <h1 class="text-4xl text-gray-900 font-extrabold tracking-tight">Choose Your Plan</h1>
      <p class="text-lg text-gray-500 font-medium tracking-wide text-center max-w-[450px] text-pretty">
        Find the subscription that fits your needs. Upgrade, downgrade, or cancel anytime.
      </p>
    </div>
    <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 w-full mx-auto">
      <plan-card v-for="(plan, index) in plans" :key="index" :plan="plan" :plant-selected="planSelected"
        @select="planSelected = $event" @price="selectedPrice = $event"></plan-card>
    </div>
    <billing-form :amount="selectedPrice" :is-plan-selected="isPlanSelected"
      :plan-selected="planSelected"></billing-form>
  </div>
  <!-- <confirm-payment-modal></confirm-payment-modal> -->
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PlanType } from '../../../public/utils/types/plan-selected';
import { plans } from '../../../public/utils/consts/plans';
import PlanCard from '../components/plan-card.component.vue';
import BillingForm from '../components/billing-form.component.vue';
import { useAuthStore } from '../../../iam/interfaces/store/auth-store';

const auth = useAuthStore();

console.log('userData', auth.userData);

const planSelected = ref<PlanType | null>(null);
const selectedPrice = ref<number>(0);

const isPlanSelected = computed(() => {
  return planSelected.value !== null;
});
</script>

<style scoped>
.payment-container {
  max-width: 1050px;
  margin: 0 auto;
  width: 90%;
}
</style>