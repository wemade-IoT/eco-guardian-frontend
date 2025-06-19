<template>
  <div class="w-full px-4 py-5 rounded-lg bg-gray-100">
    <h2 class="text-xl font-semibold mb-4">Related Consultings</h2>

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
    <div v-else class="flex flex-col gap-4">
      <div v-for="(query, index) in queries.slice(0, 4)" :key="index"
        class="bg-white p-3 rounded-lg flex flex-col justify-between">
        <div class="flex flex-row justify-between items-center">
          <h3 class="text-lg font-bold">#{{ query.id }} - {{ query.title }}</h3>
          <button class="px-2 py-1.5 hover:bg-gray-400 transition-all cursor-pointer rounded-full">
            <i class="pi pi-external-link"></i>
          </button>
        </div>
        <p class="text-sm">{{ query.content }}</p>
        <div class="flex items-center gap-2 mt-2">
          <span class="text-sm font-medium">Status</span>
          <span class="w-2 h-2 bg-gray-800 rounded-full"></span>
          <span class="text-sm font-semibold">{{ query.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CrmService } from '../../infrastructure/services/crm.service.ts';

defineProps({
  sliceCount: {
    type: Number,
    required: true,
    default: 4,
  },
});

const consultingService = new CrmService();

const queries = ref<any[]>([]);

onMounted(async () => {
  try {
    const response = await consultingService.getConsulting();

    queries.value = response;
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
});
</script>

<style scoped></style>