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
  <div class="time-slot-picker">
    <div class="header">
      <h2 class="title">Available Time Slots</h2>
      <p class="subtitle">Select your preferred time for the appointment</p>
    </div>
    
    <div class="slots-grid">
      <div
        v-for="(slot, idx) in timeSlots"
        :key="slot"
        class="time-slot-card"
        :class="{ 'selected': selectedSlot === idx }"
        @click="selectSlot(idx)"
      >
        <div class="slot-content">
          <div class="radio-wrapper">
            <input
              type="radio"
              :id="`slot-${idx}`"
              :value="idx"
              v-model="selectedSlot"
              class="radio-input"
            />
            <div class="radio-custom">
              <div class="radio-dot" v-if="selectedSlot === idx"></div>
            </div>
          </div>
          
          <div class="slot-info">
            <span class="slot-time">{{ slot }}</span>
            <span class="slot-status">Available</span>
          </div>
          
          <div class="slot-indicator">
            <svg 
              v-if="selectedSlot === idx" 
              class="check-icon" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.time-slot-picker {
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.header {
  text-align: start;
  margin-bottom: 2rem;
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #426138 0%, #54D12B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: #6b7280;
  font-size: 0.95rem;
  font-weight: 500;
}

.slots-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.time-slot-card {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.time-slot-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: transparent;
  transition: background 0.3s ease;
}

.time-slot-card:hover {
  border-color: #426138;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(66, 97, 56, 0.1), 0 4px 6px -2px rgba(66, 97, 56, 0.05);
}

.time-slot-card.selected {
  border-color: #54D12B;
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
  box-shadow: 0 10px 25px -5px rgba(84, 209, 43, 0.2), 0 4px 6px -2px rgba(84, 209, 43, 0.1);
}

.time-slot-card.selected::before {
  background: linear-gradient(90deg, #54D12B 0%, #426138 100%);
}

.slot-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.radio-wrapper {
  position: relative;
  flex-shrink: 0;
}

.radio-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.radio-custom {
  width: 24px;
  height: 24px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
}

.time-slot-card:hover .radio-custom {
  border-color: #426138;
}

.time-slot-card.selected .radio-custom {
  border-color: #54D12B;
  background: #54D12B;
}

.radio-dot {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  transform: scale(0);
  animation: radioScale 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes radioScale {
  to {
    transform: scale(1);
  }
}

.slot-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.slot-time {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  transition: color 0.3s ease;
}

.time-slot-card.selected .slot-time {
  color: #426138;
}

.slot-status {
  font-size: 0.875rem;
  color: #10b981;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.slot-status::before {
  content: '●';
  font-size: 0.75rem;
}

.slot-indicator {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-icon {
  width: 20px;
  height: 20px;
  color: #54D12B;
  transform: scale(0);
  animation: checkScale 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.1s forwards;
}

@keyframes checkScale {
  to {
    transform: scale(1);
  }
}

/* Responsive design */
@media (max-width: 640px) {
  .time-slot-picker {
    padding: 1rem;
  }
  
  .slots-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .title {
    font-size: 1.5rem;
  }
  
  .slot-content {
    gap: 0.75rem;
  }
  
  .time-slot-card {
    padding: 0.875rem;
  }
}

/* Focus states for accessibility */
.radio-input:focus + .radio-custom {
  outline: 2px solid #54D12B;
  outline-offset: 2px;
}

.time-slot-card:focus-within {
  outline: 2px solid #54D12B;
  outline-offset: 2px;
}
</style>