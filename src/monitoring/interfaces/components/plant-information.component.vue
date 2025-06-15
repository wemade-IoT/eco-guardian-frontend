<script setup lang="ts">
import {PlantResponse} from "../../domain/plant-response.ts";

defineProps({
  isEnterprise: {
    type: Boolean,
    default: false
  },
  plant:{
    type: PlantResponse,
    required: true
  }
})

const wellnessStates : Record<number,string> = {
  1: "Healthy",
  2: "Unhealthy",
  3: "Warning"
}
</script>

<template>
  <section class="bg-gray-100 p-4 h-max">
    <div v-if="!isEnterprise" class="flex items-center justify-between">
      <h2 class="text-xl font-bold">Plant Information</h2>
      <i class="pi pi-cog text-xl text-slate-900"></i>
    </div>
    <div v-else class="flex items-center justify-between">
      <h2 class="text-xl font-bold">Plantation Information</h2>
      <i class="pi pi-cog text-xl text-slate-900"></i>
    </div>
    <figure class="relative mt-4 w-full rounded-md overflow-hidden h-90">
      <img src="../../../assets/images/planta_prueba.webp" alt="Plant Information" class="w-full h-full object-cover" />
      <div
        class="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black to-transparent flex items-end justify-center">
        <div class="flex flex-col text-white p-4 w-full">
          <h3 class="text-2xl font-bold">{{plant.name}}</h3>
          <div class="mt-1 flex flex-row items-center justify-between">
            <div class="flex flex-row gap-2.5">
              <p class="text-base text-slate-300 font-sans">{{plant.type}} <span>
                </span>
              </p>
              <div class="flex flex-row gap-1.5 items-center">
                <div class="w-2 h-2 rounded-full bg-green-500"></div>
                <span class="font-medium text-sm font-sans text-green-500">{{wellnessStates[plant.wellnessStateId]}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
      <div  v-if="isEnterprise" class="flex flex-row gap-5  ">
        <h3 class="text-lg font-bold">Area coverage</h3>
        <span class="text-slate-900 font-medium">{{plant.areaCoverage}} km</span>
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
            <span class="text-slate-900 font-medium">{{plant.waterThreshold}} %</span>
          </div>
        </div>
        <div class="flex flex-row items-center justify-between">
          <p class="text-sm text-slate-500">Light</p>
          <div class="flex flex-row items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
            <span class="text-slate-900 font-medium">{{plant.lightThreshold}}%</span>
          </div>
        </div>
        <div class="flex flex-row items-center justify-between">
          <p class="text-sm text-slate-500">Temperature</p>
          <div class="flex flex-row items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
            <span class="text-slate-900 font-medium">{{plant.temperatureThreshold}}°C</span>
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
          <span class="text-slate-900 font-medium">{{plant.createdAt}}</span>
        </div>
        <div class="flex flex-row items-center justify-between">
          <p class="text-sm text-slate-500">Last Updated:</p>
          <span class="text-slate-900 font-medium">{{plant.updatedAt}}</span>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped></style>