<template>
  <div class="w-full h-full p-2 sm:p-4 flex items-start justify-center">
    <div class="bg-white flex rounded-2xl shadow-lg w-full overflow-hidden max-h-full">

      <!-- Kit Details Column -->
      <div class="flex-1 p-4 overflow-y-auto">
        <h2 class="text-lg font-semibold text-gray-800 mb-1">Detalle del Kit y Sensores</h2>
        <p class="text-gray-600 mb-4 text-sm">Tu kit incluye todos los sensores necesarios para un monitoreo completo.
        </p>

        <div class="space-y-2 mb-4">
          <!-- Temperature Sensor -->
          <div
            class="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-teal-400 hover:shadow-sm transition-all duration-200 group">
            <div class="flex items-center gap-2">
              <div
                class="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-200">
                  <i class="fa fa-solid fa-temperature-half"></i>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-gray-800">Sensor de Temperatura</h3>
                <p class="text-xs text-gray-600">Monitoreo continuo</p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-base font-bold text-emerald-600">$5.00</span>
              <p class="text-xs text-gray-500">Qty: 1</p>
            </div>
          </div>

          <!-- Light Sensor -->
          <div
            class="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-teal-400 hover:shadow-sm transition-all duration-200 group">
            <div class="flex items-center gap-2">
              <div
                class="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-200">
                <i class="fa fa-solid fa-lightbulb"></i>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-gray-800">Sensor de Luz</h3>
                <p class="text-xs text-gray-600">Control de iluminación</p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-base font-bold text-emerald-600">$6.00</span>
              <p class="text-xs text-gray-500">Qty: 1</p>
            </div>
          </div>

          <!-- Humidity Sensor -->
          <div
            class="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-teal-400 hover:shadow-sm transition-all duration-200 group">
            <div class="flex items-center gap-2">
              <div
                class="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-200">
               <i class="fa fa-solid fa-droplet"></i>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-gray-800">Sensor de Humedad</h3>
                <p class="text-xs text-gray-600">Calidad del aire</p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-base font-bold text-emerald-600">$5.00</span>
              <p class="text-xs text-gray-500">Qty: 1</p>
            </div>
          </div>
        </div>

        <!-- Pricing Summary -->
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex justify-between items-center mb-2 text-sm">
            <span class="text-gray-700">Subtotal</span>
            <span class="font-medium">$16.00</span>
          </div>
          <div class="flex justify-between items-center mb-3 text-sm">
            <span class="text-gray-700">Costo de instalación</span>
            <span class="font-medium">$20.00</span>
          </div>
          <div
            class="flex justify-between items-center text-base font-bold text-emerald-600 pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>$36.00</span>
          </div>
        </div>
      </div>

      <!-- Payment Details Column -->
      <div class="flex-1 p-4 overflow-y-auto border-l border-gray-200">
        <div class="flex items-center gap-2 mb-4">
          <h2 class="text-lg font-semibold text-gray-800">Detalles de Facturación</h2>
          <div class="text-gray-500 cursor-help">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </div>
        </div>

        <div class="space-y-4 mb-4">
          <!-- Email -->
          <div class="space-y-1">
            <label for="email" class="block text-sm font-semibold text-gray-700">
              Email <span class="text-red-500">*</span>
            </label>
            <input type="email" id="email" v-model="email" placeholder="tu@email.com"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all duration-200"
              :class="{ 'border-red-400 focus:border-red-400 focus:ring-red-100': errors.email }" />
            <span v-if="errors.email" class="text-red-500 text-xs block">{{ errors.email }}</span>
          </div>

          <!-- Country -->
          <div class="space-y-1">
            <label for="country" class="block text-sm font-semibold text-gray-700">
              País <span class="text-red-500">*</span>
            </label>
            <select id="country" v-model="country"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all duration-200 bg-white"
              :class="{ 'border-red-400 focus:border-red-400 focus:ring-red-100': errors.country }">
              <option value="">Selecciona tu país</option>
              <option value="PE">Perú</option>
              <option value="CO">Colombia</option>
              <option value="MX">México</option>
              <option value="AR">Argentina</option>
              <option value="CL">Chile</option>
            </select>
            <span v-if="errors.country" class="text-red-500 text-xs block">{{ errors.country }}</span>
          </div>

          <!-- Discount Code -->
          <div class="space-y-1">
            <label for="discount" class="block text-sm font-semibold text-gray-700">
              Código de Descuento <span class="text-gray-500 font-normal">(Opcional)</span>
            </label>
            <div class="flex gap-2">
              <input type="text" id="discount" placeholder="ECOGUAR2025"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all duration-200" />
              <button type="button"
                class="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors duration-200">
                Aplicar
              </button>
            </div>
          </div>
        </div>

        <!-- Payment will be handled via dialog -->
        <div class="mb-4">
          <p class="text-sm text-gray-600 text-center">
            Los datos de pago se ingresarán en la siguiente pantalla
          </p>
        </div>

        <!-- VAT Notice -->
        <div class="flex items-start gap-2 p-3 bg-blue-50 rounded-lg mb-4">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"
            class="text-blue-500 mt-0.5 flex-shrink-0">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <p class="text-xs text-gray-700 leading-4">
            Los precios no incluyen IVA, que se determinará según el país de facturación.
          </p>
        </div>

        <!-- Secure Payment -->
        <div class="flex items-center gap-2 p-3 bg-green-50 rounded-lg mb-4">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="text-green-600 flex-shrink-0">
            <path
              d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
          <span class="text-xs text-gray-700">Pagos seguros procesados por Stripe.</span>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 pt-4 border-t border-gray-200">
          <button type="button"
            class="flex-1 px-4 py-3 bg-white text-gray-600 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm">
            Cancelar
          </button>
          <button type="button" @click="handleSubmit" :disabled="isLoading"
            class="flex-1 px-4 py-3 bg-gradient-to-r from-teal-400 to-emerald-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            {{ isLoading ? 'Procesando...' : 'Confirmar Pedido' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
