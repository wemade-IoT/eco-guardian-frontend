<template>
  <div class="bg-gray-100 h-full p-4">
    <h2 class="text-[18px] font-semibold mb-4">Notifications</h2>
    <div class="flex flex-col gap-4">
      <alert-card
        v-for="(alert, index) in alerts"
        :key="index"
        :title="alert.title"
        :content="alert.content"
        :date="alert.date"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AlertCard from './alert-card.component.vue';

const alerts = [
  { title: 'Watered Plantation', content: 'Watered plantation P-01.', date: '2023/10/01 12:25:20' },
  { title: 'Humidity Below Threshold', content: 'Plantation P-01 needs watering.', date: '2023/10/02 12:20:00' },
  { title: 'Temperature Low', content: 'Plantation P-03 temperature is below recommended value.', date: '12/05/2025 12:10:20' },
];
</script>

<style scoped></style>
