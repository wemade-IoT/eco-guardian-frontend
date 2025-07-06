<template>
  <div class="orders-container">
    <div class="flex flex-wrap gap-6">
      <div v-for="order in orders" :key="order.id"
        class="order-card bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex-1 min-w-[300px] max-w-[400px]">
        <!-- Header -->
        <div class="card-header bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-100">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-bold text-gray-800">Order #{{ order.id }}</h3>
              <p class="text-sm text-gray-600 mt-1">{{ order.action }}</p>
            </div>
            <span :class="getStatusBadgeClass(order.stateId)" class="px-3 py-1 rounded-full text-xs font-medium">
              {{ getStatusText(order.stateId) }}
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="card-content p-4 space-y-3">
          <!-- Created Date -->
          <div class="flex items-center text-sm text-gray-600">
            <i class="pi pi-calendar mr-2 text-blue-500"></i>
            <span>Created: {{ formatDate(order.createdAt) }}</span>
          </div>

          <!-- Installation Date -->
          <div class="flex items-center text-sm text-gray-600" v-if="order.installationDate">
            <i class="pi pi-clock mr-2 text-green-500"></i>
            <span>Installation: {{ formatDate(order.installationDate) }}</span>
          </div>

          <!-- Completed Date -->
          <div class="flex items-center text-sm text-gray-600" v-if="order.completedAt">
            <i class="pi pi-check-circle mr-2 text-emerald-500"></i>
            <span>Completed: {{ formatDate(order.completedAt) }}</span>
          </div>

          <!-- Specialist Assignment -->
          <div class="flex items-center text-sm">
            <i class="pi pi-user mr-2 text-purple-500"></i>
            <span :class="order.specialistId ? 'text-green-600' : 'text-orange-600'">
              {{ order.specialistId ? 'Specialist Assigned' : 'No Specialist Yet' }}
            </span>
          </div>

          <!-- Items Count -->
          <div class="flex items-center text-sm text-gray-600">
            <i class="pi pi-box mr-2 text-indigo-500"></i>
            <span>{{ order.details.length }} item(s)</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="card-actions p-4 border-t border-gray-100 bg-gray-50">
          <div class="flex justify-between items-center">
            <button @click="viewDetails(order)"
              class="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium">
              <i class="pi pi-eye"></i>
              View Details
            </button>

            <button v-if="!order.specialistId" @click="takeOrder(order)"
              class="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium">
              <i class="pi pi-check"></i>
              Take Order
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="orders.length === 0" class="text-center py-12">
      <i class="pi pi-shopping-cart text-4xl text-gray-400 mb-4"></i>
      <h3 class="text-lg font-semibold text-gray-600 mb-2">No Orders Found</h3>
      <p class="text-gray-500">You haven't placed any orders yet.</p>
    </div>

    <!-- Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Order Details #{{ selectedOrder?.id }}</h2>
            <button @click="closeDetailsModal" class="p-2 hover:bg-gray-100 rounded-lg">
              <i class="pi pi-times text-gray-500"></i>
            </button>
          </div>

          <div class="space-y-6" v-if="selectedOrder">
            <!-- Order Info -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="font-semibold text-gray-800 mb-3">Order Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-600">Action:</span>
                  <span class="ml-2 font-medium">{{ selectedOrder.action }}</span>
                </div>
                <div>
                  <span class="text-gray-600">Status:</span>
                  <span :class="getStatusBadgeClass(selectedOrder.stateId)" class="ml-2 px-2 py-1 rounded text-xs">
                    {{ getStatusText(selectedOrder.stateId) }}
                  </span>
                </div>
                <div>
                  <span class="text-gray-600">Created:</span>
                  <span class="ml-2 font-medium">{{ formatDate(selectedOrder.createdAt) }}</span>
                </div>
                <div v-if="selectedOrder.completedAt">
                  <span class="text-gray-600">Completed:</span>
                  <span class="ml-2 font-medium">{{ formatDate(selectedOrder.completedAt) }}</span>
                </div>
              </div>
            </div>

            <!-- Order Details -->
            <div>
              <h3 class="font-semibold text-gray-800 mb-3">Items</h3>
              <div class="space-y-3">
                <div v-for="(detail, index) in selectedOrder.details" :key="index"
                  class="bg-white border border-gray-200 rounded-lg p-4">
                  <div class="flex justify-between items-start">
                    <div class="flex-1">
                      <p class="font-medium text-gray-800">{{ detail.description }}</p>
                      <p class="text-sm text-gray-600 mt-1">Device ID: {{ detail.deviceId }}</p>
                    </div>
                    <div class="text-right">
                      <p class="font-semibold text-gray-800">${{ detail.unitPrice }}</p>
                      <p class="text-sm text-gray-600">Qty: {{ detail.quantity }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Total -->
            <div class="bg-blue-50 rounded-lg p-4">
              <div class="flex justify-between items-center">
                <span class="text-lg font-semibold text-gray-800">Total Amount:</span>
                <span class="text-xl font-bold text-blue-600">${{ calculateTotal(selectedOrder.details) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

interface OrderDetail {
  deviceId: number
  quantity: number
  unitPrice: number
  description: string
}

interface Order {
  id: number
  action: string
  createdAt: string
  completedAt: string | null
  stateId: number
  consumerId: number
  specialistId: number | null
  installationDate: string | null
  details: OrderDetail[]
}

defineProps<{
  orders: Order[]
}>()

const emit = defineEmits<{
  viewDetails: [order: Order]
  takeOrder: [order: Order]
}>()

const showDetailsModal = ref(false)
const selectedOrder = ref<Order | null>(null)

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusText = (stateId: number): string => {
  switch (stateId) {
    case 1: return 'Pending'
    case 2: return 'In Progress'
    case 3: return 'Completed'
    default: return 'Unknown'
  }
}

const getStatusBadgeClass = (stateId: number): string => {
  switch (stateId) {
    case 1: return 'bg-yellow-100 text-yellow-800'
    case 2: return 'bg-blue-100 text-blue-800'
    case 3: return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const calculateTotal = (details: OrderDetail[]): number => {
  return details.reduce((total, detail) => total + (detail.quantity * detail.unitPrice), 0)
}

const viewDetails = (order: Order): void => {
  selectedOrder.value = order
  showDetailsModal.value = true
}

const closeDetailsModal = (): void => {
  showDetailsModal.value = false
  selectedOrder.value = null
}

const takeOrder = (order: Order): void => {
  emit('takeOrder', order)
}
</script>

<style scoped>
.orders-container {
  padding: 0.5rem;
}

.order-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.order-card:hover {
  transform: translateY(-2px);
}

.card-header {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

@media (max-width: 768px) {
  .orders-container {
    padding: 0.5rem;
  }

  .order-card {
    min-width: 280px;
  }
}

@media (max-width: 480px) {
  .order-card {
    min-width: 100%;
  }
}
</style>