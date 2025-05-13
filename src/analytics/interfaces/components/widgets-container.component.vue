<template>
  <div class="w-full">
    <div class="grid grid-cols-3 gap-2 w-full">
      <widget-card
        v-for="(widget, index) in widgets"
        :key="index"
        :icon="getIcon(widget.title)"
        :title="widget.title"
        :value="widget.value"
        :description="widget.description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { AnalyticsService } from '../../application/services/analytics.service';
import WidgetCard from './widget-card.component.vue';

const widgets = ref<any[]>([]);
const analyticsService = new AnalyticsService();

const getIcon = (title: string): string => {
  const iconsMap: Record<string, string> = {
    'Water Consumption': 'fa fa-solid fa-droplet',
    'Energy Consumption': 'fa fa-solid fa-bolt',
    'Humidity Threshold': 'fa fa-solid fa-droplet',
    'Light Level': 'fa fa-solid fa-lightbulb',
    'Temperature': 'fa fa-solid fa-temperature-half',
    'Humidity': 'fa fa-solid fa-circle-info',
  };
  return iconsMap[title] || 'fa fa-solid fa-circle';
};

onMounted(async () => {
  try {
    const data = await analyticsService.getWidgetAnalytics();
    widgets.value = data;
  } catch (error) {
    console.error('Error fetching widget analytics:', error);
  }
});
</script>

<style scoped></style>