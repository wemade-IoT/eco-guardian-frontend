<script setup lang="ts">
import PlantCard from './plant-card.component.vue';

const plants = [
  { name: 'Plant A', type: 'Wheat', status: 'Healthy', state: 1 },
  { name: 'Plant B', type: 'Corn', status: 'Warning', state: 3 },
  { name: 'Plant C', type: 'Rice', status: 'Unhealthy', state: 2 },
];

function addPlant() {
  console.log('Add new plant');
}
</script>

<template>
  <div class="plants-list bg-[#E3E3E3] p-4 rounded">
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
