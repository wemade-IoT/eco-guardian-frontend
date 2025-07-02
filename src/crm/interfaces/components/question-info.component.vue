<template>
<div class="question-info">
    <h2 class="text-xl font-semibold">About the Question</h2>
    <div class="question-details">
        <p><strong>#{{ props.question?.id }} - {{ props.question?.title }} </strong> </p>
        <p class="question-text text-xs text-slate-800">{{ props.question?.content }}</p>
        <p><strong>Created At:</strong> {{ plantDate?.formattedDate }}</p>
        <span class="status-badge" :class="`status-${props.question?.status.toLowerCase()}`">{{ props.question?.status}}</span>
    </div>
    <div class="extra-info">
    <div class="plant-details">
        <h3 class="text-lg font-semibold">Plant Details</h3>
        
        <!-- Loading state -->
        <div v-if="loading" class="loading-state">
            <i class="pi pi-spin pi-spinner" style="font-size: 1.5rem"></i>
            <p>Loading plant details...</p>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="error-state">
            <i class="pi pi-exclamation-triangle text-red-500"></i>
            <p>{{ error }}</p>
        </div>

        <!-- Data state -->
        <div v-else-if="plant" class="data-state">
            <p><strong>Name:</strong> {{ plant.name }}</p>
            <p><strong>Type:</strong> {{ plant.type }}</p>
          </div>
        <!-- Empty state -->
        <div v-else class="empty-state">
            <p>No plant information available</p>
        </div>
    </div>

    <!-- Images found in Question -->
      <div v-if="props.question?.image_urls && props.question.image_urls.length > 0" class="images-section">
        <h4 class="images-title">
          Attached Images 
          <span class="image-counter">({{ props.question.image_urls.length }})</span>
        </h4>
        
        <Carousel 
          :value="props.question.image_urls" 
          :numVisible="1"
          :numScroll="1" 
          :circular="false"
          :showNavigators="false"
          class="custom-carousel"
        >
          <template #item="slotProps">
            <div class="image-wrapper">
              <Image preview>
                <template #image>
                  <img 
                    :src="getImageSrc(slotProps.data)" 
                    :alt="`Question image ${slotProps.index + 1}`"
                    class="thumbnail-image"
                    @error="handleImageError"
                    loading="lazy"
                  />
                </template>
                <template #original="previewProps">
                  <img 
                    :src="getImageSrc(slotProps.data)" 
                    :alt="`Question image ${slotProps.index + 1}`"
                    @error="handleImageError"
                    class="preview-image" 
                    @click="previewProps.previewCallback" 
                  />
                  </template>
              </Image>
            </div>
          </template>
        </Carousel>
      </div>
      <!-- No images state -->
      <div v-else class="no-images-state">
        <p class="text-gray-500 text-sm">No images attached to this question</p>
      </div>
</div>

</div>
</template>

<script setup lang="ts">
import Image from 'primevue/image';
import Carousel from 'primevue/carousel';
import type { Question } from '../../domain/model/question.entity';
import { PlantResponse } from '../../../monitoring/domain/plant-response';
import { ref, watch, defineEmits } from 'vue';
import { PlantService } from '../../../monitoring/infrastructure/services/plant.service';
import { QuestionAssemblerService } from '../../infrastructure/services/question-assembler.service';
const plantService = new PlantService();

const props = defineProps<{
  question: Question | undefined;
}>();

let plantDate = props.question ? QuestionAssemblerService.toDisplayModel(props.question) : null;

const updateDate = (): void => {
  if (props.question) {
    plantDate = QuestionAssemblerService.toDisplayModel(props.question);
  } else {
    plantDate = null;
  }
};

let plant = ref<PlantResponse | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

const emit = defineEmits<{
      'plant-title': [title: string];
    }>();

const getImageSrc = (url: string) => {
  // Verificar si la URL tiene http o https
  if (!url || (!url.startsWith('http://') && !url.startsWith('https://'))) {
    return 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
  }
  return url;
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = '/assets/images/default-image.png'; // Fallback image
};



const fetchPlantDetails = async (plantId: number) => {
  loading.value = true;
  error.value = null;
  
  try {
    const response = await plantService.getPlantById(plantId);
    updateDate();
    if (!response) {
      throw new Error('No data received from plant service');
    }
    
    plant = response.data;
    console.log('Sending Plant Data', plant.type);
    //emit plant title
    emit('plant-title', plant.type || 'Unknown Plant');
    
  } catch (error) {
  } finally {
    loading.value = false;
  }
};



// Watch for changes in the plant_id specifically
watch(() => props.question?.plant_id, (newPlantId) => {
  
  if (newPlantId) {
    fetchPlantDetails(newPlantId);

      
  } else {
    plant.value = null;
  }
}, { immediate: true, deep: true });



</script>

<style>
.question-info {
  padding: 1rem;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
  gap: 1rem;
}

.question-details, .plant-details {
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  flex: 1;
}

.loading-state, .error-state, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: 0.5rem;
  text-align: center;
  color: #6b7280;
}

.error-state {
  color: #ef4444;
}

.data-state {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.status-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
}

.status-pending {
    background-color: #fef3c7;
    color: #f59e0b;
}

.status-resolved {
    background-color: #d1fae5;
    color: #10b981;
}

.status-closed {
    background-color: #fad1d1;
    color: #f4422a;
}

.data-state p {
  padding: 0.5rem;
  border-bottom: 1px solid #f3f4f6;
}

.data-state p:last-child {
  border-bottom: none;
}

.extra-info {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex: 1;
}

.images-section {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background: #fafafa;
  flex: 1;
  overflow: hidden;
}

.image-counter {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: normal;
}

.p-carousel-container {
  padding: 0.5rem 0;
}

.question-text{
  overflow-y: auto;
  max-height: 4rem; /* Ajusta según sea necesario */
}



</style>