<template>
  <div class="min-h-screen pt-5">
    <h2 class="text-xl font-semibold mb-4 text-gray-800">Your Account Details</h2>
    <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,500px)_1fr] gap-6 mx-auto">
      <!-- Profile & Subscription Column -->
      <div class="flex flex-col gap-6 w-full max-w-[500px]">
        <!-- Profile Card -->
        <div class="bg-white rounded-2xl shadow border border-gray-200 p-7 flex flex-col gap-6">
          <div class="flex items-center gap-6">
            <img src="https://avatars.githubusercontent.com/u/129230632?v=4" alt="Profile"
              class="w-24 h-24 rounded-full object-cover border-4 border-emerald-100 shadow" />
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="uppercase text-xs text-gray-400 tracking-widest">User Profile</span>
                <span
                  class="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded">Domestic</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">Sebastian Hotman</h3>
              <div class="flex flex-col gap-1.5 text-gray-700 text-sm">
                <span><span class="font-medium">Email:</span> hotman@gmail.com</span>
                <span><span class="font-medium">Country:</span> Peru</span>
                <span><span class="font-medium">Age:</span> 29</span>
                <span><span class="font-medium">User ID:</span> 1</span>
              </div>
            </div>
          </div>
          <div class="flex gap-2 mt-2">
            <button
              class="bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-emerald-800 transition">Manage
              Subscription</button>
            <button
              class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-xs font-semibold border border-gray-300 hover:bg-gray-200 transition">Edit
              Profile</button>
          </div>
        </div>
        <!-- Subscription Card -->
        <div
          class="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-2xl shadow border border-gray-200 p-7 flex flex-col gap-6">
          <div class="flex items-center gap-4 mb-2">
            <svg class="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 8c-1.657 0-3 1.343-3 3v1a3 3 0 1 0 6 0v-1c0-1.657-1.343-3-3-3z" />
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
            </svg>
            <h3 class="text-lg font-bold text-gray-800">Current Subscription</h3>
          </div>
          <div class="flex flex-col gap-2 text-gray-700 text-sm leading-relaxed">
            <div>
              <span class="font-medium">Plan:</span> Domestic Basic
            </div>
            <div>
              <span class="font-medium">Plants Allowed:</span> 2 / 4
            </div>
            <div>
              <span class="font-medium">Status:</span>
              <span
                class="inline-block ml-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-semibold text-xs">Active</span>
            </div>
            <div>
              <span class="font-medium">Ends On:</span> 9/09/2025
            </div>
            <div>
              <span class="font-medium">Automatic Renewal:</span> <span
                class="text-emerald-700 font-semibold">Yes</span>
            </div>
          </div>
          <div class="bg-white border border-amber-200 rounded-xl p-5 mt-2 flex flex-col gap-2 shadow-sm">
            <div class="flex items-center gap-2 mb-1">
              <svg class="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm0-4H9V6h2v4z" />
              </svg>
              <span class="font-bold text-amber-700">Upgrade to Domestic Pro</span>
            </div>
            <ul class="list-disc list-inside text-gray-700 text-sm mb-2 space-y-1">
              <li>All features from your current plan</li>
              <li>Up to 8 Plants</li>
              <li>5 extra tips from our specialists</li>
            </ul>
            <button
              class="bg-amber-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-amber-600 transition w-fit">Upgrade
              now</button>
          </div>
        </div>
      </div>
      <!-- Payment History Column -->
      <div class="w-full">
        <div class="bg-white rounded-2xl shadow border border-gray-200 p-7">
          <h3 class="text-xl font-bold mb-6 text-gray-800">Payment History</h3>
          <DataTable :value="payments" class="p-datatable-sm custom-datatable" :rows="5" paginator
            responsiveLayout="scroll">
            <Column field="paymentIntentId" header="PaymentIntentID" class="min-w-[120px]" />
            <Column field="paymentMethodId" header="Payment Method" :body="methodTemplate" class="min-w-[120px]" />
            <Column field="amount" header="Amount" :body="amountTemplate" class="min-w-[80px]" />
            <Column field="currency" header="Currency" class="min-w-[80px]" />
            <Column field="paymentStatus" header="Status" :body="statusTemplate" class="min-w-[100px]" />
            <Column field="referenceId" header="Reference ID" class="min-w-[100px]" />
            <Column field="referenceType" header="Type" :body="typeTemplate" class="min-w-[80px]" />
            <Column header="Actions" class="min-w-[80px] text-center">
              <template #body="{ data }">
                <button
                  class="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors duration-200 border border-blue-200 hover:border-blue-300 mx-auto"
                  title="View Details" @click="console.log('View details for:', data.paymentIntentId)">
                  <i class="pi pi-eye text-base"></i>
                </button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const payments = ref([
  {
    paymentIntentId: 'PAY-20240618-001',
    paymentMethodId: 'Credit Card',
    amount: 2500,
    currency: 'USD',
    paymentStatus: 'Succeeded',
    userId: 1,
    referenceId: 101,
    referenceType: 'Subscription'
  },
  {
    paymentIntentId: 'PAY-20240618-002',
    paymentMethodId: 'Credit Card',
    amount: 1800,
    currency: 'USD',
    paymentStatus: 'Succeeded',
    userId: 1,
    referenceId: 102,
    referenceType: 'Order'
  },
  {
    paymentIntentId: 'PAY-20240618-003',
    paymentMethodId: 'Credit Card',
    amount: 2200,
    currency: 'USD',
    paymentStatus: 'Pending',
    userId: 1,
    referenceId: 103,
    referenceType: 'Order'
  },
  {
    paymentIntentId: 'PAY-20240618-004',
    paymentMethodId: 'Credit Card',
    amount: 1500,
    currency: 'USD',
    paymentStatus: 'Failed',
    userId: 1,
    referenceId: 104,
    referenceType: 'Order'
  }
])

