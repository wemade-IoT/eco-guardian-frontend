<script setup lang="ts">

import CalendarOrder from "@/planning/interfaces/components/calendar-order.component.vue";
import TimeSlotsOrder from "@/planning/interfaces/components/time-slots-order.component.vue";
import Button from "primevue/button";
</script>

<template>
  <div class="w-[80%] min-h-screen flex flex-row items-center justify-center mx-auto">
    <div class="flex flex-col flex-1">
      <calendar-order/>
      <time-slots-order/>
      <div class="flex justify-end mt-4 p-4">
        <Button class="confirm-button text-white px-6 py-2 w-[15rem]">
          Confirm Installation
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.confirm-button {
  background-color: #578257;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
}
.confirm-button:hover,
.confirm-button:focus,
.confirm-button:active {
  background-color: #578257 !important;
}
</style>