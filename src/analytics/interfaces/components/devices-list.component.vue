<template>
  <section class="relative p-4 w-full bg-gray-100 h-full flex flex-col">
    <div class="flex flex-col">
      <h2 class="text-xl font-bold">Devices</h2>
      <p class="mt-4 text-slate-500 font-medium">N° sensors: <span class="text-slate-900">{{ devices.length }}</span>
      </p>
    </div>
    <button
      class="cursor-pointer absolute top-0 right-0 flex flex-row items-center gap-2 bg-white h-12 w-12 rounded-md overflow-hidden px-4">
      <i class="pi pi-arrow-down text-2xl rotate-235 text-slate-700"></i>
    </button>
    <div class="h-full flex-1 pb-4">
      <ul class="device-container mt-4 flex flex-col gap-3 overflow-y-auto min-h-full max-h-0">
        <li v-for="device in devices" :key="device.id" class="flex flex-col px-3 py-4 bg-white rounded-lg">
          <div class="flex flex-row items-center gap-2">
            <div class="w-4 h-4 rounded-full" :class="{
              'bg-green-500': device.status === DEVICE_STATE.ACTIVE,
              'bg-yellow-500': device.status === DEVICE_STATE.LOST_SIGNAL,
              'bg-red-500': device.status === DEVICE_STATE.INACTIVE,
            }"></div>
            <span :class="{
              'text-green-500': device.status === DEVICE_STATE.ACTIVE,
              'text-yellow-500': device.status === DEVICE_STATE.LOST_SIGNAL,
              'text-red-500': device.status === DEVICE_STATE.INACTIVE,
            }" class="font-medium text-sm font-sans">
              {{ device.status }}
            </span>
          </div>
          <div class="mt-2 flex flex-col gap-1">
            <h3 class="text-lg font-bold">{{ device.name }}</h3>
            <div class="flex flex-row items-center gap-2">
              <p class="text-sm text-slate-500">
                Power capacity: <span class="text-slate-900">{{ device.powerCapacity }}</span>
              </p>
              <span>-</span>
              <p class="text-sm text-slate-500">
                Voltage: <span class="text-slate-900">{{ device.voltage }}</span>
              </p>
            </div>
            <p class="mt-2 text-sm text-slate-500">
              Last updated: <span class="text-slate-900">{{ device.lastUpdated }}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {DEVICE_STATE} from "@/public/utils/types/devices.ts";


const devices = ref<any[]>([]);

onMounted(async () => {
  try {
    //devices.value = data;
  } catch (error) {
    console.error('Error fetching devices:', error);
  }
});
</script>


<style scoped>
.device-container::-webkit-scrollbar {
  width: 6px;
}

.device-container::-webkit-scrollbar-thumb {
  background-color: #b2bbc5;
  border-radius: 4px;
}

.device-container::-webkit-scrollbar-thumb:hover {
  background-color: #718096;
}

.device-container::-webkit-scrollbar-track {
  background-color: #edf2f7;
}
</style>