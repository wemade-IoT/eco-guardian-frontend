<template>
    <div class="plant-info-page-container">
        <div class="plant-list">
            <PlantsListComponent
            @plantSelected="fetchPlantQuestions($event)"
            ></PlantsListComponent>
        </div>
        <div class="plant-info">
            <PlantInformationComponent
                :plant="plantStore.plant"
                v-if="plantStore.plant"
            />
            <div v-else class="no-plant-message">
                <h2 class="text-xl font-semibold">No Plant Selected</h2>
                <p class="empty-state">Select a plant to view its information</p>
            </div>
        </div>
        <!-- Questions For Plant -->
        <div class="questions-section">
            <QuestionListComponent
                :questions="plantQuestions"
                :title="questionsTitle"
                :is-specialist="false"
                @questionClick="handleQuestionClick"
            />
        </div>   
    </div>
</template>

<script lang="ts" setup>
import PlantInformationComponent from '../components/plant-information.component.vue';
import { usePlantStore } from '../stores/plant-store.ts';
import PlantsListComponent from '../components/plants-list.component.vue';
import QuestionListComponent from '../../../crm/interfaces/components/question-list.component.vue';
import { useAuthStore } from '../../../iam/interfaces/store/auth-store.ts';
import { onMounted, ref, watch } from 'vue';
import { CrmService } from '../../../crm/infrastructure/services/crm.service.ts';

const crmService = new CrmService();
const isEnterprise = useAuthStore().isEnterprise;

// Título de las preguntas basado en si es empresa o no
const questionsTitle = ref(''); // if its enterprise, it will be "Questions for Plantation", otherwise "Questions for Plant"
const plantQuestions = ref([]); // Aquí deberías obtener las preguntas relacionadas con la planta seleccion
if (isEnterprise) {
    questionsTitle.value = 'Questions for this Plantation';
} else {
    questionsTitle.value = 'Questions for this Plant';
}
const plantStore = usePlantStore();

// Obtiene las preguntas de la planta seleccionada
const fetchPlantQuestions = async (plantId: number) => {
    let plantID: number;
    // Verifica si hay una planta seleccionada
    if(plantStore.plant){
        plantID = plantStore.plant.id;
    } else {
        plantID = plantId; // Si no hay planta seleccionada, usa el ID pasado como argumento
    } 

        try {
            const questions = await crmService.getQuestionsByPlantId(plantID);
            plantQuestions.value = questions;
        } catch (error) {        
            plantQuestions.value = [];
            console.error('Error fetching plant questions:', error);
        }

};

onMounted(() => {
    // Cargar las preguntas de la planta seleccionada al montar el componente
    if (plantStore.plant && plantStore.plant.id !== undefined) {
        fetchPlantQuestions(plantStore.plant.id);
    }
    return;
});

// Watcher para actualizar las preguntas cuando cambie la planta seleccionada
watch(
    () => plantStore.plant,
    (newPlant) => {
        if (newPlant && newPlant.id !== undefined) {
            fetchPlantQuestions(newPlant.id);
        } else {
            // Si no hay planta seleccionada, limpiar las preguntas
            plantQuestions.value = [];
        }
    },
    { immediate: false } // No ejecutar inmediatamente ya que onMounted ya maneja el caso inicial
);

// Maneja el clic en una pregunta
const handleQuestionClick = (question: any) => {
    // Aquí puedes manejar el clic en una pregunta, por ejemplo, redirigir a una página de detalles
    console.log('Pregunta seleccionada:', question);

};

// Simple y directo - usa directamente los datos del store
// No necesitamos fetch adicional ni estado local redundante
</script>

<style scoped>  

.plant-info{
    flex: 2;
    display:flex;
}

.plant-list{
    flex: 1;
}

.plant-info-page-container {
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 20px;
    height: 100%;
}

.no-plant-message {
    display: flex;
    flex: 1;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: #f8f9fa;
    border-radius: 8px;
    font-size: 16px;
    padding: 1rem;
    flex-direction: column;
}

</style>