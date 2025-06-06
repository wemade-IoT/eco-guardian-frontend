<script setup lang="ts">
import { ref, reactive } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

interface UserData {
  name: string;
  lastName: string;
  email: string;
  photoUrl: string;
}

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const props = defineProps<{
  visible: boolean;
  userData: UserData;
}>();

const emit = defineEmits(['update:visible', 'save']);

const formData = reactive<UserData>({
  name: '',
  lastName: '',
  email: '',
  photoUrl: ''
});

const errors = reactive({
  name: '',
  lastName: '',
  email: '',
  photoUrl: ''
});


const initFormData = () => {
  formData.name = props.userData?.name || '';
  formData.lastName = props.userData?.lastName || '';
  formData.email = props.userData?.email || '';
  formData.photoUrl = props.userData?.photoUrl || '';


  clearErrors();
};

const clearErrors = () => {
  errors.name = '';
  errors.lastName = '';
  errors.email = '';
  errors.photoUrl = '';
};


const validateForm = (): boolean => {
  let isValid = true;
  clearErrors();

  if (!formData.name.trim()) {
    errors.name = 'Name is required';
    isValid = false;
  } else if (formData.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
    isValid = false;
  }

  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required';
    isValid = false;
  } else if (formData.lastName.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
    isValid = false;
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }

  return isValid;
};


const fileInput = ref<HTMLInputElement | null>(null);
const previewImage = ref<string>('');

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];


    if (!file.type.startsWith('image/')) {
      errors.photoUrl = 'Please select an image file';
      return;
    }


    if (file.size > 5 * 1024 * 1024) {
      errors.photoUrl = 'Image size should not exceed 5MB';
      return;
    }


    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target?.result as string;
      formData.photoUrl = previewImage.value;
    };
    reader.readAsDataURL(file);
  }
};


const saveChanges = () => {
  if (validateForm()) {
    emit('save', { ...formData });
    closeDialog();
  }
};


const closeDialog = () => {
  emit('update:visible', false);
};
</script>

<template>
  <Dialog
    v-model:visible="props.visible"
    modal
    header="Edit Profile Information"
    :style="{ width: '90%', maxWidth: '500px' }"
    :closable="true"
    @show="initFormData"
  >
    <div class="flex flex-col gap-4">

      <div class="flex flex-col items-center mb-4">
        <div
          class="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#A4D39A] mb-2 cursor-pointer"
          @click="triggerFileInput"
        >
          <img
            :src="previewImage || formData.photoUrl || 'https://avatars.githubusercontent.com/u/129230632?v=4'"
            alt="Profile Photo"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <i class="pi pi-camera text-white text-xl"></i>
          </div>
        </div>
        <input
          type="file"
          ref="fileInput"
          class="hidden"
          accept="image/*"
          @change="handleFileChange"
        />
        <small class="text-gray-500">Click to change photo</small>
        <small v-if="errors.photoUrl" class="text-red-500">{{ errors.photoUrl }}</small>
      </div>


      <div class="field">
        <label for="name" class="font-medium text-gray-700 block mb-1">Name</label>
        <InputText
          id="name"
          v-model="formData.name"
          class="w-full p-inputtext-sm"
          :class="{ 'p-invalid': errors.name }"
        />
        <small v-if="errors.name" class="text-red-500">{{ errors.name }}</small>
      </div>


      <div class="field">
        <label for="lastName" class="font-medium text-gray-700 block mb-1">Last Name</label>
        <InputText
          id="lastName"
          v-model="formData.lastName"
          class="w-full p-inputtext-sm"
          :class="{ 'p-invalid': errors.lastName }"
        />
        <small v-if="errors.lastName" class="text-red-500">{{ errors.lastName }}</small>
      </div>


      <div class="field">
        <label for="email" class="font-medium text-gray-700 block mb-1">Email</label>
        <InputText
          id="email"
          v-model="formData.email"
          class="w-full p-inputtext-sm"
          :class="{ 'p-invalid': errors.email }"
        />
        <small v-if="errors.email" class="text-red-500">{{ errors.email }}</small>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-2">
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="closeDialog"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-success"
          @click="saveChanges"
        />
      </div>
    </template>
  </Dialog>
</template>