// Unused imports removed
import { useAuthStore } from '../../../iam/interfaces/store/auth-store';
import { usePaymentStore } from '../../../payment/interfaces/store/payment-store';
// PaymentAssembler removed - not needed for dialog approach
// ProfileStore import removed - not needed
// Stripe Elements removed - using PaymentCardForm dialog instead
import { convertAmountByCountry, getCurrencyByCountry } from '../../../public/utils/helpers/currency';
import type { CountryName } from '../../../public/utils/interfaces/country';
import PaymentCardFormComponent from '../../../payment/interfaces/components/payment-card-form.component.vue';
import { useDialog } from 'primevue';
import { PaymentAssembler } from '../../../payment/domain/assembler/payment-assembler';
import { usePlantStore } from '../../../monitoring/interfaces/stores/plant-store';
import { DeviceService } from '../../../inventory/infrastructure/services/device.service';
// Currency utilities removed - no longer needed
// Types
interface ValidationErrors {
  email?: string
  country?: string
}

// Reactive data
const email = ref<string>('')
const country = ref<string>('')
const isLoading = ref<boolean>(false)
const errors = reactive<ValidationErrors>({})

const authStore = useAuthStore();
const paymentStore = usePaymentStore();
const dialog = useDialog();

// Stripe initialization removed - using PaymentCardForm dialog instead

// Payment intent creation moved to handleSubmit function

async function handleSubmit() {
  isLoading.value = true;

  try {
    // Clear previous errors
    errors.email = '';
    errors.country = '';

    // Validate email and country
    if (!email.value.trim()) {
      errors.email = 'El email es requerido';
      isLoading.value = false;
      return;
    }
    if (!country.value) {
      errors.country = 'Por favor selecciona un país';
      isLoading.value = false;
      return;
    }

    // Map country code to CountryName
    const countryNameMap: Record<string, CountryName> = {
      'PE': 'Peru',
      'CO': 'Peru', // Using Peru as fallback for Colombia
      'MX': 'United States', // Using US as fallback for Mexico
      'AR': 'Peru', // Using Peru as fallback for Argentina
      'CL': 'Peru', // Using Peru as fallback for Chile
      'US': 'United States',
      'ES': 'Spain',
      'DE': 'Germany',
    };

    const countryName = countryNameMap[country.value] || 'Peru';

    // Calculate amount based on country (convert if needed)
    const orderAmount = 36; // Fixed order amount
    const convertedAmount = await convertAmountByCountry(orderAmount, countryName);

    console.log('Converted Amount:', convertedAmount);

    // Create payment intent
    const response = await paymentStore.createPaymentIntent({
      amount: convertedAmount,
      currency: getCurrencyByCountry(countryName),
      paymentMethodId: '',
    });

    const clientSecret = response?.clientSecret || '';

    // Set payment financial data
    paymentStore.setPaymentFinancialData(convertedAmount, getCurrencyByCountry(countryName));
    console.log('Payment Process so Far:', paymentStore.getPaymentRequest);

    // we create the device and payment
    const paymentAssembler = new PaymentAssembler();

    const paymentData={
      paymentIntentId: response?.paymentIntentId || '',
      paymentMethodId: response?.paymentMethodId || '',
      amount: convertedAmount,
      currency: getCurrencyByCountry(countryName),
      paymentStatus: response?.paymentStatus || 'completed',
      userId: authStore.id || '',
      referenceId: 0, 
    }

    const paymentResponse = await paymentAssembler.toRequest(paymentData);

    console.log('Payment Response:', paymentResponse);
    paymentStore.createPayment(paymentResponse);

    //We create the device too

    //Esta logica de device deberia ir cuando se escoge la fecha


    const deviceData = {
      type: 'EcoGuardianKIT',
      voltage: 5,
      plantId: usePlantStore().getSelectedPlantId, // Assuming selectPlant is the ID of the plant
    };

    //Here the device is created
    const deviceService = new DeviceService();
    const deviceResponse = await deviceService.createDevice(deviceData);
    console.log('Device Response:', deviceResponse);



    // Open payment dialog
    dialog.open(PaymentCardFormComponent, {
      props: {
        modal: true,
        style: { width: "500px" },
        closable: false,
      },
      data: {
        firstName: authStore.userData?.name || 'GUEST',
        lastName: '',
        userEmail: email.value,
        userPassword: '',
        email: email.value,
        country: countryName,
        discountCode: '',
        clientSecret: clientSecret,
        amount: convertedAmount,
        currency: getCurrencyByCountry(countryName),
        countryName: countryName,
        referenceId: 2, // Order reference ID (different from subscription)
      }
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
  } finally {
    isLoading.value = false;
  }
}
</script>

