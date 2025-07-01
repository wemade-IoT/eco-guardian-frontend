<template>
   <div class="question-card" @click="handleClick">
        <div class="flex flex-row justify-between items-center">
            <h3 class="question-title text-lg font-bold">{{ displayQuestion.displayTitle }}</h3>
            <span class="status-badge" :class="`status-${question.status.toLowerCase()}`">{{ formatStatus(question.status) }}</span>
        </div>
        <p class="text-sm">{{ question.content }}</p>
        <div class="flex items-center gap-2 mt-2">
            <span class="text-sm font-medium">Created:</span>
            <span class="text-sm">{{ displayQuestion.formattedDate }}</span>
        </div>
    </div>

    <!-- Dialog for displaying question details and expert response -->

    <Dialog 
      v-model:visible="visible" 
      modal 
      :header="displayQuestion.displayTitle" 
      class="question-dialog"
      :dismissableMask="true"
    >
      <!-- Content section -->
      <div class="dialog-content">
          <p class="text-surface-500 dark:text-surface-400 leading-relaxed">
            "{{ question.content }}"
          </p>
            <span class="text-sm text-gray-600">Created: {{ displayQuestion.formattedDate }}</span>

        <div v-if="question.image_urls && question.image_urls.length > 0" class="images-section mb-6">
          <h4 class="images-title">Attached Images</h4>
          
          <div class="images-grid">
            <div v-for="(imageUrl, index) in question.image_urls" :key="index" class="image-wrapper">
              <Image alt="Question Image" preview class="custom-image">
                <template #previewicon>
                  <i class="pi pi-search-plus"></i>
                </template>
                <template #image>
                  <img 
                    :src="getImageSrc(imageUrl)" 
                    :alt="`Question image ${index + 1}`"
                    class="thumbnail-image"
                    @error="handleImageError"
                    loading="lazy"
                  /> 
                </template>
                <template #original="slotProps">
                  <img 
                    :src="getImageSrc(imageUrl)" 
                    :alt="`Question image ${index + 1}`"
                    @error="handleImageError"
                    class="preview-image" 
                    @click="slotProps.previewCallback" 
                  />
                </template>
              </Image>
            </div>
          </div>
        </div>

        <!-- No images state -->
        <div v-else class="no-images-state mb-6">
          <p class="text-gray-500 text-sm">No images attached to this question</p>
        </div>


        

        <div v-if="isSpecialist && question.status === 'pending'" class="images-section">
          <div class="specialist-header mb-4">
            <h4 class="specialist-title">Expert Response</h4>
            <p class="specialist-subtitle">Share your knowledge to help solve this issue</p>
          </div>
          
          <div class="response-form">
            <FloatLabel variant="on" class="w-full">
              <Textarea 
                id="expert_response"  
                v-model="expertResponse"
                rows="4" 
                class="w-full resize-none" 
                :maxlength="500"
              />
              <label for="expert_response">Provide detailed guidance and solution...</label>
            </FloatLabel>
            
            <div class="character-count">
              {{ expertResponse?.length || 0 }}/500 characters
            </div>
            
            <div class="response-actions">
              <Button 
                type="button" 
                label="Cancel" 
                severity="secondary" 
                @click="cancelResponse"
                class="flex-1"
              />
              <Button 
                type="button" 
                label="Submit Response" 
                @click="submitResponse"
                :disabled="!expertResponse || expertResponse.trim().length < 10"
                class="flex-1"
              />
            </div>
          </div>
        </div>
        <div v-else-if="isSpecialist && question.status !== 'Closed'" class="specialist-section">
          <div class="specialist-header mb-4">
            <h4 class="specialist-title">You can still review the issue!</h4>
            <p class="specialist-subtitle">This question already has an answer.</p>
          </div>
          <h2>{{ questionAnswer.answerText }}</h2>
          <p>Created at: {{ questionAnswer.createdAt }}</p>

        </div>
      </div>
    </Dialog>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';
import type { Question } from '../../../crm/domain/model/question.entity';
import { QuestionAssemblerService } from '../../infrastructure/services/question-assembler.service';
import { Button } from 'primevue';
import {Dialog} from 'primevue';
import {Textarea} from 'primevue';
import {FloatLabel} from 'primevue';
import {Image} from 'primevue';
import { CrmService } from '../../infrastructure/services/crm.service';
import type { Ref } from 'vue';

let visible = ref(false);
let expertResponse = ref('');

