<template>
  <div class="responsive-table-wrapper hidden sm:block">
    <DataTable :value="payments" class="p-datatable-sm custom-datatable min-w-[600px]" :rows="5" paginator
      responsiveLayout="scroll">
      <Column field="paymentMethodId" header="Payment Method" class="min-w-[120px]">
        <template #body="{ data }">
          {{ getPaymentMethodText(data.paymentMethodId) }}
        </template>
      </Column>
      <Column field="amount" header="Amount" class="min-w-[80px]">
        <template #body="{ data }">
          {{ (data.amount).toFixed(2) }}
        </template>
      </Column>
      <Column field="currency" header="Currency" class="min-w-[80px]">
        <template #body="{ data }">
          {{ data.currency.toUpperCase() }}
        </template>
      </Column>
      <Column field="paymentStatus" header="Status" class="min-w-[100px]">
        <template #body="{ data }">
          <span :class="getStatusClass(data.paymentStatus)" class="px-2 py-1 rounded-full text-xs font-medium">
            {{ data.paymentStatus }}
          </span>
        </template>
      </Column>
      <Column field="referenceType" header="Type" class="min-w-[80px] first-letter:uppercase" />
      <Column field="createdAt" header="Created At" class="min-w-[120px]">
        <template #body="{ data }">
          {{ formatDate(data.createdAt) }}
        </template>
      </Column>
      <Column header="Actions" class="min-w-[120px] text-center">
        <template #body="{ data }">
          <div class="flex items-center justify-center gap-2">
            <button
              class="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors duration-200 border border-blue-200 hover:border-blue-300"
              title="View Details" @click="viewDetails(data)">
              <i class="pi pi-eye text-base"></i>
            </button>
            <button v-if="data.paymentStatus.toLowerCase() === 'pending'"
              class="flex items-center justify-center w-8 h-8 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition-colors duration-200 border border-green-200 hover:border-green-300"
              title="Make Payment" @click="makePayment(data)">
              <i class="pi pi-credit-card text-base"></i>
            </button>
            <button v-else-if="data.paymentStatus.toLowerCase() === 'completed'"
              class="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed"
              title="Payment already completed" disabled>
              <i class="pi pi-credit-card text-base"></i>
            </button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useAuthStore } from '../../../iam/interfaces/store/auth-store'
import { useDialog } from 'primevue'
import PaymentCardFormComponent from '../../../payment/interfaces/components/payment-card-form.component.vue'
import { usePaymentStore } from '../../../payment/interfaces/store/payment-store'
import { OrderAssembler } from '../../../planning/domain/order-assembler'

interface Payment {
  id: number
  amount: number
  currency: string
  paymentIntentId: string
  paymentMethodId: string
  paymentStatus: string
  userId: number
  referenceId: number
  referenceType: string
  createdAt: string
  updatedAt: string
}

defineProps<{
  payments: Payment[]
}>()

const emit = defineEmits<{
  viewDetails: [payment: Payment]
}>()

const dialog = useDialog()
const authStore = useAuthStore()
const paymentStore = usePaymentStore()
const orderAssembler = new OrderAssembler()

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getPaymentMethodText = (paymentMethodId: string): string => {
  return paymentMethodId === '1' ? 'Credit Card' : paymentMethodId || 'N/A'
}

const getStatusClass = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'failed':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getCurrencyByCountry = (country: string): string => {
  const currencyMap: { [key: string]: string } = {
    'Peru': 'PEN',
    'United States': 'USD',
    'Colombia': 'COP',
    'Mexico': 'MXN',
    // Add more country-currency mappings as needed
  }
  return currencyMap[country] || 'USD'
}

const viewDetails = (payment: Payment): void => {
  
  emit('viewDetails', payment)
}

const makePayment = async (payment: Payment): Promise<void> => {

  console.log('Initiating payment for:', payment)

  // Create payment intent
  const response = await paymentStore.createPaymentIntent({
    amount: payment.amount,
    currency: 'usd',
    paymentMethodId: '1',
  });

  const clientSecret = response?.clientSecret || '';

  localStorage.setItem('paymentOrderData', JSON.stringify({
      paymentId: payment.id,
      userEmail: authStore.userData?.email || '',
      userPassword: '',
      firstName: authStore.userData?.name || 'GUEST',
      lastName: '',
      country: 'United States',
      amount: payment.amount,
      currency: 'usd',
      referenceId: payment.referenceId || 0, // ID de la orden
      referenceType: 'order',
    }));;

    const orderUpdateRequest = orderAssembler.toUpdateRequest({
      action: "Order Completed",
      stateId: 3, // este es el estado de orden completada :v
      consumerId: Number(authStore.id) || 0,
      specialistId: 0
    });

    console.log('Order Request:', orderUpdateRequest);

    // Guardar en localStorage en lugar de actualizar inmediatamente
    localStorage.setItem('orderUpdateRequest', JSON.stringify({
      orderId: payment.referenceId || 0,
      updateData: orderUpdateRequest
    }));

  try {

    dialog.open(PaymentCardFormComponent, {
      props: {
        modal: true,
        style: { width: "500px" },
        closable: false,
      },
      data: {
        firstName: authStore.userData?.name || 'GUEST',
        lastName: '',
        userEmail: authStore.userData?.email || '',
        userPassword: '',
        email: authStore.userData?.email || '',
        country: 'United States', // Default country, can be changed based on user profile
        discountCode: '',
        clientSecret: clientSecret,
        amount: payment.amount,
        currency: 'usd', // Default currency, can be changed based on user profile
        countryName: 'United States',
        referenceId: payment.referenceId,
        referenceType: payment.referenceType,
      }
    })
  } catch (error) {
    console.error('Error opening payment dialog:', error)
  }
}
</script>

<style scoped>
.custom-datatable {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.custom-datatable :deep(.p-datatable-header) {
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.custom-datatable :deep(.p-datatable-thead > tr > th) {
  background-color: #f9fafb;
  color: #374151;
  font-weight: 500;
  font-size: 0.875rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.custom-datatable :deep(.p-datatable-tbody > tr > td) {
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #111827;
  border-bottom: 1px solid #f3f4f6;
}

.custom-datatable :deep(.p-datatable-tbody > tr:hover) {
  background-color: #f9fafb;
}

.custom-datatable :deep(.p-paginator) {
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
  padding: 0.75rem 1rem;
}
</style>