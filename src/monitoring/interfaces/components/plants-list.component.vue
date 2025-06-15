<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PlantCard from './plant-card.component.vue';
import plantDialog from './plant-dialog.vue';
import { PlantAssembler } from "../../domain/plant-assembler.ts";
import {usePlantStore} from "../stores/plant-store.ts";
import type {PlantResponse} from "@/monitoring/domain/plant-response.ts";

const plantAssembler = new PlantAssembler();
const plantStore =  usePlantStore();

const visible = ref(false);
const isEnterprise = ref(false);
const isProceed = ref(false);
const currentPlantId = ref(0);

const enterpriseValues = ref({
  id: 0,
  name: '',
  type: '',
  waterThreshold: 0,
  lightThreshold: 0,
  temperatureThreshold: 0,
  areaCoverage: 1000,
  userId: 1,
  isPlantation: true,
  wellnessStateId: 1,
});

const domesticValues = ref({
  id: 0,
  name: '',
  type: '',
  waterThreshold: 0,
  lightThreshold: 0,
  temperatureThreshold: 0,
  areaCoverage: 0,
  userId: 1,
  isPlantation: false,
  wellnessStateId: 1,
});

onMounted(async () => {
    await plantStore.getPlantsByUserId(1) //TODO: replace with actual user ID
});

const savePlant = async () => {
  isProceed.value = false;
  if (!visible.value) {
    if (isEnterprise.value) {
      enterpriseValues.value = { ...enterpriseValues.value, id: 0, name: '', type: '', waterThreshold: 0, lightThreshold: 0, temperatureThreshold: 0 };
    } else {
      domesticValues.value = { ...domesticValues.value, id: 0, name: '', type: '', waterThreshold: 0, lightThreshold: 0, temperatureThreshold: 0 };
    }
  }
  visible.value =true;
};

function setEditMode(plant: any) {
  isProceed.value = false;
  isEnterprise.value = plant.isPlantation;
  if (isEnterprise.value) {
    enterpriseValues.value = {
      ...enterpriseValues.value,
      ...plant,
      areaCoverage: plant.areaCoverage || 1000,
    };
  } else {
    domesticValues.value = {
      ...domesticValues.value,
      ...plant,
      areaCoverage: 0,
    };
  }
  visible.value = true;
}

function deletePlant(){
  plantStore.deletePlant(currentPlantId.value)
    .then(() => {
      plantStore.deletePlant(currentPlantId.value);
    })
    .catch(error => {
      console.error('Error deleting plant:', error);
    });
}

function viewPlantInformation(plant:PlantResponse){
  plantStore.plant = plant;
  //TODO: Add navigation to analytics page
}

function onProceedDelete(id:number) {
  isProceed.value = true;
  visible.value = true;
  currentPlantId.value = id;
}

async function submitForm(updatedValues: any) {
  if (isEnterprise.value) {
    Object.assign(enterpriseValues.value, updatedValues);
  } else {
    Object.assign(domesticValues.value, updatedValues);
  }

  const request = plantAssembler.toRequest(isEnterprise.value ? enterpriseValues.value : domesticValues.value); //TODO: Refactor this when iam will implement
  if (updatedValues.id !== 0) {
    await plantStore.editPlant(updatedValues.id, request);
  } else {
    await plantStore.createPlant(request);
  }

  visible.value = false;
}

</script>

<template>
  <div v-if="isEnterprise">
    <plant-dialog
        :is-delete="isProceed"
        @delete-plant="deletePlant"
        @update:isDelete="isProceed = $event"
        v-model:visible="visible"
        @submit-form="submitForm"
        :form-values="isEnterprise ? enterpriseValues : domesticValues"
        :header="enterpriseValues.id !== 0 ? 'Edit Plantation' : 'Register a new Plantation'"
        :subtitle="enterpriseValues.id !== 0 ? 'Edit the plantation details' : 'Register a plantation by defining general data'"
    />
  </div>
  <div v-else>
    <plant-dialog
        :is-delete="isProceed"
        @delete-plant="deletePlant"
        @update:isDelete="isProceed = $event"
        v-model:visible="visible"
        @submit-form="submitForm"
        :form-values="isEnterprise ? enterpriseValues : domesticValues"
        :header="domesticValues.id !== 0 ? 'Edit Plant' : 'Register a new Plant'"
        :subtitle="domesticValues.id !== 0 ? 'Edit the plant details' : 'Register a plant by defining general data'"
    />
  </div>

  <div class="plants-list bg-gray-100 p-4 rounded">
    <h2 class="text-[24px] font-semibold mb-4">Plants</h2>
    <div class="flex flex-col gap-4">
      <plant-card
          @view="viewPlantInformation(plant)"
          @delete="onProceedDelete(plant.id)"
          @edit="setEditMode(plant)"
          v-for="(plant, index) in plantStore.plants"
          :key="index"
          :name="plant.name"
          :type="plant.type"
          :status="plant.wellnessStateId"
          :state="plant.wellnessStateId"
      />
    </div>
    <button
        class="mt-4 w-full h-10 bg-[#578257] text-white rounded flex items-center justify-center"
        @click="savePlant"
    >
      <i class="pi pi-plus text-[16px]"></i>
    </button>
  </div>
</template>

<style scoped></style>
