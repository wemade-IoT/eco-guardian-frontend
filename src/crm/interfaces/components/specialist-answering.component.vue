<template>

  <div class="container">
  <h2 class="text-xl font-semibold">Question Answer</h2> 
  <!-- Question Selector -->

  
  <form class="form-content" @submit.prevent.stop="handleFormSubmit">
        <!-- Answer Input -->
        <FloatLabel variant="on" class="w-full">
              <Textarea 
                :disabled="!props.question || props.question.status !== 'pending'"
                id="expert_response"  
                v-model="Answer"
                rows="4" 
                class="w-full resize-none" 
                :maxlength="500"
              />
              <label v-if="props.question?.status === 'resolved'" for="expert_response">Answer was submitted...</label>
              <label v-else for="expert_response">Provide detailed solution...</label>
            </FloatLabel>
            
            <div class="character-count">
              {{ Answer?.length || 0 }}/500 characters
            </div>
            

          </form>
          <div class="actions">
          <button type="button" @click="handleCancel" class="btn-cancel">
            Cancel
          </button>
          <button type="submit"
          :disabled="!canSubmit" class="btn-submit" @click="handleFormSubmit">
            Create
          </button>
        </div>

  </div>
</template>

<script setup lang="ts">
//We will replace the dialog in question card to have it here in the case of specialists
//so when the user presses the question card or selects a question, it will be displayed here
import { ref, defineEmits, defineProps, computed, watch } from 'vue';
import type { Question } from '../../domain/model/question.entity';
import {Textarea} from 'primevue';
import {FloatLabel} from 'primevue';

const emit = defineEmits<{
  'expert-response': [payload: { questionId: number; answer: string }];
}>();

const Answer = ref('');
const selectedQuestion = ref<Question | null>(null);

const props = defineProps<{
  question: Question | undefined;
}>();

// Usar watch para reaccionar a cambios en la prop
watch(() => props.question, (newQuestion) => {
  selectedQuestion.value = newQuestion || null;
  // Resetear la respuesta cuando cambia la pregunta
  if (newQuestion) {
    Answer.value = '';
  }
}, { immediate: true }); // immediate: true hace que se ejecute inmediatamente al montar el componente

// Computed para validar si se puede enviar
const canSubmit = computed(() => {
  if (!selectedQuestion.value) return false;
  return selectedQuestion.value.id !== null && 
         Answer.value.trim().length > 20 && selectedQuestion.value.status === 'pending';
});



const handleFormSubmit = () => {

  if (!canSubmit.value || selectedQuestion.value?.id == null || !Answer.value ) return;

  //emit data and id
  emit('expert-response',  { questionId: selectedQuestion.value.id, answer: Answer.value.trim() });
  // Reset form
  resetForm();
};


const handleCancel = () => {
  resetForm();
};

const resetForm = () => {
  Answer.value = '';
};




</script>

<style>

.container{
  padding: 1rem;
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    background: #f9fafb;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex: 2;
    gap: 1rem;
}

.character-count {
  font-size: 0.75rem;
  color: #6b7280;
  text-align: right;
  margin-top: -0.5rem;
}


.form-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0; /* Permite que flex-children se encojan */  
  flex: 1;  
}



.form-content input,
.selector,
.form-content textarea {
  padding: 10px 14px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.3s ease;
  background: #fafafa;
}

.form-content input:focus,
.form-content select:focus,
.form-content textarea:focus {
  outline: none;
  border-color: var(--color-secondary);
  background: #ffffff;
}

.form-content textarea {
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  resize: none; 
  flex: 1; 
}

.form-content input[type="file"] {
  padding: 8px 12px;
  background: #f9fafb;
  border: 2px dashed #d1d5db;
  cursor: pointer;
  font-size: 0.8rem;
}

.form-content input[type="file"]:hover {
  border-color: var(--color-secondary);
  background: #eff6ff;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.actions button {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel {
  background: #f3f4f6;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.btn-cancel:hover {
  background: #e5e7eb;
  color: #374151;
}

.btn-submit {
  background: var(--color-primary);
  color: white;
}

.btn-submit:hover:not(:disabled) {
  background: var(--color-primary);
  transform: translateY(-1px);
}

.btn-submit:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.form-content select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-right: 40px;
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

  

</style>