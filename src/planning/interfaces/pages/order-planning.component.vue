<script setup lang="ts">
import { ref, computed } from 'vue';
import CalendarOrder from "@/planning/interfaces/components/calendar-order.component.vue";
import TimeSlotsOrder from "@/planning/interfaces/components/time-slots-order.component.vue";
import Button from "primevue/button";
import { useOrderStore } from "../../../planning/interfaces/stores/order-store.ts";
import { useRouter } from 'vue-router';
import { createModal } from '../../../public/utils/helpers/create-modal.ts';
import CustomDialog from '../../../shared/components/ui/custom-dialog.component.vue';
import ProgressSpinner from 'primevue/progressspinner'
import { Select, useDialog } from 'primevue';
import { simulateRequest } from '../../../public/utils/helpers/sleep.ts';

const orderStore = useOrderStore(); 
const selectedDate = ref<Date | null>(null);
const selectedSlot = ref<number>(9); // Hora por defecto: 9 AM
const dialog = useDialog();


const router = useRouter();
const isLoading = ref<boolean>(false);

// Computed para verificar si se puede confirmar la instalación
const canConfirmInstallation = computed(() => {
  //Mostramos los valores
  console.log('Selected Date:', selectedDate.value);
  console.log('Selected Time Slot:', selectedSlot.value);
  return orderStore.isOrderDataComplete && selectedDate.value !== null;
});


// Computed para obtener la información completa de la instalación
const installationInfo = computed(() => {
  const date = selectedDate.value;
  if (!date) return null;
  const hour = selectedSlot.value;
  

  const dateTime = dateBuilder(date, hour);

  return {
    date: dateTime.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    fullDateTime: (() => {
      let hours = dateTime.getHours();
      const minutes = dateTime.getMinutes();
      const amPm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      return `${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
    })(),
  };
});

function dateBuilder(date: Date, hour: number): Date {
  const newDate = new Date(date);
  // Establecemos la hora, minutos, segundos y milisegundos a cero
  newDate.setHours(hour, 0, 0, 0);
  return newDate;
}

async function confirmInstallation() {
  try {
    if (!canConfirmInstallation.value) {
      alert('Por favor selecciona una fecha y hora para la instalación');
      return;
    }
    isLoading.value = true;
    await simulateRequest(2000);

    if ( !selectedDate.value || !selectedSlot.value) {
      alert('Error: No se pudo obtener la fecha y hora de instalación');
      return;
    }

    const installationDate = dateBuilder(selectedDate.value, selectedSlot.value);

    orderStore.setInstallationDate(installationDate);

    //We build the installation date and time

    console.log('Fecha y hora de instalación:', orderStore.getSelectedInstallationDateTime );

    createModal(
      dialog,
      CustomDialog,
      {
        title: '¡Horario de instalación agendado!',
        subtitle: `El horario de instalación fue seleccionado con éxito para ${installationInfo.value?.date}. Ahora realiza el pago para completar tu pedido. Puedes ver el estado en el panel de administración`,
        type: 'success',
        severity: 'success',
        redirectionPath: '/order-payment'
      }
    );
  } catch (error) {
    console.error(error);
    alert('Ocurrió un error al agendar la instalación.');
  } finally {
    isLoading.value = false;
  }
}

function cancelInstallation() {
  // Limpiar el store al cancelar
  orderStore.clearNewOrder();
  router.push('/home');
}
</script>

<template>
  <div class="flex flex-1 flex-row items-center justify-center">
    <div class="flex flex-col flex-1">
      <div class="timepicker-container">
        <calendar-order  v-model="selectedDate" />
        <div class="flex flex-col flex-1 time-slot-picker">
          <time-slots-order v-model="selectedSlot" />
          
          <!-- Información de la instalación seleccionada -->
          <div v-if="installationInfo" class="installation-summary">
            <h3>Resumen de Instalación</h3>
            <p><strong>Fecha:</strong> {{ installationInfo.date }}</p>
            <p><strong>Hora:</strong> {{ installationInfo.fullDateTime}}</p>
          </div>
          
          <div class="action-buttons">
            <Button class="cancel-button" @click="cancelInstallation" variant="outline">
              <svg class="button-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
              Cancel
            </Button>

            <Button 
              class="confirm-button" 
              @click="confirmInstallation" 
              :disabled="!canConfirmInstallation"
              variant="primary"
            >
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
    </div>
  </div>
  <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
    <ProgressSpinner style="width: 50px; height: 50px; color: #578257;" strokeWidth="5" fill="transparent"
      animationDuration=".5s" aria-label="Custom ProgressSpinner" />
  </div>
</template>

<style scoped>
.installation-summary {
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
  border: 1px solid #10b981;
  border-radius: 12px;
  padding: 1rem;
  margin: 1rem 0;
}

.installation-summary h3 {
  color: #064e3b;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.installation-summary p {
  color: #047857;
  font-size: 0.95rem;
  margin: 0.25rem 0;
}

.action-buttons {
  margin-top: 12px;
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

.confirm-button:hover:not(:disabled) {
  background: #365530;
  border-color: #365530;
}

.confirm-button:disabled {
  background: #9ca3af;
  border-color: #9ca3af;
  cursor: not-allowed;
  opacity: 0.7;
}

.button-icon {
  width: 16px;
  height: 16px;
}

.timepicker-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
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