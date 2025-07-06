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
    <h3 class="text-[16px] font-semibold ">{{ title }}</h3>
    <p class="text-[12px] font-normal ">{{ content }}</p>
    <p class="text-[12px] text-[#757575]">At {{ formatDate(date) }}</p>
  </div>
</template>

<style>

.alert-card:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    background-color: #f8f9fa;
    transform: translateY(-1px);
    cursor: pointer;
}

.alert-card{
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
}

</style>
