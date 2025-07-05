<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
      
      <div class="mb-6">
        <div v-if="status === 'succeeded'" class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <div v-else-if="status === 'processing'" class="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
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
          ¡Pago realizado con éxito!
        </h1>
        <h1 v-else-if="status === 'processing'" class="text-2xl font-bold text-gray-900 mb-2">
          Pago en proceso
        </h1>
        <h1 v-else class="text-2xl font-bold text-gray-900 mb-2">
          Hubo un problema con tu pago
        </h1>

        <p v-if="status === 'succeeded'" class="text-gray-600">
          Tu compra se ha procesado correctamente. Recibirás un email de confirmación en breve.
        </p>
        <p v-else-if="status === 'processing'" class="text-gray-600">
          Tu pago está siendo procesado. Te notificaremos cuando se complete.
        </p>
        <p v-else class="text-gray-600">
          No se pudo procesar tu pago. Por favor, intenta nuevamente o contacta a soporte.
        </p>
      </div>

      <div v-if="paymentIntent" class="mb-6 p-4 bg-gray-50 rounded-lg">
        <p class="text-sm text-gray-600">
          <span class="font-medium">ID de transacción:</span><br>
          <span class="font-mono text-xs">{{ paymentIntent }}</span>
        </p>
      </div>

      <div class="space-y-3">
        <button 
          @click="goToLogin"
          class="w-full bg-[#578257] hover:bg-[#467046] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Continuar
        </button>
        
        <button 
          v-if="status !== 'succeeded'"
          @click="tryAgain"
          class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Intentar nuevamente
        </button>
      </div>

      <div class="mt-6 pt-4 border-t border-gray-200">
        <p class="text-xs text-gray-500">
          ¿Necesitas ayuda? 
          <a href="mailto:support@tusitio.com" class="text-[#578257] hover:underline">
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
import { usePaymentStore } from '../store/payment-store';
import { useSubscriptionStore } from '../store/subscription-store';
import { SubscriptionAssembler } from '../../domain/assembler/subscription-assembler';
import { PaymentAssembler } from '../../domain/assembler/payment-assembler';
import { ProfileStore } from '../../../profile/interfaces/store/profile-store';
import { useAuthStore } from '../../../iam/interfaces/store/auth-store';
const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const status = ref('');
const paymentIntent = ref('');
const paymentStore = usePaymentStore();
const subscriptionStore = useSubscriptionStore();
const subscriptionAssembler = new SubscriptionAssembler();
const paymentAssembler = new PaymentAssembler();
const profileStore = ProfileStore();
console.log('userData after payment', auth.userData);

onMounted(() => {
  status.value = route.query.redirect_status as string || '';
  paymentIntent.value = route.query.payment_intent as string || '';
  
  if (status.value === 'succeeded') {
    registerUser();
  }
});

async function registerUser() {
  try {
    console.log('Starting user registration process...');
    
    // Leer datos de localStorage
    const paymentDataStr = localStorage.getItem('paymentData') || localStorage.getItem('registerInfo');
    if (!paymentDataStr) {
      console.error('No payment data found in localStorage');
      status.value = 'failed';
      return;
    }
    
    const paymentData = JSON.parse(paymentDataStr);
    console.log('Payment data from localStorage:', paymentData);
    
    //1. We register the user since the payment supposedly has been successful we register all
    const user = await auth.register({
      email: paymentData.userEmail || paymentData.email || '',
      password: paymentData.userPassword || '',
      roleId: paymentData.planSelected || 1, // Default to roleId 1 if not provided
    });
    console.log('User registered successfully:', user);

  // ==================
  // 2. We register the subscription
  const subscriptionRequest = subscriptionAssembler.toRequest({
    userId: user.userId,
    subscriptionTypeId: paymentData.planSelected,
    subscriptionStateId: 1, //The payment was done successfully so we set it to active
    currency: paymentData.currency || 'usd',
    amount: paymentData.amount || 0,
  });
  const subscription = await subscriptionStore.createSubscription(subscriptionRequest);
  console.log("Subscription created successfully:", subscription);
  // ==================

  // 3. We create the payment to be stored in the database
  const paymentRequest = paymentAssembler.toRequest({
    paymentIntentId: paymentIntent.value || '',
    paymentMethodId: "1",
    currency: paymentData.currency || 'usd',
    amount: paymentData.amount || 0,
    paymentStatus: 'completed', // Cambiado a completed ya que el pago fue validado
    userId: user.userId || 0,
    referenceId: 1, // We know its a subscription
  });
  console.log("Creating payment record:", paymentRequest);
  await paymentStore.createPayment(paymentRequest);

  // 4. We create the profile for the user
   //==============
  //Profile Logic must be moved to a separate component or service
  const profileToLoad = {
    Name: paymentData.firstName || '',
    UserId: user.userId || 0, //This user Id must be retrieved from the authStore after registration 
    // This could have been done in the backend but we are doing it here for simplicity, IAM moment)
    LastName: paymentData.lastName || '',
    Email: paymentData.userEmail || paymentData.email || '',
    Address: paymentData.country || 'please add your address for installations',
    AvatarUrl: null, // Initialize with null
    SubscriptionId: paymentData.planSelected
  };
  await profileStore.createProfile(profileToLoad)

  console.log("Profile created successfully", profileToLoad);

  localStorage.removeItem('paymentData');
  console.log('localStorage cleaned after successful registration');

  //==============
  } catch (error) {
    console.error("Error during registration process:", error);
    status.value = 'failed'; // Actualizar el estado visual
    // No limpiar localStorage si hay error, para debugging
    throw error;
  }
}



function goToLogin() {
  //Ys se autentica en el proceso de creacion de cuenta y perfil
  //así que no es necesario redirigir a login, sino a home, en casi falle deberia redirigir a la pagina de elegir plan
  router.push('/home');
}

function tryAgain() {
  //Si falla se quita el token de autenticacion y se redirige a login, 
  //[IMPORTANTE] el Backend NO deberia persistir el pago, ni el usuario , ni el perfil si es que encontro un error en este proceso
  
  // Limpiar localStorage en caso de error
  localStorage.removeItem('paymentData');
  localStorage.removeItem('registerInfo');
  
  useAuthStore().logout();
}
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>