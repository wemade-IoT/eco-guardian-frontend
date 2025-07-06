<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted } from 'vue';
import Dropdown from 'primevue/dropdown';

defineProps({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: Number, required: true },
  state: { type: Number, required: true },
  id: { type: Number, required: true },
});

const emit = defineEmits({
  'edit': () => true,
  'delete': (_id: number) => true,
  'view': () => true,
  'viewCard': () => true,
});

const showDropdown = ref(false);

const toggleDropdown = (event: Event) => {
  event.stopPropagation();
  showDropdown.value = !showDropdown.value;
};

const closeDropdown = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.dropdown-container')) {
    showDropdown.value = false;
  }
};

const editPlant = () => {
  showDropdown.value = false;
  emit('edit');
}

const deletePlant = (id: number) => {
  showDropdown.value = false;
  emit('delete', id);
}

const view = () => {
  showDropdown.value = false;
  emit('view');
}

const viewData = () => {
  emit('viewCard');
};


onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});

// Colores para los estados
const stateColors: Record<number, string> = {
  1: "#4CAF50", // Healthy (verde)
  2: "#FF5252", // Unhealthy (rojo)
  3: "#FFC107", // Warning (amarillo)
};

const statusDescriptions: Record<number, string> = {
  1: "Healthy",
  2: "Unhealthy",
  3: "Warning",
};

</script>

<template>
  <div class="plant-card bg-white p-4 rounded-lg flex flex-col gap-3 border-l-4" @click="viewData" :class="{
    'border-green-500': status === 1,
    'border-red-500': status === 2,
    'border-yellow-500': status === 3,
  }">
    <div class="flex items-center gap-2 card-header">
      <div class="title-plant-card">
        <div class="w-[12px] h-[12px] rounded-full" :style="{ backgroundColor: stateColors[state] }"></div>
        <p class="text-[18px] font-semibold text-gray-800">{{ name }}</p>
      </div>
      
      <!-- Dropdown menu -->
      <div class="flex justify-end relative dropdown-container">
        <!-- Botón de opciones -->
        <button 
          type="button" 
          class="cursor-pointer flex items-center justify-center bg-gray-300/50 w-8 h-8 rounded-md group hover:bg-slate-700 transition-all duration-300 ease-in-out hover:text-white" 
          @click="toggleDropdown"
        >
          <i class="pi pi-ellipsis-h text-sm"></i>
        </button>
        
        <!-- Dropdown menu -->
        <div v-if="showDropdown" class="absolute top-10 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-[150px]">
          <div class="py-1">
            <button 
              type="button"
              class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors duration-200"
              @click.stop="view"
            >
              <i class="pi pi-eye text-blue-500"></i>
              Ver información
            </button>
            <button 
              type="button"
              class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors duration-200"
              @click.stop="editPlant"
            >
              <i class="pi pi-pencil text-green-500"></i>
              Editar
            </button>
            <hr class="border-gray-200">
            <button 
              type="button"
              class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors duration-200"
              @click.stop="() => deletePlant(id)"
            >
              <i class="pi pi-trash text-red-500"></i>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between gap-2">
      <div class="flex justify-start items-center gap-2">
        <p class="text-[14px] font-medium text-gray-600">{{ type }}</p>
        <div class="w-[6px] h-[6px] rounded-full" :style="{ backgroundColor: stateColors[state] }"></div>
        <p class="text-[14px] font-medium" :class="{
          'text-green-500': status === 1,
          'text-red-500': status === 2,
          'text-yellow-500': status === 3,
        }">
        {{ statusDescriptions[status] }}
        </p>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.plant-card {
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  cursor: pointer;
  z-index: 1;
}

.plant-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Cuando el dropdown está abierto, elevar la tarjeta */
.plant-card:has(.dropdown-container .absolute) {
  z-index: 1000;
}

.plant-card:active {
    transform: translateY(-1px) scale(0.95);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.1s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.title-plant-card {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.dropdown-container {
  position: relative;
  z-index: 100;
}

/* Asegurar que el dropdown esté por encima de todo */
.dropdown-container .absolute {
  z-index: 9999 !important;
}
</style>