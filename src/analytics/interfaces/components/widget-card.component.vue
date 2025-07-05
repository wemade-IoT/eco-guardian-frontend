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
  <div v-tooltip.bottom="description" class="widget-card bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between h-full">
    
    <h3 class="text-sm w-full flex justify-between font-semibold text-gray-700 mb-2">
      {{ title }} 
      <span> 
        <i :class="icon" class="text-lg text-gray-500"></i> 
      </span>
    </h3>
    <p class="text-2xl text-gray-800 font-bold mb-1">{{ value }}</p>
    <p class="text-xs text-gray-500 leading-tight desc-text">{{ description }}</p>
  </div>
</template>

<style scoped>

.widget-card {
  display: flex;
  flex-direction: column;
  min-height: 30%;
  max-height: 40%;
  max-width: 30%;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  user-select: none;
}

.widget-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.custom-tooltip {
  background-color: #f8f9fa;
  color: #333;
  padding: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Responsive design */
@media (max-width: 1024px) {
  .widget-card {
    min-height: 100px;
    max-height: 120px;
  }
  .desc-text {
    display: none; /* Hide description text on smaller screens */
  } 
}

@media (max-width: 640px) {
  .widget-card {
    max-width: 45%;
    font-size: 0.9rem;
  }
  .desc-text {
    display: none; /* Hide description text on smaller screens */
  } 
}


</style>