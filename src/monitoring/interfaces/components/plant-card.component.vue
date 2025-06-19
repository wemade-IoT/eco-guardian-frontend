<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: Number, required: true },
  state: { type: Number, required: true },
});

const emit = defineEmits({
  'edit': () => true,
  'delete': (_id: number) => true,
  'view': () => true,
});

const editPlant = () => {
  emit('edit');
}

const deletePlant = (id: number) => {
  emit('delete', id);
}


const view = () => {
  emit('view');
}
// Colores para los estados
const stateColors: Record<number, string> = {
  1: "#4CAF50", // Healthy (verde)
  2: "#FF5252", // Unhealthy (rojo)
  3: "#FFC107", // Warning (amarillo)
};

// Iconos para los estados
const statusIcons: Record<number, string> = {
  1: "✅",
  2: "❌",
  3: "⚠️",
};

const statusDescriptions: Record<number, string> = {
  1: "Healthy",
  2: "Unhealthy",
  3: "Warning",
};
</script>

<template>
  <div class="plant-card bg-white p-4 rounded-lg flex flex-col gap-3 border-l-4" :class="{
    'border-green-500': status === 1,
    'border-red-500': status === 2,
    'border-yellow-500': status === 3,
  }">
    <div class="flex items-center gap-2">
      <div class="w-[12px] h-[12px] rounded-full" :style="{ backgroundColor: stateColors[state] }"></div>
      <p class="text-[18px] font-semibold text-gray-800">{{ name }}</p>
    </div>
    <div class="flex justify-between gap-2">
      <div class="flex justify-start items-center gap-2">
        <p class="text-[14px] font-medium text-gray-600">{{ type }}</p>
        <div class="w-[6px] h-[6px] rounded-full" :style="{ backgroundColor: stateColors[state] }"></div>
        <p class="text-[14px] font-medium" :class="{
          'text-green-500': status === 1,
          'text-red-500': status === 2,
          'text-yellow-500': status === 3,
        }">
          {{ statusIcons[status] }} {{ statusDescriptions[status] }}
        </p>
      </div>
      <div class="flex justify-end gap-3">
        <button type="button" class="cursor-pointer flex items-center justify-center bg-gray-300/50 w-10 h-10 rounded-md group
      hover:bg-slate-700 transition-all duration-300 ease-in-out hover:text-white" @click="editPlant">
          <i class="pi pi-pencil"></i>
        </button>
        <button type="button" class="cursor-pointer flex items-center justify-center bg-gray-300/50 w-10 h-10 rounded-md group
      hover:bg-slate-700 transition-all duration-300 ease-in-out hover:text-white" @click="() => deletePlant(1)">
          <i class="pi pi-trash"></i>
        </button>
        <button type="button" class="cursor-pointer flex items-center justify-center bg-gray-300/50 w-10 h-10 rounded-md group
      hover:bg-slate-700 transition-all duration-300 ease-in-out hover:text-white" @click="view">
          <i class="pi pi-eye"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.plant-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.plant-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
</style>