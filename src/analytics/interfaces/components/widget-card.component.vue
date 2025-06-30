<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  value: { type: String, required: true },
  description: { type: String, required: true },
});
</script>

<template>
  <div v-tooltip.bottom="description" class="widget-card bg-gray-100 border-[#A4D39A] rounded p-3 flex flex-col">
    
    <h3 class="text-[12px] font-semibold text-gray-700"><span> <i :class="icon" class="text-[12px] text-gray-500 mr-1"></i> </span>{{ title }}</h3>
    <p class="text-[32px] text-gray-800 font-bold">{{ value }}</p>
    <p class="text-[13px] text-gray-500">{{ description }}</p>
  </div>
</template>

<style scoped>

.widget-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 30%;
  height: 22vh;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  user-select: none;
}

.widget-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  background-color: #f8f9fa;
  transform: translateY(-1px);
}

.custom-tooltip {
  background-color: #f8f9fa;
  color: #333;
  padding: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}



@media (max-width: 1024px) {
  
  .widget-card {
    width: 10rem;
    height: 10rem;
    min-height: 120px;
  }
}

</style>