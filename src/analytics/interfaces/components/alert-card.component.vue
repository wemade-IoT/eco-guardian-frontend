<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
});

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }
  return date.toLocaleString();
};
</script>

<template>
  <div class="alert-card bg-white rounded p-4 flex flex-col">
    <h3 class="text-[16px] font-semibold mb-2">{{ title }}</h3>
    <p class="text-[12px] font-normal mb-2">{{ content }}</p>
    <p class="text-[12px] text-[#757575]">At {{ formatDate(date) }}</p>
  </div>
</template>

<style scoped>
</style>