interface QuestionResponse {
  specialistId: number;
  answerText: string;
  createdAt: string;
}

let questionAnswer: Ref<QuestionResponse> = ref<QuestionResponse>({
  specialistId: 0,
  answerText: '',
  createdAt: ''
});

const emit = defineEmits<{
  click: [question: Question];
  expertResponse: [questionId: number, response: string];
}>();
const props = defineProps<{
  question: Question;
  isSpecialist?: boolean; // Optional prop to indicate if the user is a specialist
}>();

const getImageSrc = (url: string) => {
  // Verificar si la URL tiene http o https
  if (!url || (!url.startsWith('http://') && !url.startsWith('https://'))) {
    return 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
  }
  return url;
};

const handleImageError = (event: Event) => {
  // Fallback adicional si la imagen falla al cargar
  const target = event.target as HTMLImageElement | null;
  if (target) {
    target.src = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
  }
};


// Transform the question prop to a display model using the assembler service
const displayQuestion = QuestionAssemblerService.toDisplayModel(props.question);

const getQuestionAnswer = (questionId: number): QuestionResponse => {
  const consultingService = new CrmService();

  // Default response to return immediately
  const defaultResponse: QuestionResponse = {
    specialistId: 0,
    answerText: 'No answer available at the moment.',
    createdAt: ''
  };

  consultingService.getAnswersByQuestionId(questionId)
    .then((response) => {
      // You may want to update a ref or emit an event here instead of returning
      questionAnswer.value = response;
      questionAnswer.value.createdAt = new Date(response.createdAt).toLocaleString();
    })
    .catch((error) => {
      console.error('Error fetching question answer:', error);
      questionAnswer.value = defaultResponse;
    });

  return defaultResponse;
};

const handleClick = () => {  
  visible.value = true;
  emit('click', props.question);
  if (props.isSpecialist && props.question.status !== 'pending') {
    getQuestionAnswer(props.question.id);
  }

};

// 🔧 AGREGAR: Debug en submitResponse
const submitResponse = () => {
  
  
    emit('expertResponse', props.question.id, expertResponse.value);
    visible.value = false;
    expertResponse.value = '';
  
};

const cancelResponse = () => {
  expertResponse.value = '';
  visible.value = false;
};

const formatStatus = (status: string): string => {
  switch (status) {
    case 'PENDING':
      return 'Pending';
    case 'RESOLVED':
      return 'Resolved';
    case 'CLOSED':
      return 'Closed';
    default:
      return status;
  }
};

</script>

<style scoped>
@import url('../../../style.css');
.question-card {
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
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

.question-card:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    background-color: #f8f9fa;
    transform: translateY(-1px);
    cursor: pointer;
}

.question-card:active {
    transform: translateY(-1px) scale(0.95);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.1s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.question-dialog {
  --dialog-padding: 1.5rem;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 70vh;
  min-width: 40vw;
  overflow-y: auto;
  padding: 0.5rem 0;
}

.question-title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 70%; /* or any width you prefer */
}

.question-info {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid var(--primary-color, #059669);
}

.question-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* 🔧 IMAGES SECTION */
.images-section {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background: #fafafa;
}

.images-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* 🔧 GRID RESPONSIVO */
.images-grid {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}



.image-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.thumbnail-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
  border: 2px solid #e5e7eb;
  transition: border-color 0.2s ease;
}

.thumbnail-image:hover {
  border-color: var(--primary-color, #059669);
}

.preview-image {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
}

/* 🔧 IMAGE DETAILS */
.image-details {
  background: white;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
}

.image-url-summary {
  padding: 0.5rem;
  cursor: pointer;
  font-size: 0.75rem;
  color: #6b7280;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.image-url-summary:hover {
  background: #f3f4f6;
}

.image-url {
  display: block;
  padding: 0.5rem;
  font-family: monospace;
  font-size: 0.7rem;
  color: #4b5563;
  word-break: break-all;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

.no-images-state {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #d1d5db;
}


.specialist-section {
  border-top: 2px solid #e5e7eb;
  padding-top: 1.5rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
}

.specialist-header {
  text-align: center;
}

.specialist-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary-color, #059669);
  margin: 0;
}

.specialist-subtitle {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0.25rem 0 0 0;
}

.response-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.character-count {
  font-size: 0.75rem;
  color: #6b7280;
  text-align: right;
  margin-top: -0.5rem;
}

.response-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

</style>