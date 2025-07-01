<template>
  <div class="bg-gray-100 h-full p-4 rounded-lg">
    <h2 class="text-xl font-semibold mb-4">Notifications</h2>
    <div v-if="notificationStore.notifications.length > 0" class="flex flex-col gap-4 flex-1">
      <alert-card
          v-for="(alert, index) in notificationStore.notifications"
          :key="index"
          :title="alert.title"
          :content="alert.subject"
          :date="alert.createdAt"
      />
    </div>
    <div v-else class="text-center text-gray-500">
      <p>It appears that there are no notifications yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted} from 'vue';
import AlertCard from './alert-card.component.vue';
import {useNotificationStore} from "../../profile/interfaces/store/notification-store.ts";
import {useAuthStore} from "../../iam/interfaces/store/auth-store.ts";

const notificationStore = useNotificationStore();
const authStore = useAuthStore();

onMounted(async () => {
  try {
    const id = authStore.id;
    await notificationStore.getNotifications(id);
  } catch (error) {
    console.error('Error fetching alerts:', error);
  }
});
</script>

<style scoped></style>
