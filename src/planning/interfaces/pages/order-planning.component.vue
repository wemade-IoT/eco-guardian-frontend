<script setup lang="ts">
import { ref } from 'vue';
import CalendarOrder from "@/planning/interfaces/components/calendar-order.component.vue";
import TimeSlotsOrder from "@/planning/interfaces/components/time-slots-order.component.vue";
import Button from "primevue/button";
import { useOrderStore } from "../../../planning/interfaces/stores/order-store.ts";
import { OrderDetailRequest } from "../../../planning/domain/order-detail-request.ts";
import { useRouter } from 'vue-router';
import { createModal } from '../../../public/utils/helpers/create-modal.ts';
import CustomDialog from '../../../shared/components/ui/custom-dialog.component.vue';
import ProgressSpinner from 'primevue/progressspinner'
import { useDialog } from 'primevue';
import { useAuthStore } from '../../../iam/interfaces/store/auth-store.ts';
import { simulateRequest } from '../../../public/utils/helpers/sleep.ts';

const orderStore = useOrderStore();
const selectedDate = ref<Date | null>(null);
const selectedSlot = ref<number>(0);
const dialog = useDialog();
const authStore = useAuthStore();

const consumerId = authStore.user?.id || 0;
//TODO: Reemplazar los detalles de la orden por los reales
const details = [
  new OrderDetailRequest(1, 1, 100, 'Instalación básica', 10)
];

const router = useRouter();
const isLoading = ref<boolean>(false);

async function confirmInstallation() {
  try {
    if (!selectedDate.value) {
      alert('Selecciona una fecha');
      return;
    }
    isLoading.value = true
    await simulateRequest(2000)

    createModal(
      dialog,
      CustomDialog,
      {
        title: '¡Horario de instalación agendado!',
        subtitle: 'El horario de instalación fue seleccionado con éxito. Ahora realiza el pago para completar tu pedido. Puedes ver el estado en el panel de administración',
        type: 'success',
        severity: 'success',
        redirectionPath: '/order-payment'
      }
    );
  } catch (error) {
    console.error(error);
    alert('Ocurrió un error al agendar la instalación.');
  } finally {
    isLoading.value = false; // Finaliza el loading
  }
}

function cancelInstallation() {
  router.push('/home');
}
</script>

<template>
  <div class="w-[80%] min-h-screen flex flex-row items-center justify-center mx-auto">
    <div class="flex flex-col flex-1 gap-4">
      <calendar-order v-model="selectedDate" />
      <time-slots-order v-model="selectedSlot" />
      <div class="action-buttons">
        <Button class="cancel-button" @click="cancelInstallation" variant="outline">
          <svg class="button-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
          Cancel
        </Button>

        <Button class="confirm-button" @click="confirmInstallation" variant="primary">
          <svg class="button-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd" />
          </svg>
          Confirm Installation
        </Button>
      </div>
    </div>
  </div>
  <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
    <ProgressSpinner style="width: 50px; height: 50px; color: #578257;" strokeWidth="5" fill="transparent"
      animationDuration=".5s" aria-label="Custom ProgressSpinner" />
  </div>
</template>

<style scoped>
.action-buttons {
  margin-top: 12px;
  margin-bottom: 25px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
}

.cancel-button,
.confirm-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 12px 24px;
  font-weight: 500;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-button {
  background: #ffffff;
  color: #64748b;
  border-color: #cbd5e1;
}

.cancel-button:hover {
  background: #f8fafc;
  border-color: #94a3b8;
  color: #475569;
}

.confirm-button {
  background: #426138;
  color: white;
  border-color: #426138;
  min-width: 180px;
}

.confirm-button:hover {
  background: #365530;
  border-color: #365530;
}

.button-icon {
  width: 16px;
  height: 16px;
}


@media (max-width: 640px) {
  .action-buttons {
    flex-direction: column;
    gap: 12px;
  }

  .cancel-button,
  .confirm-button {
    width: 100%;
    min-width: auto;
  }
}
</style>