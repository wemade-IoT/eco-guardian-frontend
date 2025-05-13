<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  state: { type: Number, required: true },
});

// Colores para los estados
const stateColors: Record<number, string> = {
  1: "#4CAF50", // Healthy (verde)
  2: "#FF5252", // Unhealthy (rojo)
  3: "#FFC107", // Warning (amarillo)
};

// Iconos para los estados
const statusIcons: Record<string, string> = {
  Healthy: "✅",
  Unhealthy: "❌",
  Warning: "⚠️",
};
</script>

<template>
  <div
    class="plant-card bg-white p-4 rounded-lg flex flex-col gap-3 border-l-4"
    :class="{
      'border-green-500': status === 'Healthy',
      'border-red-500': status === 'Unhealthy',
      'border-yellow-500': status === 'Warning',
    }"
  >
    <div class="flex items-center gap-2">
      <div
        class="w-[12px] h-[12px] rounded-full"
        :style="{ backgroundColor: stateColors[state] }"
      ></div>
      <p class="text-[18px] font-semibold text-gray-800">{{ name }}</p>
    </div>
    <div class="flex items-center gap-2">
      <p class="text-[14px] font-medium text-gray-600">{{ type }}</p>
      <div
        class="w-[6px] h-[6px] rounded-full"
        :style="{ backgroundColor: stateColors[state] }"
      ></div>
      <p
        class="text-[14px] font-medium"
        :class="{
          'text-green-500': status === 'Healthy',
          'text-red-500': status === 'Unhealthy',
          'text-yellow-500': status === 'Warning',
        }"
      >
        {{ statusIcons[status] }} {{ status }}
      </p>
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