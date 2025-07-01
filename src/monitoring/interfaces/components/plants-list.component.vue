<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PlantCard from './plant-card.component.vue';
import plantDialog from './plant-dialog.vue';
import { PlantAssembler } from "../../domain/plant-assembler.ts";
import {usePlantStore} from "../stores/plant-store.ts";
import type {PlantResponse} from "../../domain/plant-response.ts";
import {useAuthStore} from "../../../iam/interfaces/store/auth-store.ts";

const plantStore =  usePlantStore();
const authStore = useAuthStore();

const visible = ref(false);
const isProceed = ref(false);
const currentPlantId = ref(0);
const plants = ref<PlantResponse[]>([]);

const enterpriseValues = ref({
  id: 0,
  name: '',
  type: '',
  waterThreshold: 0,
  lightThreshold: 0,
  temperatureThreshold: 0,
  areaCoverage: 1000,
  userId: authStore.user?.id || 0,
  isPlantation: authStore.isEnterprise,
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
  userId: authStore.user?.id || 0,
  isPlantation: authStore.isEnterprise,
  wellnessStateId: 1,
});

onMounted(async () => {
    const response = await plantStore.getPlantsByUserId(authStore.user.id)
    plants.value = response;
});

const savePlant = async () => {
  isProceed.value = false;
  if (!visible.value) {
    if (authStore.isEnterprise) {
      enterpriseValues.value = { ...enterpriseValues.value, id: 0, name: '', type: '', waterThreshold: 0, lightThreshold: 0, temperatureThreshold: 0 };
    } else {
      domesticValues.value = { ...domesticValues.value, id: 0, name: '', type: '', waterThreshold: 0, lightThreshold: 0, temperatureThreshold: 0 };
    }
  }
  visible.value =true;
};

function setEditMode(plant: any) {
  isProceed.value = false;
  if (authStore.isEnterprise) {
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
  plantStore.plant.prototype = plant;
  //TODO: Add navigation to analytics page
}

function onProceedDelete(id:number) {
  isProceed.value = true;
  visible.value = true;
  currentPlantId.value = id;
}

async function submitForm(updatedValues: any) {
  if (authStore.isEnterprise) {
    Object.assign(enterpriseValues.value, updatedValues);
  } else {
    Object.assign(domesticValues.value, updatedValues);
  }

  const request = PlantAssembler.toRequest(authStore.isEnterprise ? enterpriseValues.value : domesticValues.value);
  if (updatedValues.id !== 0) {
    await plantStore.editPlant(updatedValues.id, request);
  } else {
    await plantStore.createPlant(request);
  }

  visible.value = false;
}

</script>

<template>
  <div v-if="authStore.isEnterprise">
    <plant-dialog
        :is-delete="isProceed"
        @delete-plant="deletePlant"
        @update:isDelete="isProceed = $event"
        v-model:visible="visible"
        @submit-form="submitForm"
        :form-values="authStore.isEnterprise ? enterpriseValues : domesticValues"
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
        :form-values="authStore.isEnterprise ? enterpriseValues : domesticValues"
        :header="domesticValues.id !== 0 ? 'Edit Plant' : 'Register a new Plant'"
        :subtitle="domesticValues.id !== 0 ? 'Edit the plant details' : 'Register a plant by defining general data'"
    />
  </div>

  <div class="plant-container bg-gray-100 rounded">
    <div class="title">
      <h2 v-if="authStore.isEnterprise" class="text-[24px] font-semibold">Plantation</h2>
      <h2 v-else class="text-[24px] font-semibold">Plants</h2>
    </div> 

    <div class="plants-list flex flex-col gap-4 pt-2">
      <plant-card
          v-for="(plant, index) in plants"
          @view="viewPlantInformation(plant)"
          @delete="onProceedDelete(plant.id)"
          @edit="setEditMode(plant)"
          :key="index"
          :name="plant.name"
          :type="plant.type"
          :status="plant.wellnessStateId"
          :state="plant.wellnessStateId"
      />
    </div>
    <div class="add-plant">
      <button
        class=" w-full h-10 bg-[#578257] text-white rounded flex items-center justify-center"
        @click="savePlant"
    >
      <i class="pi pi-plus text-[16px]"></i>
    </button>
    </div>
    
  </div>
</template>

<style>

.plant-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.plants-list {
  flex: 1;
  padding: 1rem;
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: thin; 
  scrollbar-color: #9CA3AF transparent; 
}

.plants-list::-webkit-scrollbar {
  width: 6px;
}

.plants-list::-webkit-scrollbar-track {
  background: transparent; 
  border-radius: 8px;
}

.title {
  padding: 1rem 1rem 0 1rem;

}
.add-plant {
  padding: 1rem;
}

</style>
