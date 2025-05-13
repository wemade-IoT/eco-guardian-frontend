<template>
  <div class="grid grid-cols-[2fr_1fr_1fr] grid-rows-auto gap-2 h-max py-3">
    <div class="flex flex-col gap-2">
      <lines-chart></lines-chart>
      <widgets-container></widgets-container>
    </div>
    <div v-if="isEnterprise">
      <devices-list></devices-list>
    </div>
    <div v-else>
      <plants-list></plants-list>
    </div>
    <div class="flex flex-col gap-2 h-full">
      <tips-carousel></tips-carousel>
      <alerts-list></alerts-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../../iam/interfaces/store/auth-store';
import AlertsList from '../components/alerts-list.component.vue';
import DevicesList from '../components/devices-list.component.vue';
import LinesChart from '../components/lines-chart.component.vue';
import PlantsList from '../components/plants-list.component.vue';
import TipsCarousel from '../components/tips-carousel.component.vue';
import WidgetsContainer from '../components/widgets-container.component.vue';

const authStore = useAuthStore();

const isEnterprise = authStore.user?.role === 'ENTERPRISE';
const isSpecialist = authStore.user?.role === 'SPECIALIST';
const isDomestic = authStore.user?.role === 'DOMESTIC';
</script>
<style scoped></style>