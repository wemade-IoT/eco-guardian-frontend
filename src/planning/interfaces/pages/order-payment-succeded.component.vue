<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">

      <div class="mb-6">
        <div v-if="status === 'succeeded'"
          class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <div v-else-if="status === 'processing'"
          class="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div v-else class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
      </div>

      <div class="mb-6">
        <h1 v-if="status === 'succeeded'" class="text-2xl font-bold text-gray-900 mb-2">
          ¡Pago de orden realizado con éxito!
        </h1>
        <h1 v-else-if="status === 'processing'" class="text-2xl font-bold text-gray-900 mb-2">
          Procesando pago de orden
        </h1>
        <h1 v-else class="text-2xl font-bold text-gray-900 mb-2">
          Hubo un problema con el pago
        </h1>

        <p v-if="status === 'succeeded'" class="text-gray-600">
          Tu orden ha sido pagada correctamente. Tu instalación ha sido programada y recibirás un email de confirmación
          en breve.
        </p>
        <p v-else-if="status === 'processing'" class="text-gray-600">
          El pago de tu orden está siendo procesado. Te notificaremos cuando se complete.
        </p>
        <p v-else class="text-gray-600">
          No se pudo procesar el pago de tu orden. Por favor, intenta nuevamente o contacta a soporte.
        </p>
      </div>

      <div v-if="paymentIntent" class="mb-6 p-4 bg-gray-50 rounded-lg">
        <p class="text-sm text-gray-600">
          <span class="font-medium">ID de transacción:</span><br>
          <span class="font-mono text-xs">{{ paymentIntent }}</span>
        </p>
      </div>

      <div class="space-y-3">
        <button @click="goToProfile"
          class="w-full bg-[#578257] hover:bg-[#467046] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
          Ver mis órdenes
        </button>

        <button v-if="status !== 'succeeded'" @click="tryAgain"
          class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200">
          Intentar nuevamente
        </button>
      </div>

      <div class="mt-6 pt-4 border-t border-gray-200">
        <p class="text-xs text-gray-500">
          ¿Necesitas ayuda?
          <a href="mailto:support@ecoguardian.com" class="text-[#578257] hover:underline">
            Contactar soporte
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { OrderAssembler } from '../../domain/order-assembler';
import { useAuthStore } from '../../../iam/interfaces/store/auth-store';
import { PaymentAssembler } from '../../../payment/domain/assembler/payment-assembler';
import { useOrderStore } from '../stores/order-store';
import { usePaymentStore } from '../../../payment/interfaces/store/payment-store';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const status = ref('');
const paymentIntent = ref('');
const paymentStore = usePaymentStore();
const orderStore = useOrderStore();
const paymentAssembler = new PaymentAssembler();
//const orderAssembler = new OrderAssembler();

onMounted(() => {
  status.value = route.query.redirect_status as string || '';
  paymentIntent.value = route.query.payment_intent as string || '';

  if (status.value === 'succeeded') {
    processOrderPayment();
  }
});

async function processOrderPayment() {
  try {
    console.log('Starting order payment processing...');

    const paymentDataStr = localStorage.getItem('paymentOrderData');
    const orderUpdateStr = localStorage.getItem('orderUpdateRequest');

    if (!paymentDataStr || !orderUpdateStr) {
      console.error('No payment or order data found in localStorage');
      status.value = 'failed';
      return;
    }

    const paymentData = JSON.parse(paymentDataStr);
    const orderUpdateData = JSON.parse(orderUpdateStr);

    console.log('Payment data from localStorage:', paymentData);
    console.log('Order update data from localStorage:', orderUpdateData);

    const paymentUpdateRequest = {
      paymentIntentId: paymentIntent.value || '',
      paymentMethodId: "1",
      currency: paymentData.currency || 'usd',
      amount: paymentData.amount || 0,
      paymentStatus: 'completed',
      userId: Number(auth.id) || 0,
      referenceId: paymentData.referenceId || 0,
      referenceType: paymentData.referenceType || 'order',
    };

    console.log("Creating payment record:", paymentUpdateRequest, "for payment ID:", paymentData.paymentId);
    await paymentStore.updatePayment(paymentData.paymentId, paymentUpdateRequest);

    console.log("Updating order status:", orderUpdateData);
    await orderStore.editOrder(orderUpdateData.orderId, orderUpdateData.updateData);

    localStorage.removeItem('paymentOrderData');
    localStorage.removeItem('orderUpdateRequest');

    console.log('Order payment processed successfully');

  } catch (error) {
    console.error("Error during order payment processing:", error);
    status.value = 'failed';
    throw error;
  }
}

function goToProfile() {
  router.push('/profile');
}

function tryAgain() {
  localStorage.removeItem('paymentOrderData');
  localStorage.removeItem('orderUpdateRequest');

  router.push('/home');
}
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>