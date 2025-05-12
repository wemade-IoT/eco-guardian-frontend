<template>
  <div class="w-full h-full p-3 rounded-lg border-1 border-secondary">
    <h2 class="text-2xl font-semibold mb-4">Related Consultings</h2>
    <div class="flex flex-col gap-4">
      <div v-for="(question, index) in questions.slice(0, 3)" :key="index" class="bg-[#d6e899] p-3 rounded-lg flex flex-col justify-between">
        <div class="flex flex-row justify-between items-center">
          <h3 class="text-lg font-bold">{{ question.title }}</h3>
          <button class="px-2 py-1.5 hover:bg-gray-400 transition-all cursor-pointer rounded-full">
            <i class="pi pi-external-link"></i>
          </button>
        </div>
        <p class="text-sm">{{ question.description }}</p>
        <div class="flex items-center gap-2 mt-2">
          <span class="text-sm font-medium">Status</span>
          <span class="w-2 h-2 bg-gray-800 rounded-full"></span>
          <span class="text-sm font-semibold">{{ question.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const questions = [
  { title: "Question #812", description: "How can I improve the growth of my indoor plants with limited sunlight?", status: "Resolved" },
  { title: "Question #813", description: "What is the best fertilizer for succulents?", status: "Pending" },
  { title: "Question #814", description: "How often should I water my cactus?", status: "Pending" },
  { title: "Question #815", description: "What are the signs of overwatering in plants?", status: "Resolved" },
  { title: "Question #816", description: "How do I get rid of pests on my plants naturally?", status: "Pending" }
];
</script>

<style scoped>
</style>