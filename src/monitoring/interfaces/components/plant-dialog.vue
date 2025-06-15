<script setup lang="ts">
import {ref, watch} from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

const props = defineProps({
  header: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  visible: {
    type: Boolean,
    required: true,
  },
  formValues: {
    type: Object,
    default: () => ({}),
  },
  isDelete: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['update:visible', 'submit-form', 'delete-plant', 'update:isDelete']);
const isDeleteConfirm = ref(false);

const validator = yup.object({
  name: yup.string().required('Name is required'),
  type: yup.string().required('Type is required'),
  waterThreshold: yup.number().required('Water threshold is required').min(0, 'Must be at least 0').max(100, 'Must be at most 100'),
  lightThreshold: yup.number().required('Light threshold is required').min(0, 'Must be at least 0').max(100, 'Must be at most 100'),
  temperatureThreshold: yup.number().required('Temperature threshold is required').min(-50, 'Must be at least -50').max(50, 'Must be at most 50'),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: validator,
  initialValues: props.formValues,
});

const { value: name, errorMessage: nameError, meta: nameMeta } = useField('name');
const { value: type, errorMessage: typeError, meta: typeMeta } = useField('type');
const { value: waterThreshold, errorMessage: waterThresholdError, meta: waterThresholdMeta } = useField('waterThreshold');
const { value: lightThreshold, errorMessage: lightThresholdError, meta: lightThresholdMeta } = useField('lightThreshold');
const { value: temperatureThreshold, errorMessage: temperatureThresholdError, meta: temperatureThresholdMeta } = useField('temperatureThreshold');

watch(
    () => props.formValues,
    (newValues) => {
      resetForm({ values: newValues });
    },
    { deep: true, immediate: true });

const toggleVisibility = () => {
  emit('update:visible', false);
  isDeleteConfirm.value = false;
  if(props.isDelete){
    emit('update:isDelete', false);
  }
  resetForm();
};

const submitForm = handleSubmit(() => {
  const updatedValues = {
    ...props.formValues,
    name: name.value,
    type: type.value,
    waterThreshold: waterThreshold.value,
    lightThreshold: lightThreshold.value,
    temperatureThreshold: temperatureThreshold.value,
  };
  emit('submit-form', updatedValues);
  resetForm();
});

const handleDelete = () => {
  emit('delete-plant');
  emit('update:isDelete', false);
  isDeleteConfirm.value = true;
};

const cancelDelete = () => {
  emit('update:isDelete', false);
  emit('update:visible', false);
};
</script>

<template>
  <pv-dialog
      :visible="visible"
      @update:visible="(value: boolean) => emit('update:visible', value)"
      modal
      :style="{ width: '25rem', height: 'fit-content' }">

    <div v-if="isDeleteConfirm " class="flex flex-col gap-4">
      <section class="flex flex-col items-center text-center gap-4">
        <h2 class="font-bold text-xl text-black font-bold"> Plant Name ID### Deleted</h2>
        <div class="w-1/2 mx-auto">
          <hr />
        </div>
        <p> The plant and sensors have been deleted from your account</p>
        <div>
          <p class="text-gray-400 text-sm"> In the next bill you may notice the price change</p>
          <div class="w-full mx-auto">
            <hr />
          </div>
        </div>
        <div class="w-full">
          <button class="bg-[#578257] text-white rounded w-full h-10" @click="toggleVisibility">Proceed</button>
        </div>
      </section>
    </div>
    <div v-if="isDelete && !isDeleteConfirm" class="flex flex-col gap-4">
      <section class="flex flex-col items-center text-center gap-4">
        <h2 class="font-bold text-xl text-red-600">Confirm Deletion</h2>
        <p class="text-gray-600">Are you sure you want to delete this plant? This action cannot be undone.</p>
      </section>

      <div class="flex gap-2 justify-center">
        <button
            class="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-colors"
            @click="cancelDelete"
        >
          Cancel
        </button>
        <button
            class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            @click="handleDelete"
        >
          Delete
        </button>
      </div>
    </div>

    <div v-else-if="!isDeleteConfirm && !isDelete" class="flex flex-col gap-4">
      <section class="flex flex-col justify-center text-center gap-2">
        <h2 class="font-bold text-2xl text-black">{{ header }}</h2>
        <div class="w-1/2 mx-auto">
          <hr />
        </div>
        <p>{{ subtitle }}</p>
      </section>

      <div>
        <form @submit.prevent="submitForm" class="flex flex-col gap-4">
          <h2 class="text-black font-bold text-xl">General data</h2>

          <div class="flex flex-col gap-2">
            <label for="name" class="text-sm font-medium">Name</label>
            <input
                id="name"
                v-model="name"
                type="text"
                class="p-2 w-full bg-gray-200 text-[#578257] border-none rounded-lg"
                :class="{ 'border-red-500 border': nameError && nameMeta.touched }"
            />
            <span class="text-red-500 text-sm" v-if="nameError && nameMeta.touched">{{ nameError }}</span>
          </div>

          <div class="flex flex-col gap-2">
            <label for="type" class="text-sm font-medium">Type</label>
            <input
                id="type"
                v-model="type"
                type="text"
                class="p-2 w-full bg-gray-200 text-[#578257] border-none rounded-lg"
                :class="{ 'border-red-500 border': typeError && typeMeta.touched }"
            />
            <span class="text-red-500 text-sm" v-if="typeError && typeMeta.touched">{{ typeError }}</span>
          </div>

          <h2 class="text-black font-bold text-xl">Thresholds</h2>

          <div class="flex flex-col gap-2">
            <label for="waterThreshold" class="text-sm font-medium">Water Threshold (%)</label>
            <input
                id="waterThreshold"
                v-model.number="waterThreshold"
                type="number"
                min="0"
                max="100"
                class="p-2 w-full bg-gray-200 text-[#578257] border-none rounded-lg"
                :class="{ 'border-red-500 border': waterThresholdError && waterThresholdMeta.touched }"
            />
            <span class="text-red-500 text-sm" v-if="waterThresholdError && waterThresholdMeta.touched">{{ waterThresholdError }}</span>
          </div>

          <div class="flex flex-col gap-2">
            <label for="lightThreshold" class="text-sm font-medium">Light Threshold (%)</label>
            <input
                id="lightThreshold"
                v-model.number="lightThreshold"
                type="number"
                min="0"
                max="100"
                class="p-2 w-full bg-gray-200 text-[#578257] border-none rounded-lg"
                :class="{ 'border-red-500 border': lightThresholdError && lightThresholdMeta.touched }"
            />
            <span class="text-red-500 text-sm" v-if="lightThresholdError && lightThresholdMeta.touched">{{ lightThresholdError }}</span>
          </div>

          <div class="flex flex-col gap-2">
            <label for="temperatureThreshold" class="text-sm font-medium">Temperature Threshold (°C)</label>
            <input
                id="temperatureThreshold"
                v-model.number="temperatureThreshold"
                type="number"
                min="-50"
                max="50"
                class="p-2 w-full bg-gray-200 text-[#578257] border-none rounded-lg"
                :class="{ 'border-red-500 border': temperatureThresholdError && temperatureThresholdMeta.touched }"
            />
            <span class="text-red-500 text-sm" v-if="temperatureThresholdError && temperatureThresholdMeta.touched">{{ temperatureThresholdError }}</span>
          </div>
        </form>
      </div>

      <div class="mx-auto w-1/2 grid grid-cols-1 lg:grid-cols-2 gap-2">
        <button class="bg-white text-black rounded w-full h-10" @click="toggleVisibility">Cancel</button>
        <button class="bg-[#578257] text-white rounded w-full h-10" @click="submitForm">Submit</button>
      </div>
    </div>
  </pv-dialog>
</template>

<style scoped>
input:focus {
  outline: none;
  box-shadow: none;
}
</style>