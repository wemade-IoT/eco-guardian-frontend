<template>
  <div class="h-full w-full px-4 pt-5 rounded-lg bg-gray-100">
    <h2 class="text-xl font-semibold mb-4">Recent Notifications</h2>
    <div v-if="recentNotifications.length > 0" class="flex flex-col gap-4 flex-1 h-full">
      <alert-card
          v-for="(alert, index) in recentNotifications"
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
import { computed, onMounted} from 'vue';
import AlertCard from './alert-card.component.vue';
import {useNotificationStore} from "../../profile/interfaces/store/notification-store.ts";
import {useAuthStore} from "../../iam/interfaces/store/auth-store.ts";

const notificationStore = useNotificationStore();
const authStore = useAuthStore();

const recentNotifications = computed(() => {
  return [...notificationStore.notifications].reverse().slice(0, 2);
});

onMounted(async () => {
  try {
    const id = authStore.id;
    await notificationStore.getNotifications(id);
  } catch (error) {
    console.error('Error fetching alerts:', error);
  }
});
</script>

<style scoped>


</style>
