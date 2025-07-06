<template>
  <section class="bg-gray-100 p-4 w-full h-full flex-1 chart-data">
    <div class="flex flex-col">
      <div class="w-full flex flex-row items-center justify-between">
        <h2 v-if="authStore.isEnterprise" class="text-xl font-sans">Plantation Statistics over time</h2>
        <h2 v-else class="font-sans">Plant Statistics over time</h2>
        <Select v-model="selectedOption" :options="options" optionLabel="label" optionValue="value" placeholder="Select time period"
          class="flex flex-row items-center -space-x-2 tracking-wide rounded-md text-sm h-8" />
      </div>
      <div class="mt-1 w-full translate-x-1.5">
        <Chart v-if="chartData && chartData.datasets && chartData.datasets.length > 0" 
               class="responsive-trick h-60" 
               type="line" 
               :data="chartData" 
               :options="chartOptions" />
        
        <!-- No data message -->
        <div v-else class="flex flex-col items-center justify-center h-60 bg-white rounded-lg border border-gray-200">
          <div class="text-center">
            <i class="fa fa-solid fa-chart-line text-gray-400 text-4xl mb-4"></i>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No hay datos disponibles</h3>
            <p class="text-sm text-gray-500 mb-1">
              No se encontraron métricas para esta planta en el período seleccionado.
            </p>
            <p class="text-xs text-gray-400">
              Si acabas de registrar la planta, los datos pueden tardar unos minutos en aparecer.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Select } from 'primevue';


import { onMounted, ref, watch } from 'vue';

import Chart from 'primevue/chart';
import { AnalyticsService } from '../../infrastructure/services/analytics.service';
import {chartOptions} from "../../../public/utils/consts/chart.ts";
import type {PeriodsValue} from "../../../public/utils/types/chart.ts";
import { useAuthStore } from '../../../iam/interfaces/store/auth-store.ts';
import { metricData } from '../../domain/data-response.ts';
import { usePlantStore } from '../../../monitoring/interfaces/stores/plant-store.ts';
import { useDeviceStore } from '../../../inventory/stores/device-store.ts';

const options = [
  { label: 'By Hours', value: 'hourly' },
  { label: 'By Day', value: 'daily' },
  { label: 'By Month', value: 'monthly' },
  { label: 'By Year', value: 'yearly' },
  { label: 'All Time', value: 'none' }
];

const authStore = useAuthStore();

const selectedOption = ref<PeriodsValue>('daily');
// de ahi le meto el tipado
const chartData = ref<{ 
  labels: string[]; 
  datasets: { 
    label: string; 
    data: (number | null)[]; 
    borderColor: string; 
    backgroundColor: string; 
    fill: boolean; 
    tension: number; 
    pointRadius?: number;
    pointHoverRadius?: number;
    borderWidth?: number;
    spanGaps?: boolean;
  }[] 
} | null>(null);
const analyticsService = new AnalyticsService();

//Reactive based on selectedOption

const getAnalytics = async () => {
  try {
    console.log('Fetching analytics data...');
    const time = selectedOption.value; // Get the selected time period
    // Get device Id by plant Id
    const plantStore = usePlantStore();
    if (!plantStore.plant) {
      console.error('No plant selected');
      chartData.value = null;
      return;
    }
    //We need to get the deviceId from the device Service once its implemented

    console.log('Selected device ID:', useDeviceStore().getSelectedDeviceId);

    const data = await analyticsService.getAnalytics(useDeviceStore().getSelectedDeviceId, time); //for now always 1, later will be dynamic
    
    // Check if we have data
    if (!data || data.length === 0) {
      console.log('No analytics data available for this plant');
      chartData.value = null;
      return;
    }
    
    // Process the analytics data for Chart.js
    const processedData = processAnalyticsForChart(data);
    console.log('Processed data for chart:', processedData);
    
    // Check if processed data has any datasets with data
    if (!processedData || !processedData.datasets || processedData.datasets.length === 0) {
      console.log('No valid datasets after processing');
      chartData.value = null;
      return;
    }
    
    chartData.value = processedData;

  } catch (error) {
    console.error('Error fetching analytics data:', error);
    chartData.value = null;
  }
};

onMounted(async () => {
  await getAnalytics();
});

//watcher or something to update chartData when selectedOption changes
watch(selectedOption, async (newValue) => {
  console.log('Selected option changed:', newValue);
  await getAnalytics();
});

// Watcher to update chartData when device changes
watch(() => useDeviceStore().getSelectedDeviceId, async (newDeviceId, oldDeviceId) => {
  console.log('Device ID changed from:', oldDeviceId, 'to:', newDeviceId);
  if (newDeviceId) {
    await getAnalytics();
  }
  else {
    chartData.value = null; // Clear chart data if no device is selected
  }
}, { immediate: false });

