<template>
  <div class="bg-gray-100 h-full p-4">
    <h2 class="text-xl font-semibold mb-4">Notifications</h2>
    <div class="flex flex-col gap-4">
      <alert-card
          v-for="(alert, index) in alerts"
          :key="index"
          :title="alert.title"
          :content="alert.content"
          :date="alert.created_at"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AlertCard from './alert-card.component.vue';
import {NotificationService} from "../../profile/infrastructure/services/notification.service.ts";

const alertsService = new NotificationService();

const alerts = ref<any[]>([]);

onMounted(async () => {
  try {
    const response = await alertsService.getNotifications();
    alerts.value = response;
  } catch (error) {
    console.error('Error fetching alerts:', error);
  }
});
</script>

<style scoped></style>
