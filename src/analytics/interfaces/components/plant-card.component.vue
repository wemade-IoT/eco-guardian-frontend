<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  state: { type: Number, required: true },
});

const stateColors: Record<number, string> = {
  1: "#578257",
  2: "#FF5252",
  3: "#FFC107",
};
</script>

<template>
  <div class="plant-card bg-white p-4 rounded flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <div
        class="w-[10px] h-[10px] rounded-full"
        :style="{ backgroundColor: stateColors[state] }"
      ></div>
      <p class="text-[18px] font-normal">{{ name }}</p>
    </div>
    <div class="flex items-center gap-2">
      <p class="text-[14px] font-normal">{{ type }}</p>
      <div
        class="w-[5px] h-[5px] rounded-full"
        :style="{ backgroundColor: stateColors[state] }"
      ></div>
      <p class="text-[14px] font-normal">{{ status }}</p>
    </div>
  </div>
</template>

<style scoped></style>
