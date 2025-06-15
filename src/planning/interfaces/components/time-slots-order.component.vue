<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps<{ modelValue: number }>();
const emit = defineEmits(['update:modelValue']);

const timeSlots = [
  '9:00 am - 10:00 am',
  '10:00 am - 11:00 am',
  '11:00 am - 12:00 pm',
  '12:00 pm - 1:00 pm',
  '1:00 pm - 2:00 pm',
  '2:00 pm - 3:00 pm',
  '3:00 pm - 4:00 pm',
];

const selectedSlot = ref(props.modelValue ?? 0);

function selectSlot(idx: number) {
  selectedSlot.value = idx;
}

watch(selectedSlot, (val) => {
  emit('update:modelValue', val);
});
watch(() => props.modelValue, (val) => {
  selectedSlot.value = val;
});
</script>

<template>
  <div class="w-full flex flex-col gap-3 p-4">
    <h2 class="text-2xl font-bold text-left">Available time slots</h2>
    <div
      v-for="(slot, idx) in timeSlots"
      :key="slot"
      class="time-slot-row flex items-center px-4"
      :class="{ 'selected': selectedSlot === idx }"
      @click="selectSlot(idx)"
    >
      <button
        class="select-btn flex items-center justify-center mr-4"
        :class="{ 'active': selectedSlot === idx }"
        aria-label="Seleccionar horario"
        type="button"
      >
        <span v-if="selectedSlot === idx" class="inner-circle"></span>
      </button>
      <span class="text-base font-medium">{{ slot }}</span>
    </div>
  </div>
</template>

<style scoped>
.time-slot-row {
  width: 100%;
  height: 53px;
  border: 1px solid #426138;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.2s;
  margin-bottom: 8px;
}
.select-btn {
  width: 20px;
  height: 20px;
  border: 2px solid #426138;
  border-radius: 50%;
  background: #fff;
  padding: 0;
  position: relative;
  transition: border-color 0.2s;
}
.select-btn.active {
  border-color: #54D12B;
}
.select-btn.active .inner-circle {
  display: block;
}
.inner-circle {
  display: block;
  width: 7.5px;
  height: 7.5px;
  background: #54D12B;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