// Function to process analytics data for Chart.js
const processAnalyticsForChart = (analyticsData: metricData[]) => {
  console.log('Processing analytics data:', analyticsData);
  
  // Generate complete date range based on selected period
  const generateDateRange = (period: PeriodsValue) => {
    const now = new Date();
    const dates: Date[] = [];
    
    switch (period) {
      case 'hourly':
        // Current day from 00:00 to 23:00
        const today = new Date(now);
        today.setHours(0, 0, 0, 0); // Start of today
        for (let i = 0; i < 24; i++) {
          const date = new Date(today);
          date.setHours(i, 0, 0, 0);
          dates.push(date);
        }
        break;
      case 'daily':
        // Current week from Monday to Sunday
        const currentDate = new Date(now);
        const currentDay = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const monday = new Date(currentDate);
        
        // Calculate days to subtract to get to Monday (1)
        const daysToMonday = currentDay === 0 ? 6 : currentDay - 1;
        monday.setDate(currentDate.getDate() - daysToMonday);
        monday.setHours(0, 0, 0, 0);
        
        // Add 7 days starting from Monday
        for (let i = 0; i < 7; i++) {
          const date = new Date(monday);
          date.setDate(monday.getDate() + i);
          dates.push(date);
        }
        break;
      case 'monthly':
        // Current year - 12 months (January to December)
        const currentYear = now.getFullYear();
        for (let i = 0; i < 12; i++) {
          const date = new Date(currentYear, i, 1, 0, 0, 0, 0);
          dates.push(date);
        }
        break;
      case 'yearly':
        // Last 5 years
        const currentYearForYearly = now.getFullYear();
        for (let i = 4; i >= 0; i--) {
          const date = new Date(currentYearForYearly - i, 0, 1, 0, 0, 0, 0);
          dates.push(date);
        }
        break;
      default:
        // For 'none' or default, just use the actual data dates
        //It should change varying from the data
        if (analyticsData.length === 0) {
          return [];
        }
        // If no specific period is selected, return all unique dates from the data
        return analyticsData.map(entry => new Date(entry.createdAt));
    }
    
    return dates;
  };
  
  // Get the complete date range
  const dateRange = generateDateRange(selectedOption.value);
  
  // Format labels based on selected time period
  const labels = dateRange.map(date => {
    switch (selectedOption.value) {
      case 'yearly':
        return date.toLocaleDateString('en-US', { year: 'numeric' });
      case 'monthly':
        return date.toLocaleDateString('en-US', { month: 'short' });
      case 'daily':
        return date.toLocaleDateString('en-US', { weekday: 'short' });
      case 'hourly':
        return date.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          hour12: true 
        });
      default:
        return date.toLocaleString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        });
    }
  });

  // Get all unique metric types from the data
  const allMetricTypes = new Set<number>();
  analyticsData.forEach(entry => {
    entry.metrics.forEach(metric => {
      allMetricTypes.add(metric.metricTypesId);
    });
  });

  // Define colors and names for metric types
  const metricConfig: Record<number, { name: string; color: string }> = {
    1: { name: 'Humidity', color: '#3B82F6' },      // Blue
    2: { name: 'Light', color: '#EAB308' },         // Yellow
    3: { name: 'Temperature', color: '#EF4444' },   // Red
    4: { name: 'Water Usage', color: '#10B981' } // Green
  };

  // Create datasets for each metric type
  const datasets = Array.from(allMetricTypes).map(metricTypeId => {
    const values = dateRange.map((rangeDate, index) => {
      // For 'All Time', use direct mapping since dateRange comes from actual data
      if (selectedOption.value === 'none') {
        const entry = analyticsData[index];
        if (entry) {
          const metric = entry.metrics.find(m => m.metricTypesId === metricTypeId);
          return metric ? metric.metricValue : null;
        }
        return null;
      }
      
      // For other periods, find the closest data point to this date
      const closestEntry = analyticsData.find(entry => {
        const entryDate = new Date(entry.createdAt);
        
        // Different matching logic based on period
        switch (selectedOption.value) {
          case 'hourly':
            // Match same hour of the same day
            return entryDate.getHours() === rangeDate.getHours() &&
                   entryDate.getDate() === rangeDate.getDate() &&
                   entryDate.getMonth() === rangeDate.getMonth() &&
                   entryDate.getFullYear() === rangeDate.getFullYear();
          case 'daily':
            // Match same day of the week for current week
            return entryDate.getDate() === rangeDate.getDate() &&
                   entryDate.getMonth() === rangeDate.getMonth() &&
                   entryDate.getFullYear() === rangeDate.getFullYear();
          case 'monthly':
            // Match same month of current year
            return entryDate.getMonth() === rangeDate.getMonth() &&
                   entryDate.getFullYear() === rangeDate.getFullYear();
          case 'yearly':
            return entryDate.getFullYear() === rangeDate.getFullYear();
          default:
            return false; // This shouldn't happen now
        }
      });
      
      if (closestEntry) {
        const metric = closestEntry.metrics.find(m => m.metricTypesId === metricTypeId);
        return metric ? metric.metricValue : null;
      }
      
      return null; // No data for this date
    });

    const config = metricConfig[metricTypeId] || { 
      name: `Metric Type ${metricTypeId}`, 
      color: '#6B7280' 
    };

    return {
      label: config.name,
      data: values,
      borderColor: config.color,
      backgroundColor: config.color + '20', // Add transparency
      fill: false,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2,
      spanGaps: true // Connect points across null values
    };
  });

  console.log('Chart labels:', labels);
  console.log('Chart datasets:', datasets);

  return {
    labels,
    datasets
  };
};

</script>

<style scoped>
/* this is a trick to make the chart responsive omglul */
.responsive-trick {
  width: 99% !important;
}

.line-chart {
  width: 100%;
  height: 100%;
}

</style>