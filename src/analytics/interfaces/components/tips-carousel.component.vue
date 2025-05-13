<template>
  <div class="w-full h-full p-4 rounded-lg bg-gray-100">
    <h2 class="text-xl font-semibold mb-4">Related Consultings</h2>
    <div class="flex flex-col gap-4">
      <div v-for="(query, index) in queries.slice(0,4)" :key="index" class="bg-white p-3 rounded-lg flex flex-col justify-between">
        <div class="flex flex-row justify-between items-center">
          <h3 class="text-lg font-bold"># {{ query.code }}</h3>
          <button class="px-2 py-1.5 hover:bg-gray-400 transition-all cursor-pointer rounded-full">
            <i class="pi pi-external-link"></i>
          </button>
        </div>
        <p class="text-sm">{{ query.question }}</p>
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
import { ConsultingService } from '../../../consulting/infrastructure/services/consulting.service';

defineProps({
  sliceCount: {
    type: Number,
    required: true,
    default: 4,
  },
});

const consultingService = new ConsultingService();

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

<style scoped>
</style>