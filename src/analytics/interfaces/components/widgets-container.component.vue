<template>
  <div class="bg-gray-100 h-[439px] w-full">
    <div class="grid grid-cols-3 gap-[30px]">
      <widget-card
        v-for="(widget, index) in widgets"
        :key="index"
        :icon="widget.icon"
        :title="widget.title"
        :value="widget.value"
        :description="widget.description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import WidgetCard from './widget-card.component.vue';

const widgets = [
  { icon: 'fa fa-solid fa-droplet', title: 'Water Consumption', value: '65,25 L', description: 'Water Consumption in the last month' },
  { icon: 'fa fa-solid fa-bolt', title: 'Energy Consumption', value: '16 kW/h', description: 'System energy consumption.' },
  { icon: 'fa fa-solid fa-droplet', title: 'Humidity Threshold', value: '30%', description: 'Humidity Threshold of the most recent monitored plantation.' },
  { icon: 'fa fa-solid fa-lightbulb', title: 'Light Level', value: '15 kLux', description: 'Light Levels of the most recent monitored plantation' },
  { icon: 'fa fa-solid fa-temperature-half', title: 'Temperature', value: '20°C', description: 'Temperature of the most recent monitored plantation' },
  { icon: 'fa fa-solid fa-circle-info', title: 'Humidity', value: '82%', description: 'Humidity of the most recent monitored plantation' },
];
</script>

<style scoped></style>
