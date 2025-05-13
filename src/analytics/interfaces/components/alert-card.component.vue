<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
});
</script>

<template>
  <div class="alert-card bg-[#D6E899] border border-[#A4D39A] rounded p-4 flex flex-col">
    <h3 class="text-[16px] font-semibold mb-2">{{ title }}</h3>
    <p class="text-[12px] font-normal mb-2">{{ content }}</p>
    <p class="text-[12px] text-[#757575]">At {{ date }}</p>
  </div>
</template>

<style scoped>
</style>
