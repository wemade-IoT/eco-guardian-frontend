<script setup lang="ts">
import QuestionCard from './question-card.component.vue';

const questions = [
  { id: 1, description: 'What is the optimal temperature for wheat growth?', status: 'Pending', resolved: false },
  { id: 2, description: 'How much water is required for rice cultivation?', status: 'Resolved', resolved: true },
  { id: 3, description: 'What is the best fertilizer for corn?', status: 'Pending', resolved: false },
];
</script>

<template>
  <div class="question-list bg-[#EEECE5] p-4 rounded">
    <h2 class="text-[24px] font-semibold mb-4">Question Pool</h2>
    <div class="flex flex-col gap-4">
      <question-card
        v-for="(question, index) in questions"
        :key="index"
        :id="question.id"
        :description="question.description"
        :status="question.status"
        :resolved="question.resolved"
      />
    </div>
  </div>
</template>

<style scoped></style>
