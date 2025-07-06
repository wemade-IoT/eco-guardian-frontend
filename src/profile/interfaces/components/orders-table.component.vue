<template>
  <div>
    <div class="responsive-table-wrapper hidden sm:block">
      <DataTable :value="orders" class="p-datatable-sm custom-datatable min-w-[600px]" :rows="5" paginator
        responsiveLayout="scroll">
        <Column field="action" header="Action" class="min-w-[120px]" />
        <Column field="completedAt" header="Completed At" class="min-w-[120px]">
          <template #body="{ data }">
            {{ data.completedAt ? formatDate(data.completedAt) : 'N/A' }}
          </template>
        </Column>
        <Column field="stateId" header="State ID" class="min-w-[100px]">
          <template #body="{ data }">
            <span :class="getStateClass(data.stateId)" class="px-2 py-1 rounded-full text-xs font-medium">
              {{ getStateText(data.stateId) }}
            </span>
          </template>
        </Column>
        <Column field="assigned" header="Assigned" class="min-w-[100px]">
          <template #body="{ data }">
            <span :class="getAssignedClass(data.specialistId)" class="px-2 py-1 rounded-full text-xs font-medium">
              {{ data.specialistId ? 'Yes' : 'No' }}
            </span>
          </template>
        </Column>
        <Column field="installationDate" header="Installation Date" class="min-w-[140px]">
          <template #body="{ data }">
            {{ formatDate(data.installationDate) }}
          </template>
        </Column>
        <Column header="Actions" class="min-w-[80px] text-center">
          <template #body="{ data }">
            <button
              class="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors duration-200 border border-blue-200 hover:border-blue-300 mx-auto"
              title="View Details" @click="viewDetails(data)">
              <i class="pi pi-eye text-base"></i>
            </button>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

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
  installationDate: string
  details: OrderDetail[]
}

defineProps<{
  orders: Order[]
}>()

const emit = defineEmits<{
  viewDetails: [order: Order]
}>()

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStateClass = (stateId: number): string => {
  switch (stateId) {
    case 1:
      return 'bg-yellow-100 text-yellow-800'
    case 2:
      return 'bg-blue-100 text-blue-800'
    case 3:
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStateText = (stateId: number): string => {
  switch (stateId) {
    case 1:
      return 'Pending'
    case 2:
      return 'In Progress'
    case 3:
      return 'Completed'
    default:
      return 'Unknown'
  }
}

const getAssignedClass = (specialistId: number | null): string => {
  return specialistId ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
}

const viewDetails = (order: Order): void => {
  emit('viewDetails', order)
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