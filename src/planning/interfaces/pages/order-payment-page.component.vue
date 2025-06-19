<template>
  <div class="min-h-screen p-4 sm:p-8 flex items-center justify-center">
    <div class="bg-white rounded-3xl shadow-xl max-w-4xl w-full overflow-hidden">

      <!-- Kit Details -->
      <div class="p-6 sm:p-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">Detalle del Kit y Sensores</h2>
        <p class="text-gray-600 mb-8 text-sm sm:text-base">Tu kit incluye todos los sensores necesarios para un
          monitoreo completo.</p>

        <div class="space-y-4 mb-8">
          <!-- Temperature Sensor -->
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-2 border-gray-100 rounded-xl hover:border-teal-400 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
            <div class="flex items-center gap-4 mb-4 sm:mb-0">
              <div
                class="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M15 13V5a3 3 0 0 0-6 0v8a5 5 0 1 0 6 0zM12 4a1 1 0 0 1 1 1v8.26a3 3 0 1 1-2 0V5a1 1 0 0 1 1-1z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">Sensor de Temperatura</h3>
                <p class="text-sm text-gray-600">Monitoreo continuo de temperatura ambiente</p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-xl font-bold text-emerald-600 block">$150.00</span>
              <span class="text-sm text-gray-500">Qty: 1</span>
            </div>
          </div>

          <!-- Light Sensor -->
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-2 border-gray-100 rounded-xl hover:border-teal-400 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
            <div class="flex items-center gap-4 mb-4 sm:mb-0">
              <div
                class="w-12 h-12 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">Sensor de Luz</h3>
                <p class="text-sm text-gray-600">Medición de luminosidad y control de iluminación</p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-xl font-bold text-emerald-600 block">$180.00</span>
              <span class="text-sm text-gray-500">Qty: 1</span>
            </div>
          </div>

          <!-- Humidity Sensor -->
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-2 border-gray-100 rounded-xl hover:border-teal-400 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
            <div class="flex items-center gap-4 mb-4 sm:mb-0">
              <div
                class="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 2c1.1 0 2 .9 2 2v8a6 6 0 1 1-4-5.66V4c0-1.1.9-2 2-2zm0 2v6.42a4 4 0 0 0-2 7.58 4 4 0 0 0 4 0 4 4 0 0 0-2-7.58V4zm0 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">Sensor de Humedad</h3>
                <p class="text-sm text-gray-600">Control de humedad relativa y calidad del aire</p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-xl font-bold text-emerald-600 block">$220.00</span>
              <span class="text-sm text-gray-500">Qty: 1</span>
            </div>
          </div>
        </div>

        <!-- Pricing Summary -->
        <div class="bg-gray-50 rounded-xl p-6 mb-8">
          <div class="flex justify-between items-center mb-3 text-sm sm:text-base">
            <span class="text-gray-700">Subtotal</span>
            <span class="font-medium">$550.00</span>
          </div>
          <div class="flex justify-between items-center mb-4 text-sm sm:text-base">
            <span class="text-gray-700">Costo de instalación</span>
            <span class="font-medium">$100.00</span>
          </div>
          <div
            class="flex justify-between items-center text-lg sm:text-xl font-bold text-emerald-600 pt-3 border-t-2 border-gray-200">
            <span>Total</span>
            <span>$650.00</span>
          </div>
        </div>
      </div>

      <!-- Billing Details -->
      <div class="px-6 sm:px-8 pb-6">
        <div class="flex items-center gap-2 mb-6">
          <h2 class="text-2xl font-semibold text-gray-800">Detalles de Facturación</h2>
          <div class="text-gray-500 cursor-help">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <!-- Email -->
          <div class="space-y-2">
            <label for="email" class="block text-sm font-semibold text-gray-700">
              Email <span class="text-red-500">*</span>
            </label>
            <input type="email" id="email" v-model="email" placeholder="tu@email.com"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all duration-200"
              :class="{ 'border-red-400 focus:border-red-400 focus:ring-red-100': errors.email }" />
            <span v-if="errors.email" class="text-red-500 text-xs block">{{ errors.email }}</span>
          </div>

          <!-- Country -->
          <div class="space-y-2">
            <label for="country" class="block text-sm font-semibold text-gray-700">
              País <span class="text-red-500">*</span>
            </label>
            <select id="country" v-model="country"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all duration-200 bg-white"
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
          <div class="sm:col-span-2 space-y-2">
            <label for="discount" class="block text-sm font-semibold text-gray-700">
              Código de Descuento <span class="text-gray-500 font-normal">(Opcional)</span>
            </label>
            <div class="flex gap-2">
              <input type="text" id="discount" placeholder="ECOGUAR2025"
                class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all duration-200" />
              <button type="button"
                class="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors duration-200">
                Aplicar
              </button>
            </div>
          </div>
        </div>

        <!-- VAT Notice -->
        <div class="flex items-start gap-3 p-4 bg-blue-50 rounded-lg mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
            class="text-blue-500 mt-0.5 flex-shrink-0">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <p class="text-xs sm:text-sm text-gray-700 leading-5">
            Los precios no incluyen IVA, que se determinará según el país de facturación. El precio final se puede ver
            en la página de compra, antes de completar el pago.
          </p>
        </div>

        <!-- Secure Payment -->
        <div class="flex items-center gap-3 p-4 bg-green-50 rounded-lg mb-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="text-green-600 flex-shrink-0">
            <path
              d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
          <span class="text-xs sm:text-sm text-gray-700">Pagos seguros procesados por Stripe.</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 p-6 sm:p-8 bg-gray-50 border-t border-gray-200">
        <button type="button"
          class="flex-1 px-6 py-4 bg-white text-gray-600 font-semibold rounded-xl border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-sm sm:text-base">
          Cancelar
        </button>
        <button type="button" @click="handleSubmit" :disabled="isLoading"
          class="flex-1 px-6 py-4 bg-gradient-to-r from-teal-400 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          {{ isLoading ? 'Procesando...' : 'Confirmar Pedido' }}
        </button>
      </div>
    </div>
  </div>
  <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
    <ProgressSpinner style="width: 50px; height: 50px; color: #578257;" strokeWidth="5" fill="transparent"
      animationDuration=".5s" aria-label="Custom ProgressSpinner" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
