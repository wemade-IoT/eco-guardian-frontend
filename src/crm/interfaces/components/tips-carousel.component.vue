<template>
  <div class="h-full w-full px-4 pt-5 rounded-lg bg-gray-100">
    <div class="header">
          <h2 class="text-xl font-semibold">Recent Questions</h2>
          <button type="button" class="cursor-pointer flex items-center justify-center bg-[#578257] text-white w-8 h-8 rounded-md group
      hover:bg-emerald-200transition-all duration-300 ease-in-out hover:text-white" @click="$router.push('/consulting')">
          <i class="pi pi-plus"></i>
        </button>
    </div>

    <!-- Fallback cuando no hay consultas -->
    <div v-if="!queries || queries.length === 0" class="flex flex-col items-center justify-center py-5 text-center">
      <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
        <i class="pi pi-question-circle text-gray-400" style="font-size: 30px;"></i>
      </div>
      <h3 class="text-lg font-medium text-gray-600 mb-2">No consultings yet</h3>
      <p class="text-sm text-gray-500 max-w-md px-2 leading-relaxed">
        You haven't submitted any consultations yet. Start by asking your first question to get personalized advices.
      </p>
      <button class="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        @click="$router.push('/consulting')">
        Ask Your First Question
      </button>
    </div>

    <!-- Lista de consultas cuando existen -->

    <div v-else class="flex flex-col">
        <question-card
                    v-for="question in displayedQueries" 
                    :key="question.id"
                    :question="question"
                    :is-specialist="false"
                />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { CrmService } from '../../infrastructure/services/crm.service.ts';
import QuestionCard from './question-card.component.vue';
import type { Question } from '../../domain/model/question.entity';
import { useAuthStore } from '../../../iam/interfaces/store/auth-store.ts';

const userId = useAuthStore().id;
const consultingService = new CrmService();

const queries = ref<Question[]>([]);

const displayedQueries = computed(() => {
  return [...queries.value].reverse().slice(0, 2);
});

onMounted(async () => {
  try {
    const response = await consultingService.getQuestionsByUserId(userId);
    queries.value = response;
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
});
</script>

<style>

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

</style>