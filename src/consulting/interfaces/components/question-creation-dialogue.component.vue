<template>
  <div class="question-dialog">
    <h3>New Question</h3>
    
    <!-- Context info simplificado -->
    <div v-if="isPlantSpecificView" class="context-info">
      <span> {{ selectedPlantName }}</span>
    </div>
      <!-- 🔧 CAMBIO: Usar div en lugar de form para evitar comportamiento nativo -->
    <div class="form-wrapper">
      <!-- Formulario compacto -->
      <div class="form-content">
        <!-- Plant selector (solo si es necesario) -->
        <select v-if="!isPlantSpecificView && isEnterprise" v-model="selectedPlantId" required>
          <option value="">Select plant...</option>
          <option v-for="plant in userPlants" :key="plant.id" :value="plant.id">
            {{ plant.name }}
          </option>
        </select>

        <input 
          v-model="questionTitle" 
          placeholder="Question title" 
          required 
          @keydown.enter.prevent="handleFormSubmit"
        />
        
        <textarea
          v-model="questionContent" 
          placeholder="Describe your question..." 
          required
          @keydown.enter.ctrl.prevent="handleFormSubmit"
          @keydown.enter.meta.prevent="handleFormSubmit"
        ></textarea>
        
        <input 
          type="file" 
          @change="handleFileUpload" 
          accept="image/*" 
          multiple 
          placeholder="Add images (optional)"
        />
      </div>
      
      <!-- Actions simplificadas -->
      <div class="actions">
        <button type="button" @click="handleCancel" class="btn-cancel">
          Cancel
        </button>
        <!-- 🔧 CAMBIO: Usar type="button" y @click en lugar de submit -->
        <button type="button" @click="handleFormSubmit" :disabled="!canSubmit" class="btn-submit">
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../../../iam/interfaces/store/auth-store';
import { ConsultingService } from '../../infrastructure/services/consulting.service';

const authStore = useAuthStore();

const handleFormSubmit = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    console.log('🔥 Form submit intercepted - no page reload!');
    
    try {
        await submitQuestion();
        console.log('🔥 Question submission completed successfully');
    } catch (error) {
        console.error('🔥 Error in handleFormSubmit:', error);
    }
};
const route = useRoute();
const consultingService = new ConsultingService();

const props = defineProps({
  selectedPlantId: { type: String, default: null },
  mode: { type: String, default: 'general' }
});

const emit = defineEmits(['question-created', 'cancel']);

// Estado simplificado
const questionTitle = ref('');
const questionContent = ref('');
const questionImages = ref<File[]>([]);
const isSubmitting = ref(false);
const selectedPlantId = ref(props.selectedPlantId || route.params.plantId || '');

// Computed properties
const isEnterprise = computed(() => authStore.user?.role === 'ENTERPRISE');
const isPlantSpecificView = computed(() => !!route.params.plantId || !!props.selectedPlantId);

const canSubmit = computed(() => {
  const hasTitle = questionTitle.value.trim().length > 0;
  const hasContent = questionContent.value.trim().length > 0;
  const hasPlantId = isPlantSpecificView.value || selectedPlantId.value;
  
  return hasTitle && hasContent && hasPlantId && !isSubmitting.value;
});

// Mock data simplificado
const userPlants = ref([
  { id: '1', name: 'Tomato Plant 1' },
  { id: '2', name: 'Lettuce Plant' },
  { id: '3', name: 'Basil Plant' },
  { id: '4', name: 'Pepper Plant' },
]);

const selectedPlantName = computed(() => {
  const plant = userPlants.value.find(p => p.id === selectedPlantId.value);
  return plant ? plant.name : 'Plant';
});

const handleCancel = () => {
  resetForm();
  emit('cancel');
};

// Funciones simplificadas
const submitQuestion = async () => {
  console.log('🔥 submitQuestion started');
  
  if (!canSubmit.value) {
    console.log('🔥 Cannot submit - validation failed');
    return;
  }
  
  isSubmitting.value = true;
  console.log('🔥 Setting isSubmitting to true');
  
  try {
    const questionData = {
      title: questionTitle.value.trim(),
      content: questionContent.value.trim(),
      plant_id: selectedPlantId.value,
      user_id: authStore.user.id,
      diagnostic_images: questionImages.value.map((_, i) => `mock-image-${i}.jpg`),
      created_at: new Date().toISOString(),
      status: 'pending'
    };    console.log('🔥 Creating question:', questionData);
    const result = await consultingService.postQuestion(questionData);
    console.log('Question creation result:', result);
    
    if (result.success) {
      console.log('Question created successfully, resetting form');
      resetForm();
      emit('question-created', result.data);
    } else {
      console.error('🔥 Error returned from service:', result.details);
      // No throw error - just log it
    }
    
  } catch (error) {
    console.error('🔥 Caught error in submitQuestion:', error);
  } finally {
    isSubmitting.value = false;
    console.log('🔥 Setting isSubmitting to false');
  }
};

const resetForm = () => {
  questionTitle.value = '';
  questionContent.value = '';
  questionImages.value = [];
  if (!isPlantSpecificView.value) {
    selectedPlantId.value = '';
  }
};

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    questionImages.value = Array.from(input.files).slice(0, 3);
    if (input.files.length > 3) {
      console.warn(' Max 3 images allowed');
    }
  }
};
</script>

<style scoped>
@import url('../../../style.css');

.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  flex: 1; 
}

.question-dialog {
  background: #f9fafb;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  width: 100%;  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100%;


}

.question-dialog h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 16px 0;
  text-align: start;
}

.context-info {
  background: #f0f9ff;
  border: 1px solid var(--color-secondary);
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 16px;
  text-align: center;
  font-size: 0.875rem;
  color: var(--color-secondary);
  font-weight: 500;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  min-width: 0; /* Permite que flex-children se encojan */  
  flex: 1;
}

.form-content input,
.form-content select,
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

/* Select dropdown arrow */
.form-content select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-right: 40px;
}

/* Responsive */
@media (max-width: 640px) {
  .question-dialog {
    margin: 16px;
    padding: 16px;
  }
  
  .actions {
    flex-direction: column;
  }
  
  .actions button {
    width: 100%;
  }
}
</style>