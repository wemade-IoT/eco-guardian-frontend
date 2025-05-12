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
  <div class="widget-card bg-white border border-[#A4D39A] rounded p-4 w-[185px] h-[205px] flex flex-col">
    <i :class="icon" class="text-[16px] mb-2"></i>
    <h3 class="text-[16px] font-semibold mb-1">{{ title }}</h3>
    <p class="text-[36px] font-normal mb-1">{{ value }}</p>
    <p class="text-[12px] text-[#757575]">{{ description }}</p>
  </div>
</template>

<style scoped>
.widget-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>