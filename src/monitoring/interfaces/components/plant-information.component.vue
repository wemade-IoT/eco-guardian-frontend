<script setup lang="ts">

import { useAuthStore } from "../../../iam/interfaces/store/auth-store.ts";
import { PlantResponse } from "../../domain/plant-response.ts";
import {usePlantStore} from "../stores/plant-store.ts";

const isEnterprise = useAuthStore().isEnterprise;
const plantStore = usePlantStore();
console.log("Plant Store:", plantStore);
const props = defineProps<{
  plant: PlantResponse
}>();

console.log("Plant Information Props:", plantStore.plant);
console.log("Image URL:", plantStore.plant?.image);

const wellnessStates : Record<number,string> = {
  1: "Healthy",
  2: "Unhealthy",
  3: "Warning"
}

// Helper function para formatear fechas
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<template>
  <section class="info-component bg-gray-100 p-4 ">
    <div v-if="!isEnterprise" class="flex items-center justify-between">
      <h2 class="text-xl font-bold">Plant Information</h2>
      <i class="pi pi-cog text-xl text-slate-900"></i>
    </div>
    <div v-else class="flex items-center justify-between">
      <h2 class="text-xl font-bold">Plantation Information</h2>
      <i class="pi pi-cog text-xl text-slate-900"></i>
    </div>
    <figure class="relative mt-4 w-full rounded-md overflow-hidden h-90">
      <img :src="props.plant.image" alt="Plant Information" class="w-full h-full object-cover" />
      <div
        class="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black to-transparent flex items-end justify-center">
        <div class="flex flex-col text-white p-4 w-full">
          <h3 class="text-2xl font-bold">{{props.plant.name}}</h3>
          <div class="mt-1 flex flex-row items-center justify-between">
            <div class="flex flex-row gap-2.5">
              <p class="text-base text-slate-300 font-sans">{{props.plant.type}} <span>
                </span>
              </p>
              <div class="flex flex-row gap-1.5 items-center">
                <div class="w-2 h-2 rounded-full bg-green-500"></div>
                <span class="font-medium text-sm font-sans text-green-500">{{wellnessStates[props.plant.wellnessStateId]}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
      <div  v-if="isEnterprise" class="flex flex-row gap-5  ">
        <h3 class="text-lg font-bold">Area coverage</h3>
        <span class="text-slate-900 font-medium">{{props.plant.areaCoverage}} km</span>
     </div>
    <div class="mt-3 flex flex-col px-4 py-4 bg-white rounded-lg">
      <div class="flex flex-row items-center justify-between">
        <h3 class="text-lg font-bold">Current Thresholds</h3>
        <i class="pi pi-pencil text-slate-500 cursor-pointer"></i>
      </div>
      <div class="mt-4 flex flex-col gap-3">
        <div class="flex flex-row items-center justify-between">
          <p class="text-sm text-slate-500">Humidity</p>
          <div class="flex flex-row items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
            <span class="text-slate-900 font-medium">{{props.plant.waterThreshold}} %</span>
          </div>
        </div>
        <div class="flex flex-row items-center justify-between">
          <p class="text-sm text-slate-500">Light</p>
          <div class="flex flex-row items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
            <span class="text-slate-900 font-medium">{{props.plant.lightThreshold}}%</span>
          </div>
        </div>
        <div class="flex flex-row items-center justify-between">
          <p class="text-sm text-slate-500">Temperature</p>
          <div class="flex flex-row items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
            <span class="text-slate-900 font-medium">{{props.plant.temperatureThreshold}}°C</span>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3 flex flex-col px-4 py-4 bg-white rounded-lg">
      <div class="flex flex-row items-center justify-between">
        <h3 class="text-lg font-bold">Activity</h3>
        <i class="pi pi-pencil text-slate-500 cursor-pointer"></i>
      </div>
      <div class="mt-4 flex flex-col gap-2">
        <div class="flex flex-row items-center justify-between">
          <p class="text-sm text-slate-500">Added at:</p>
          <span class="text-slate-900 font-medium">{{formatDate(props.plant.createdAt)}}</span>
        </div>
        <div class="flex flex-row items-center justify-between">
          <p class="text-sm text-slate-500">Last Updated:</p>
          <span class="text-slate-900 font-medium">{{formatDate(props.plant.updatedAt)}}</span>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>

.info-component {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
}

</style>