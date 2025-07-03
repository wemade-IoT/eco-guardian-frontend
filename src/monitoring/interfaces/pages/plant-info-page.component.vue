<template>
    <div class="plant-info-page-container">
        <div class="plant-list">
            <PlantsListComponent></PlantsListComponent>
        </div>
        <div class="plant-info">
            <PlantInformationComponent
                :plant="plantStore.plant"
                v-if="plantStore.plant"
            />
            <div v-else class="no-plant-message">
                <p>Select a plant to view its information</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import PlantInformationComponent from '../components/plant-information.component.vue';
import { usePlantStore } from '../stores/plant-store.ts';
import PlantsListComponent from '../components/plants-list.component.vue';

const plantStore = usePlantStore();

// Simple y directo - usa directamente los datos del store
// No necesitamos fetch adicional ni estado local redundante
</script>

<style scoped>  

.plant-info-page-container {
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 20px;
    height: 100%;
}

.no-plant-message {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    background-color: #f8f9fa;
    border-radius: 8px;
    color: #6c757d;
    font-size: 16px;
}

</style>