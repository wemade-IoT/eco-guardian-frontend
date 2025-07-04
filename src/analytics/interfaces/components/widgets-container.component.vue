<template>
  <div class="w-full">
    <div class="widgets-container">
      <widget-card
        v-for="(widget, index) in widgets"
        :key="index"
        :icon="getIcon(widget.metricType)"
        :title="widget.metricType"
        :value="widget.metricValue"
        :description="widget.description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { AnalyticsService } from '../../infrastructure/services/analytics.service';
import WidgetCard from './widget-card.component.vue';

const widgets = ref<any[]>([]);
const analyticsService = new AnalyticsService();

const getIcon = (title: string): string => {
  const iconsMap: Record<string, string> = {
    'Water Consumption': 'fa fa-solid fa-droplet',
    'Humidity': 'fa fa-solid fa-droplet',
    'Light': 'fa fa-solid fa-lightbulb',
    'Temperature': 'fa fa-solid fa-temperature-half',
  };
  return iconsMap[title] || 'fa fa-solid fa-circle';
};

/*
Descriptions 



*/

onMounted(async () => {
  try {
    const data = await analyticsService.getWidgetAnalytics(1);
    widgets.value = data.metrics;
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
}

</style>