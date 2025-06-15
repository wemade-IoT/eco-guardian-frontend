<script setup lang="ts">
import { ref } from 'vue';
import CalendarOrder from "@/planning/interfaces/components/calendar-order.component.vue";
import TimeSlotsOrder from "@/planning/interfaces/components/time-slots-order.component.vue";
import Button from "primevue/button";
import {useOrderStore} from "@/planning/interfaces/stores/order-store.ts";
import {OrderDetailRequest} from "@/planning/domain/order-detail-request.ts";
import {OrderRequest} from "@/planning/domain/order-request.ts";

const orderStore = useOrderStore();
const selectedDate = ref<Date|null>(null);
const selectedSlot = ref<number>(0);

const consumerId = 1; //TODO: Reemplazar por el id real del usuario
//TODO: Reemplazar los detalles de la orden por los reales
const details = [
  new OrderDetailRequest(1, 1, 100, 'Instalación básica', 10)
];

function confirmInstallation() {
  if (!selectedDate.value) {
    alert('Selecciona una fecha');
    return;
  }
  const date = new Date(selectedDate.value);

  const request = new OrderRequest(
    'Plant',
    consumerId,
    date,
    details
  );
  orderStore.createOrder(request);
}
</script>

<template>
  <div class="w-[80%] min-h-screen flex flex-row items-center justify-center mx-auto">
    <div class="flex flex-col flex-1">
      <calendar-order v-model="selectedDate" />
      <time-slots-order v-model="selectedSlot" />
      <div class="flex justify-end mt-4 p-4">
        <Button class="confirm-button text-white px-6 py-2 w-[15rem]" @click="confirmInstallation">
          Confirm Installation
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.confirm-button {
  background-color: var(--color-primary);
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
}
.confirm-button:hover,
.confirm-button:focus,
.confirm-button:active {
  background-color: var(--color-primary) !important;
}
</style>