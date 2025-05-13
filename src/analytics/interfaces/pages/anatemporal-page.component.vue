<!-- este es para el dashboard de domestico mis apus -->
<template>
  <div class="grid grid-cols-[1fr_1fr_1fr] grid-rows-auto gap-2 h-max py-3">
    <div class="flex flex-col gap-2">
      <lines-chart></lines-chart>
      <!-- <widgets-container></widgets-container> -->
    </div>
    <plant-information></plant-information>
    <div class="flex flex-col gap-2 h-full">
      <tips-carousel></tips-carousel>
      <alerts-list></alerts-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import AlertsList from '../components/alerts-list.component.vue';
import DevicesList from '../components/devices-list.component.vue';
import LinesChart from '../components/lines-chart.component.vue';
import PlantInformation from '../components/plant-information.component.vue';
import TipsCarousel from '../components/tips-carousel.component.vue';
import WidgetsContainer from '../components/widgets-container.component.vue';
</script>

<style scoped></style>