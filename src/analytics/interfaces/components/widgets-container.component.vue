<template>
  <div class="w-full">
    <div class="widgets-container">
      <widget-card
        v-for="(widget, index) in widgets"
        :key="index"
        :icon="getIcon(widget.metricType)"
        :title="widget.metricType"
        :value="getValue(widget.metricValue, widget.metricType)"
        :description="widget.description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { AnalyticsService } from '../../infrastructure/services/analytics.service';
import WidgetCard from './widget-card.component.vue';
import { usePlantStore } from '../../../monitoring/interfaces/stores/plant-store';

const widgets = ref<any[]>([]);
const analyticsService = new AnalyticsService();

const getIcon = (title: string): string => {
  const iconsMap: Record<string, string> = {
    'Water Consumption': 'fa fa-solid fa-droplet',
    'Humidity': 'fa fa-solid fa-droplet',
    'Light': 'fa fa-solid fa-lightbulb',
    'Temperature': 'fa fa-solid fa-temperature-half',
    'Plant Type': 'fa fa-solid fa-leaf',
    'Added On': 'fa fa-solid fa-calendar-plus',
  };
  return iconsMap[title] || 'fa fa-solid fa-circle';
};

const getValue = (value: number,type: string): string => {
  const valueMap: Record<string, string> = {
    'Water Consumption': `${value}L`,
    'Humidity': `${value}%`,
    'Light': `${value} Lux`,
    'Temperature': `${value}°C`,
    'Plant Type': `${value}`, // Assuming value is a string for Plant Type
    'Added On': `${value}`// Format to be 00/00/0000
  };
  return valueMap[type] || "N/A";
};

/*
Descriptions 



*/

onMounted(async () => {
  try {
    const data = await analyticsService.getWidgetAnalytics(1);
    widgets.value = data.metrics;
    // Agregamos Plant Type y Cuando se agrego
    widgets.value.push({
      metricType: 'Plant Type',
      metricValue: usePlantStore().plant?.type || 'N/A',
      description: 'Type of plant being monitored'
    });
    widgets.value.push({
      metricType: 'Added On',
      metricValue: usePlantStore().plant?.createdAt.toLocaleDateString('en-GB') || 'N/A',
      description: 'Date when the plant was added'
    });
  } catch (error) {
    console.error('Error fetching widget analytics:', error);
  }
});
</script>

<style>

.widgets-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  gap: 0.5rem;
  flex:1;
}

</style>