<template>
  <section class="bg-gray-100 p-4 w-full">
    <div class="flex flex-col">
      <div class="w-full flex flex-row items-center justify-between">
        <h2 class="font-sans">Water and Energy Consumption over time</h2>
        <Select v-model="selectedOption" :options="options" optionLabel="label" placeholder="Month"
          class="flex flex-row items-center -space-x-2 tracking-wide rounded-md text-sm h-8" />
      </div>
      <div class="mt-2.5 relative before:absolute after:absolute before:bg-[#8fbf8f] 
        after:bg-[#cde6cd] before:left-0 before:top-0 before:h-[1.5px] 
        before:w-6 after:left-8 after:right-0 after:top-0 after:h-[1.5px]">
      </div>
      <div class="mt-6 w-full translate-x-1.5">
        <Chart class="responsive-trick h-100" type="line" :data="chartData || {}" :options="chartOptions" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Select } from 'primevue';

import { onMounted, ref } from 'vue';

import Chart from 'primevue/chart';
import { AnalyticsService } from '../../infrastructure/services/analytics.service';
import {chartOptions} from "../../../public/utils/consts/chart.ts";

const options = [
  { label: 'Month', value: 'month' },
  { label: 'Year', value: 'year' },
];

const selectedOption = ref<PeriodsValue>('month');
// de ahi le meto el tipado
const chartData = ref<{ labels: string[]; datasets: { label: string; data: number[]; borderColor: string; backgroundColor: string; fill: boolean; tension: number; }[] } | null>(null);
const analyticsService = new AnalyticsService();

onMounted(async () => {
  try {
    const data = await analyticsService.getAnalytics();

    chartData.value = {
      labels: data.labels,
      datasets: data.datasets.map((dataset: any) => ({
        label: dataset.label,
        data: dataset.data,
        borderColor: dataset.borderColor,
        backgroundColor: dataset.backgroundColor,
        fill: dataset.fill,
        tension: dataset.tension,
      })),
    };
  } catch (error) {
    console.error('Error fetching analytics data:', error);
  }
});

</script>

<style scoped>
/* this is a trick to make the chart responsive omglul */
.responsive-trick {
  width: 99% !important;
}
</style>