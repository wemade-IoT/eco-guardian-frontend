<template>
  <header class="h-20 bg-[#ebebeb] flex items-center justify-between px-4">
    <div class="flex flex-row items-center gap-5">
      <h1 class="text-shadow-dark text-2xl tracking-wide">EcoGuardian {{ current_route }}</h1>
      <p class="mr-3 flex items-center gap-1 font-medium text-gray-700 text-base">
        <span class="px-2 py-1 bg-green-300/60 text-slate-700 rounded-full text-sm uppercase">
          {{ authStore.role ?? 'GUEST' }}
        </span>
      </p>
    </div>
    <div class="flex flex-row items-center gap-2.5">
      <div class="flex flex-row items-center h-9 rounded-md overflow-hidden">
        <figure class="h-full flex items-center justify-center px-1.5 bg-slate-500">
          <i class="pi pi-bell text-lg text-slate-50"></i>
        </figure>
        <button class="flex flex-row items-center px-3 gap-3 bg-slate-700 h-full">
          <p class="text-gray-200 text-sm"><span class="text-white text-base font-normal mr-0.5">{{NotificationStore.notifications.length}}</span> Alert</p>
          <i class="pi pi-arrow-down text-xs rotate-235 text-slate-50"></i>
        </button>
      </div>
      <div class="flex flex-row items-center gap-2.5 h-9 rounded-md overflow-hidden bg-gray-300/50 px-3">
        <i class="pi pi-calendar text-lg text-gray-500 -mt-0.5"></i>
        <span>{{ current_date }}</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../../iam/interfaces/store/auth-store';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import {useNotificationStore} from "../../../profile/interfaces/store/notification-store.ts";

const NotificationStore = useNotificationStore();





const route = useRoute();

// it changes with the route navigation, so it is dynamic.
const current_route = computed(() => {
  const routeName = route.name ? route.name.toString().replace(/([A-Z])/g, ' $1').trim() : 'Home';
  console.log('Current Route:', route.name, '-> Display:', routeName);
  return routeName;
});

const authStore = useAuthStore();

// The date is formatted to be readable and to be calculated based on the time.
var current_date = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

/* Missing fixes: 
- The alert count is static, it should be dynamic based on the actual alerts (Notifications, and it should redirect to the profile section with the notifications).
*/




console.log('Auth Store (User Role):', authStore.role);
</script>

<style scoped></style>