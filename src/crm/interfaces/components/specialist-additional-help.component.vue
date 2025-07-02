<template>
  <div class="help">
    <h2 class="text-xl font-semibold">Additional Data</h2>
    <p class="text-sm text-gray-600">Need Help? Here you can find additional resources to assist you in answering questions.</p>
    <Button                 
    :disabled="!props.plantSelected" 
    @click="fetchPlantData(props.plantName)" class="mt-4">
      <i class="pi pi-plus"></i>
      <span class="ml-1">Find Resources</span>
    </Button>
<Dialog
  v-model:visible="isVisible"
  :closable="true"
  class="w-11/12 md:w-8/12 lg:w-6/12 xl:w-5/12 rounded-md shadow-xl bg-white p-6"
  header="Plant Search Results"
>
  <div v-if="plantData">
    <h3 v-if="plantData.data && plantData.data.length > 0" class="text-lg font-semibold mb-4">
      Found {{ plantData.data.length }} results for "{{ props.plantName }}":
    </h3>
    <ul v-else class="text-gray-700 mb-4">
      <li>No results found for "{{ props.plantName }}".</li>
    </ul>
    <ul v-if="plantData.data" class="space-y-4">
      <li v-for="(plant, index) in plantData.data" :key="index" class="border-b pb-4">
        <p class="font-medium">{{ plant.common_name }} ({{ plant.scientific_name }})</p>
        <ul class="mt-2 space-y-2">
          <li v-for="(section, index) in plant.section" :key="index">
            <p><span class="font-semibold">{{ section.type }}:</span> {{ section.description }}</p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <div v-else class="text-gray-500">Loading...</div>
</Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { ExternalApiService } from '../../infrastructure/services/external-api.service';
import { Button } from 'primevue';
import { ExternalPlantCareResponse } from '../../domain/external-plant-care-response';
import Dialog from 'primevue/dialog';

let isVisible = ref(false); // State to control dialog visibility

const props = defineProps<{
  plantName: string;
  plantSelected: boolean; // Property to indicate if a plant is selected
}>();

const externalApiService = new ExternalApiService();
let plantData = ref<ExternalPlantCareResponse | null>(null);
const fetchPlantData = async (query: string) => {
  try {
    //Validate that it is already in cache or local database
    
    const response = await externalApiService.searchPlants(query);
    plantData.value = response;
    console.log('Plant search data fetched successfully:', plantData.value);
    isVisible.value = true; 
    // Here you can handle the response, e.g., display it in the UI or process it further
    if (plantData.value && plantData.value.data && plantData.value.data.length > 0) {
      console.log('Plant search for:', plantData.value.data[0].common_name);
    }

    //Open dialog
    // You can use a dialog component to display the results


  } catch (error) {
    console.error('Error fetching plant data:', error);
  }
};




</script>

<style>

.help{
  padding: 1rem;
    width: 100%;
    border-radius: 0.5rem;
    background: #f9fafb;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex-shrink: 1;
    gap: 0.5rem;
}

</style>