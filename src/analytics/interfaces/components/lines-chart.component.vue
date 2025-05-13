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
        <Chart class="responsive-trick h-100" type="line" :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Select } from 'primevue';

import { ref } from 'vue';

import Chart from 'primevue/chart';
import { chartData } from '../../utils/mocks/chart';
import { chartOptions } from '../../utils/consts/chart';
import type { PeriodsValue } from '../../utils/types/chart';

const options = [
  { label: 'Month', value: 'month' },
  { label: 'Year', value: 'year' },
];

const selectedOption = ref<PeriodsValue>('month');

</script>

<style scoped>

/* this is a trick to make the chart responsive omglul */
.responsive-trick {
  width: 99% !important;
}
</style>