import { simulateRequest } from '../../../public/utils/helpers/sleep'
import { createModal } from '../../../public/utils/helpers/create-modal'
import CustomDialog from '../../../shared/components/ui/custom-dialog.component.vue';
import { useDialog } from 'primevue';

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
const dialog = useDialog();

// Validation functions
const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return 'El email es requerido'
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'Por favor ingresa un email válido'
  }

  return null
}

const validateCountry = (country: string): string | null => {
  if (!country.trim()) {
    return 'Por favor selecciona un país'
  }

  return null
}

const validateForm = (): boolean => {
  Object.keys(errors).forEach(key => {
    delete errors[key as keyof ValidationErrors]
  })

  const emailError = validateEmail(email.value)
  if (emailError) {
    errors.email = emailError
  }

  const countryError = validateCountry(country.value)
  if (countryError) {
    errors.country = countryError
  }

  return Object.keys(errors).length === 0
}

const handleSubmit = async (): Promise<void> => {
  try {
    isLoading.value = true
    await simulateRequest(2000)

    createModal(
      dialog,
      CustomDialog,
      {
        title: '¡Pago realizado correctamente!',
        subtitle: 'Tu pedido ha sido procesado con éxito. Puedes revisar los detalles y el estado de tu nuevo pedido en el panel de administración. ¡Gracias por confiar en Eco Guardian!',
        type: 'success',
        severity: 'success',
        redirectionPath: '/home'
      }
    );
  } catch (error) {
    console.error('Error en la simulación:', error)
  } finally {
    isLoading.value = false
  }
}
</script>