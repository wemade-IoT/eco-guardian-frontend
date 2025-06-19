<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import {DatePicker} from "primevue";

const props = defineProps<{ modelValue: Date|null }>();
const emit = defineEmits(['update:modelValue']);

const date = ref(props.modelValue ?? null);
const today = new Date();

watch(date, (val) => {
  emit('update:modelValue', val);
});
watch(() => props.modelValue, (val) => {
  date.value = val;
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center py-4">
    <div class="w-full">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
          <i class="pi pi-calendar text-emerald-600" style="font-size: 24px;"></i>
        </div>
        <h1 class="text-4xl font-bold text-gray-800 mb-3">
          Schedule Your Installation
        </h1>
        <p class="text- text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Choose the perfect date for our specialists to install your smart garden system. 
          We'll handle everything while you relax.
        </p>
      </div>

      <!-- Main Card -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div class="bg-gradient-to-r from-emerald-500 to-emerald-400 px-8 py-6">
          <div class="flex items-center justify-between text-white">
            <div>
              <h2 class="text-xl font-semibold mb-1">Select Installation Date</h2>
              <p class="text-emerald-100 text-base">Available dates are highlighted below</p>
            </div>
            <div class="hidden sm:flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <i class="pi pi-clock text-lg"></i>
              <span class="text-sm font-medium">9:00 AM - 5:00 PM</span>
            </div>
          </div>
        </div>

        <!-- Calendar Section -->
        <div class="p-8">
          <div class="flex flex-col lg:flex-row gap-8">
            <!-- Calendar -->
            <div class="flex-1">
              <DatePicker
                v-model="date"
                inline
                :numberOfMonths="2"
                class="w-full custom-calendar"
                :minDate="today"
                :showButtonBar="false"
              />
            </div>

            <!-- Side Information -->
            <div class="w-80 space-y-6">
              <!-- Selected Date Info -->
              <div v-if="date" class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="min-w-12 min-h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center">
                    <i class="pi pi-calendar text-white" style="font-size: 20px;"></i>
                  </div>
                  <div>
                    <h3 class="font-semibold text-blue-800">Date Selected</h3>
                    <p class="text-sm text-blue-600">Ready for scheduling</p>
                  </div>
                </div>
                <div class="space-y-2">
                  <p class="text-lg font-semibold text-blue-800">
                    {{ date.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) }}
                  </p>
                  <p class="text-sm text-blue-600">Available: 9:00 AM - 5:00 PM</p>
                </div>
              </div>

              <!-- Date Selection Helper -->
              <div v-else class="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="min-w-12 min-h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <i class="pi pi-calendar text-gray-500 text-lg"></i>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-700">Select a Date</h3>
                    <p class="text-sm text-gray-500">Choose your preferred installation date</p>
                  </div>
                </div>
                <p class="text-sm text-gray-600">
                  Click on any available date to proceed with scheduling your installation.
                </p>
              </div>

              <!-- What to Expect -->
              <div class="bg-gray-50 rounded-xl p-6">
                <h3 class="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <i class="pi pi-info-circle text-emerald-500"></i>
                  What to Expect
                </h3>
                <ul class="space-y-3 text-sm text-gray-600">
                  <li class="flex items-start gap-3">
                    <i class="pi pi-check-circle text-emerald-500 mt-0.5 text-xs"></i>
                    <span>Professional setup and configuration</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <i class="pi pi-check-circle text-emerald-500 mt-0.5 text-xs"></i>
                    <span>Complete system testing</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <i class="pi pi-check-circle text-emerald-500 mt-0.5 text-xs"></i>
                    <span>Basic training and support</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <i class="pi pi-check-circle text-emerald-500 mt-0.5 text-xs"></i>
                    <span>2-4 hours installation time</span>
                  </li>
                </ul>
              </div>

              <!-- Contact Info -->
              <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h3 class="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                  <i class="pi pi-phone text-emerald-600"></i>
                  Need Help?
                </h3>
                <p class="text-sm text-emerald-700 mb-3">
                  Have questions about installation? Our support team is here to help.
                </p>
                <button class="text-emerald-600 hover:text-emerald-800 text-sm font-medium underline">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Info -->
        <div class="bg-emerald-50 px-8 py-6 border-t border-emerald-100">
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <div class="text-sm text-emerald-700 flex items-center gap-2">
              <i class="pi pi-shield-check text-emerald-600"></i>
              Free rescheduling up to 24 hours before installation
            </div>
            -
            <div class="text-sm text-emerald-700 flex items-center gap-2">
              <i class="pi pi-calendar-check text-emerald-600"></i>
              Professional installation guaranteed
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.custom-calendar .p-datepicker-panel) {
  border: none;
  box-shadow: none;
  background: transparent;
  gap: 2rem;
}

:deep(.custom-calendar .p-datepicker-header) {
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  border: 1px solid #d1fae5;
  border-radius: 12px;
  margin-bottom: 1rem;
  padding: 1rem;
}

:deep(.custom-calendar .p-datepicker-title) {
  font-weight: 600;
  color: #064e3b;
  font-size: 1.1rem;
}

:deep(.custom-calendar .p-datepicker-prev-button),
:deep(.custom-calendar .p-datepicker-next-button) {
  background: linear-gradient(135deg, #10b981, #059669);
  border: none;
  color: white;
  width: 2.5rem;
  height: 2.5rem;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
}

:deep(.custom-calendar .p-datepicker-prev-button:hover),
:deep(.custom-calendar .p-datepicker-next-button:hover) {
  background: linear-gradient(135deg, #059669, #047857);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
}

:deep(.custom-calendar .p-datepicker-calendar) {
  border: 1px solid #d1fae5;
  border-radius: 12px;
  overflow: hidden;
  background: #fafffe;
}

:deep(.custom-calendar .p-datepicker-calendar td) {
  padding: 0.5rem;
}

:deep(.custom-calendar .p-datepicker-calendar td > span) {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s;
  font-weight: 500;
  
}

:deep(.custom-calendar .p-datepicker-calendar td > span:hover) {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  color: #064e3b;
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
}

:deep(.custom-calendar .p-datepicker-calendar td.p-datepicker-today > span) {
  background: linear-gradient(135deg, #fef3c7, #fed7aa);
  color: #92400e;
  font-weight: 600;
  border: 2px solid #f59e0b;
}

/* Día seleccionado con verde más suave */
:deep(.custom-calendar .p-datepicker-calendar td.p-highlight > span) {
  background: linear-gradient(135deg, #6ee7b7, #34d399);
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(52, 211, 153, 0.3);
  transform: scale(1.1);
}

:deep(.custom-calendar .p-datepicker-weekheader) {
  background: linear-gradient(135deg, #ecfdf5, #d1fae5);
  font-weight: 600;
  color: #065f46;
  padding: 0.75rem 0.5rem;
}

:deep(.custom-calendar .p-disabled > span) {
  color: #d1d5db !important;
  background: #f9fafb !important;
  cursor: not-allowed !important;
}


:deep(.custom-calendar .p-datepicker-calendar) {
  border: 1px solid #d1fae5;
  border-radius: 12px;
  overflow: hidden;
  background: #fafffe;
  padding: 0 !important;
  margin: 0 !important;
}

/* Espaciado entre calendarios */
:deep(.custom-calendar .p-datepicker-multiple-month) {
  display: flex;
  gap: 2rem;
}

/* Si sigues teniendo problemas, usa esto para forzar */
:deep(.custom-calendar .p-datepicker-calendar table) {
  margin: 0 !important;
  padding: 0 !important;
}
</style>