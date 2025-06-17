<template>
   <div class="question-card" @click="handleClick">
        <div class="flex flex-row justify-between items-center">
            <h3 class="text-lg font-bold">{{ displayQuestion.displayTitle }}</h3>
            <span class="status-badge" :class="`status-${question.status.toLowerCase()}`">{{ formatStatus(question.status) }}</span>
        </div>
        <p class="text-sm">{{ question.content }}</p>
        <div class="flex items-center gap-2 mt-2">
            <span class="text-sm font-medium">Created:</span>
            <span class="text-sm">{{ displayQuestion.formattedDate }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import type { Question } from '../../../crm/domain/model/question.entity';
import { QuestionAssemblerService } from '../../infrastructure/services/question-assembler.service';

const emit = defineEmits<{
  click: [question: Question];
}>();

const props = defineProps<{
  question: Question;
}>();

// Transform the question prop to a display model using the assembler service
const displayQuestion = QuestionAssemblerService.toDisplayModel(props.question);


const handleClick = () => {
  emit('click', props.question);
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

</style>