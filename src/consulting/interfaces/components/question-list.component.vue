<template>
  <div class="question-list-container">
    <h2 class="text-xl font-semibold p-4">{{ title }}</h2>
    <div class="wrapper">
        <div class="list-container">
            <div v-if="questions.length === 0" class="empty-state">
                <p>No questions yet. Start by creating your first question!</p>
            </div>
            <div v-else>                <question-card
                    v-for="question in questions"
                    :key="question.id"
                    :question="question"
                    @click="handleQuestionClick"
                />
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import type { Question } from '../../domain/model/question.entity';
import QuestionCard from './question-card.component.vue';


const emit = defineEmits<{
  questionClick: [question: Question];
}>();

const props = defineProps<{
  questions: Question[];
  title: string;
}>();

const handleQuestionClick = (question: Question) => {
  emit('questionClick', question);
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
}

.wrapper {
    flex: 1;
    min-height: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.list-container {
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
</style>