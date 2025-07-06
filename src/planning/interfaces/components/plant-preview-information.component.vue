<template>
  <Dialog 
    v-model:visible="isVisible" 
    :modal="true"
    :closable="true"
    :dismissableMask="true"
    :showHeader="false"
    :style="{ width: '90vw', maxWidth: '500px', maxHeight: '90vh' }"
    :contentStyle="{ padding: '0', maxHeight: '85vh', overflowY: 'auto' }"
  >
    <div class="plant-preview-content">

      <!-- Plant Image and Basic Info -->
      <div class="plant-header">
        <div class="plant-image-container">
          <img 
            v-if="plantData.image"
            :src="createObjectURL(plantData.image as File)" 
            alt="Plant image"
            class="plant-image"
          />
          <div v-else class="placeholder-image">
            <i class="pi pi-image"></i>
          </div>
        </div>
        <div class="plant-info">
          <h3 class="plant-name">{{ plantData.name }}</h3>
          <div class="plant-type">
            <i class="pi pi-bookmark"></i>
            <span>{{ plantData.type }}</span>
          </div>
          <div class="plant-category">
            <div class="category-indicator" :class="{ 'plantation': plantData.isPlantation }"></div>
            <span>{{ plantData.isPlantation ? 'Plantation' : 'Plant' }}</span>
          </div>
        </div>
      </div>

      <!-- Wellness Status -->
      <div class="info-section">
        <div class="section-header">
          <i class="pi pi-heart"></i>
          <span>Wellness Status</span>
        </div>
        <div class="wellness-status">
          <div class="status-indicator" :class="getWellnessClass(plantData.wellnessStateId)"></div>
          <span class="status-text">{{ getWellnessText(plantData.wellnessStateId) }}</span>
        </div>
      </div>

      <!-- Thresholds -->
      <div class="info-section">
        <div class="section-header">
          <i class="pi pi-cog"></i>
          <span>Thresholds</span>
        </div>
        <div class="thresholds-grid">
          <div class="threshold-item">
            <div class="threshold-icon water">
              <i class="pi pi-filter"></i>
            </div>
            <div class="threshold-info">
              <span class="threshold-label">Water</span>
              <span class="threshold-value">{{ plantData.waterThreshold }}%</span>
            </div>
          </div>
          
          <div class="threshold-item">
            <div class="threshold-icon light">
              <i class="pi pi-sun"></i>
            </div>
            <div class="threshold-info">
              <span class="threshold-label">Light</span>
              <span class="threshold-value">{{ plantData.lightThreshold }}%</span>
            </div>
          </div>
          
          <div class="threshold-item">
            <div class="threshold-icon temperature">
              <i class="pi pi-circle"></i>
            </div>
            <div class="threshold-info">
              <span class="threshold-label">Temperature</span>
              <span class="threshold-value">{{ plantData.temperatureThreshold }}°C</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Area Coverage (only for plantations) -->
      <div v-if="plantData.isPlantation" class="info-section">
        <div class="section-header">
          <i class="pi pi-map"></i>
          <span>Area Coverage</span>
        </div>
        <div class="area-coverage">
          <span class="area-value">{{ plantData.areaCoverage }}</span>
          <span class="area-unit">m²</span>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import Dialog from 'primevue/dialog';
import { createObjectURL } from '../../../public/utils/helpers/plant';

interface PlantResponse {
  id: number;
  name: string;
  type: string;
  waterThreshold: number;
  lightThreshold: number;
  temperatureThreshold: number;
  areaCoverage: number;
  userId: number;
  isPlantation: boolean;
  wellnessStateId: number;
  image?: File | string;
}

const props = defineProps<{
  plantData: PlantResponse;
  visible: boolean;
}>();

const emit = defineEmits<{
  'update:visible': [value: boolean];
}>();

const isVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
});

/* const dialogTitle = computed(() => {
  return props.plantData.isPlantation ? 'Plantation Preview' : 'Plant Preview';
}); */

// Helper function to get wellness status class
function getWellnessClass(stateId: number): string {
  switch (stateId) {
    case 1: return 'healthy';
    case 2: return 'unhealthy';
    case 3: return 'warning';
    default: return 'unknown';
  }
}

// Helper function to get wellness status text
function getWellnessText(stateId: number): string {
  switch (stateId) {
    case 1: return 'Healthy';
    case 2: return 'Unhealthy';
    case 3: return 'Warning';
    default: return 'Unknown';
  }
}
</script>

<style scoped>
.plant-preview-content {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
}

/* Custom Header */
.custom-header {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.dialog-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  color: white;
}

.dialog-subtitle {
  font-size: 0.875rem;
  margin: 0;
  opacity: 0.9;
}

.close-button {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

/* Plant Header */
.plant-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
}

.plant-image-container {
  flex-shrink: 0;
}

.plant-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.placeholder-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #e5e7eb;
  font-size: 2rem;
  color: #9ca3af;
}

.plant-info {
  flex: 1;
}

.plant-name {
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  color: #1f2937;
}

.plant-type {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.plant-type i {
  color: #059669;
}

.plant-category {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.category-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
}

.category-indicator.plantation {
  background: #f59e0b;
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
}

/* Info Sections */
.info-section {
  padding: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
}

.info-section:last-child {
  border-bottom: none;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

.section-header i {
  color: #059669;
  font-size: 1.25rem;
}

/* Wellness Status */
.wellness-status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f9fafb, #f3f4f6);
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  animation: pulse 2s infinite;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

.status-indicator.healthy {
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
}

.status-indicator.unhealthy {
  background: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}

.status-indicator.warning {
  background: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
}

.status-indicator.unknown {
  background: #6b7280;
  box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.2);
}

.status-text {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

/* Thresholds */
.thresholds-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.threshold-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.threshold-item:hover {
  border-color: #059669;
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.1);
  transform: translateY(-2px);
}

.threshold-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.125rem;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.threshold-icon.water {
  background: linear-gradient(135deg, #3b82f6, #1e40af);
}

.threshold-icon.light {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.threshold-icon.temperature {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.threshold-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.threshold-label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.threshold-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
}

/* Area Coverage */
.area-coverage {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  border-radius: 8px;
  border: 1px solid #bbf7d0;
  box-shadow: 0 2px 8px rgba(5, 150, 105, 0.1);
}

.area-value {
  font-size: 2rem;
  font-weight: 800;
  color: #166534;
}

.area-unit {
  font-size: 1rem;
  color: #15803d;
  font-weight: 600;
}

/* Animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .custom-header {
    padding: 1rem;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .plant-header {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }
  
  .plant-image, .placeholder-image {
    width: 100px;
    height: 100px;
  }
  
  .info-section {
    padding: 1rem;
  }
  
  .thresholds-grid {
    gap: 0.75rem;
  }
}
</style>