<script setup lang="ts">
import { onMounted } from 'vue';
import { MonitoringService } from '../infrastructure/services/monitoring.service.ts';
import PlantCard from './plant-card.component.vue';
import { ref } from 'vue';

const managementService = new MonitoringService();

const plants = ref<any[]>([]);

onMounted(async () => {
  try {
    const response = await managementService.getPlants();
    plants.value = response;
  } catch (error) {
    console.error('Error fetching plants:', error);
  }
});

const addPlant = async () => {
  console.log('Add plant button clicked');
};
</script>

<template>
  <div class="plants-list bg-gray-100 p-4 rounded">
    <h2 class="text-[24px] font-semibold mb-4">Plants</h2>
    <div class="flex flex-col gap-4">
      <plant-card
        v-for="(plant, index) in plants"
        :key="index"
        :name="plant.name"
        :type="plant.type"
        :status="plant.status"
        :state="plant.state"
      />
    </div>
    <button
      class="mt-4 w-full h-10 bg-[#578257] text-white rounded flex items-center justify-center"
      @click="addPlant"
    >
      <i class="pi pi-plus text-[16px]"></i>
    </button>
  </div>
</template>

<style scoped></style>
