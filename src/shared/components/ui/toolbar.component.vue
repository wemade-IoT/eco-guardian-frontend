<template>
  <header class="h-20 bg-[#ebebeb] flex items-center justify-between">
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
          <p class="text-gray-200 text-sm">
            <span class="text-white text-base font-normal mr-0.5">{{NotificationStore.notifications.length}}</span> 
            {{ t('notifications') }}
          </p>
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
import { useI18n } from '../../../shared/services/usei18n'; // Import the useI18n composable

const { t } = useI18n(); // Use only t function for translations


const NotificationStore = useNotificationStore();




const route = useRoute();

const current_route = computed(() => {
  // Map route names to translation keys
  const routeTranslationMap: Record<string, string> = {
    'dashboard': 'dashboard',
    'home': 'dashboard',
    'profile': 'profile',
    'Profile': 'profile',
    'Profile Page': 'profile',
    'consulting': 'consulting',
    'Consulting': 'consulting',
    'info-panel': 'plants',
    'Information Panel': 'plants',
    'Installation': 'installation',
    'Schedule Installation': 'scheduleInstallation',
    'Order Payment': 'orderPayment'
  };
  
  const routeName = route.name ? route.name.toString() : 'home';
  const translationKey = routeTranslationMap[routeName] || 'home';
  



  // Use t() function to get translated route name - this will be reactive!
  return t(translationKey as any);
});


const authStore = useAuthStore();

// The date is formatted to be readable and to be calculated based on the time.



/* Missing fixes: 
- The alert count is static, it should be dynamic based on the actual alerts (Notifications, and it should redirect to the profile section with the notifications).
*/

const locale = computed(() => t('locale') === 'es' ? 'es-ES' : 'en-US');
const current_date = computed(() =>
  new Date().toLocaleDateString(locale.value, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
);


console.log('Auth Store (User Role):', authStore.role);
</script>

<style scoped></style>