function amountTemplate(row) {
  return `$${(row.amount / 100).toFixed(2)}`
}

function statusTemplate(row) {
  const statusColor = {
    Succeeded: 'bg-emerald-100 text-emerald-700',
    Pending: 'bg-yellow-100 text-yellow-700',
    Failed: 'bg-red-100 text-red-700'
  }
  return h(
    'span',
    {
      class: `px-2 py-1 rounded text-xs font-semibold ${statusColor[row.paymentStatus] || 'bg-gray-100 text-gray-700'}`
    },
    row.paymentStatus
  )
}

function methodTemplate(row) {
  return h(
    'div',
    { class: 'flex items-center gap-2' },
    [
      h('i', { class: 'pi pi-credit-card text-emerald-600 text-base' }),
      h('span', {}, row.paymentMethodId)
    ]
  )
}

function typeTemplate(row) {
  return `$${(row.amount / 100).toFixed(2)}`
}

function actionTemplate(row) {
  return h(
    'div',
    { class: 'flex items-center justify-center' },
    [
      h(
        'button',
        {
          class: 'flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors duration-200 border border-blue-200 hover:border-blue-300',
          title: 'View Details',
          onClick: () => console.log('View details for:', row.paymentIntentId)
        },
        [
          // Icono SVG del ojo
          h('svg', {
            width: '16',
            height: '16',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': '2',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
          }, [
            h('path', { d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' }),
            h('circle', { cx: '12', cy: '12', r: '3' })
          ])
        ]
      )
    ]
  )
}
</script>

<style scoped>
:deep(.p-datatable) {
  font-size: 0.97rem;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background: #f9fafb;
  color: #374151;
  font-weight: 600;
  padding: 1rem 0.75rem !important;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  background: #fff;
  padding: 0.8rem 0.75rem !important;
  border-bottom: 1px solid #f3f4f6;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover > td) {
  background: #f9fafb;
}

:deep(.p-datatable .p-datatable-tbody > tr) {
  transition: background-color 0.2s ease !important;
}
</style>