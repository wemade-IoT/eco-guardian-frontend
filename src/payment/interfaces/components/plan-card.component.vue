<template>
  <article :class="[
    'relative border-1 border-primary/70 rounded-xl py-8 px-7 flex flex-col items-center shadow-sm',
    isSelected ? 'animate-pulse bg-secondary/25' : 'bg-[#f7f4e8]'
  ]">
    <div v-if="plan.isPopular" class="absolute top-2 right-[-25px] rotate-35 bg-red-600 px-4 py-0.5 rounded shadow-lg">
      <span class="font-sans text-xs text-white font-semibold">Most popular</span>
    </div>
    <h2 class="text-2xl font-bold text-primary mb-2">{{ plan.title }}</h2>
    <div class="text-3xl font-bold text-gray-900 font-sans flex flex-row gap-1 items-center">
      ${{ plan.price }} <span class="text-base font-normal text-gray-700 self-end mb-[1px]">/month</span>
    </div>
    <p class="text-gray-500 mt-5 mb-4 text-center text-pretty">
      {{ plan.description }}
    </p>
    <ul class="flex-1 text-gray-700 text-start mb-6 text-sm flex flex-col w-full gap-2">
      <li v-for="(feature, idx) in plan.features" :key="idx" class="flex flex-row gap-2 items-center">
        <div class="w-1.5 h-1.5 rounded-full bg-primary"></div> {{ feature }}
      </li>
    </ul>
    <button @click.stop="selectPlan" :class="[
      'mt-1 w-full font-semibold py-2 rounded tracking-wide',
      isSelected ? 'bg-green-700 text-white' : 'bg-primary text-white'
    ]">
      {{ isSelected ? 'Plan Selected' : 'Select Plan' }}
    </button>
  </article>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import type { PlanProps } from '../../../public/utils/consts/plans';
import type { PlanType } from '../../../public/utils/types/plan-selected';

const props = defineProps<{ plan: PlanProps, plantSelected?: PlanType | null }>()
const emit = defineEmits<{
  (e: 'select', type: PlanType): void
}>()

const isSelected = computed(() => props.plantSelected === props.plan.type)

function selectPlan() {
  emit('select', props.plan.type)
}
</script>

<style scoped></style>