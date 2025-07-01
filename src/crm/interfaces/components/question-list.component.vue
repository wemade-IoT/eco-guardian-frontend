<template>
  <div class="question-list-container">
    <h2 class="text-xl font-semibold p-4">{{ title }}</h2>
    <div class="wrapper">
        <div class="list-container">
            <div v-if="questions.length === 0" class="empty-state">
                <p>No questions yet. Start by creating your first question!</p>
            </div>
            <div v-else>
                <div class="sort-controls">
                    <!-- Display sorting buttons -->
                    <span class="sort-label">Sort by:</span>
                    <div class="button-group">
                        <button type="button" @click="sortByDate" :class="['btn', { active: sortType === 'date' }]">Date</Button>
                        <button type="button" @click="sortByStatus" :class="['btn', { active: sortType === 'status' }]">Status</Button>
                        <button type="button" @click="sortByID" :class="['btn', { active: sortType === 'id' }]">ID</Button>
                    </div>
                </div>
                <question-card
                    v-for="question in displayedQuestions"
                    :key="question.id"
                    :question="question"
                    :is-specialist="isSpecialist"
                    @click="handleQuestionClick"
                    @expert-response="handleResponse"

                />
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, watch } from 'vue';
import type { Question } from '../../../crm/domain/model/question.entity';
import QuestionCard from './question-card.component.vue';

import { ref } from 'vue';



const props = defineProps<{
  questions: Question[];
  title: string;
  isSpecialist?: boolean; // Optional prop to indicate if the user is a specialist
}>();

let displayedQuestions = ref<Question[]>([]);
const sortType = ref<'date' | 'status' | 'id' | 'none'>('none');

watch(() => props.questions, (newQuestions) => {
  displayedQuestions.value = [...newQuestions];
  if (sortType.value !== 'none') {
    applySorting();
  }

}, { immediate: true, deep: true });



const sortByDate = () => {
    sortType.value = 'date';
  displayedQuestions.value = props.questions.slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
};

const sortByID = () => {
    sortType.value = 'id';
  displayedQuestions.value = props.questions.slice().sort((a, b) => a.id - b.id);
};

const sortByStatus = () => {
  sortType.value = 'status';
  
  const statusOrder = {
    PENDING: 1,    // ← Cambié de 2 a 1 (más lógico: pendientes primero)
    RESOLVED: 2,   // ← Cambié de 1 a 2 (resueltas en el medio)
    CLOSED: 3      // ← Mantuve 3 (cerradas al final)
  };  
  displayedQuestions.value = props.questions.slice().sort((a, b) => {
    const statusA = a.status.toUpperCase();
    const statusB = b.status.toUpperCase();
    
    const orderA = statusOrder[statusA as keyof typeof statusOrder] || 999;
    const orderB = statusOrder[statusB as keyof typeof statusOrder] || 999;
    
    if (orderA === orderB) {
      return a.id - b.id;
    }
    return orderA - orderB;
  });
  };


const applySorting = () => {
  switch (sortType.value) {
    case 'date':
      sortByDate();
      break;
    case 'status':
      sortByStatus();
      break;
    case 'id':
      sortByID();
      break;
  }
};

const emit = defineEmits<{
  questionClick: [question: Question];
  expertResponse: [questionId: number, response: string];

}>();

const handleQuestionClick = (question: Question) => {
  emit('questionClick', question);
};

const handleResponse = (id: number, answer: string ) => {
  emit('expertResponse', id, answer);
};
</script>

<style scoped>
@import url('../../../style.css');

.question-list-container {
    padding-bottom: 1rem;
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    background: #f9fafb;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex: 1;
}

.wrapper {
    flex: 1;
    min-height: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.list-container {
    width: 100%;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding: 0 1rem 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    scrollbar-width: thin;
    scrollbar-color: rgba(156, 163, 175, 0.4) transparent;
}

.list-container::-webkit-scrollbar {
    width: 6px;
}

.list-container::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 3px;
}

.list-container::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.5);
    border-radius: 3px;
    transition: background-color 0.2s ease;
}

.empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    text-align: center;
    color: #6b7280;
    font-style: italic;
}

.button-group {
  display: flex;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  overflow: hidden;
  justify-content: space-around;
}
.sort-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 8px 0;
  justify-content: flex-end;

}
.sort-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  gap: 8px;
}
.btn {
  padding: 8px 16px;
  border: none;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn.active {
  background: var(--color-primary);
  color: white;
}

.btn:hover:not(.active) {
  background: var(--color-secondary);
}

.btn.active:hover {
  background: var(--color-primary);
}

</style>