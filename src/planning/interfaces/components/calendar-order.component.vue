<script setup lang="ts">
import { ref } from 'vue';
import {DatePicker} from "primevue";

const date = ref(null);
</script>

<template>
  <div class="flex justify-center min-h-screen">
    <div class="grid grid-cols-1 gap-4 h-full p-4 w-[80rem]">
      <h1 class="title font-bold text-3xl text-left">
        Schedule your installation
      </h1>
      <div class="card flex h-full flex-col items-center justify-center">
        <DatePicker v-model="date" inline :numberOfMonths="2" class="w-full sm:w-[50rem]"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-datepicker-panel) {
  border: none;
  box-shadow: none;
}
:deep(.p-datepicker-header) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border: none;
}
:deep(.p-datepicker-prev-button) {
  position: relative;
}
:deep(.p-datepicker-next-button) {
  position: relative;
  margin-left: auto;
}
:deep(.p-datepicker-title) {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  width: max-content;
  text-align: center;
  pointer-events: none;
  font-weight: bold;
}
:deep(.p-datepicker-calendar) {
  border: none !important;
}
</style>