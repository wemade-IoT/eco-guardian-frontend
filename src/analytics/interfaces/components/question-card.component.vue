<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  id: { type: Number, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  resolved: { type: Boolean, required: true },
});

const stateColors = {
  resolved: '#578257',
  pending: '#FF5252',
};
</script>

<template>
  <div class="question-card bg-white p-4 rounded flex items-center h-[125px]">
    <div class="flex flex-col flex-grow">
      <p class="text-[18px] font-semibold mb-2">ID: {{ id }}</p>
      <p class="text-[16px] font-light mb-2">{{ description }}</p>
      <div class="flex items-center flex-wrap">
        <p class="text-[16px] font-thin">Status:</p>
        <div
          class="w-[5px] h-[5px] ml-auto rounded-full"
          :style="{ backgroundColor: resolved ? stateColors.resolved : stateColors.pending }"
        ></div>
        <p class="text-[16px] font-thin ml-auto">{{ status }}</p>
      </div>
    </div>

  </div>
</template>

<style scoped></style>
