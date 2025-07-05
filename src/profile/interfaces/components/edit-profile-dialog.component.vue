<template>
  <Dialog :visible="visible" @update:visible="val => emit('update:visible', val)" modal header="Edit Profile" :style="{ width: '400px' }" @hide="onClose">
    <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <InputText v-model="form.name" class="w-full" required />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
        <InputText v-model="form.lastName" class="w-full" required />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <InputText v-model="form.address" class="w-full" required />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
        <input type="file" accept="image/*" @change="onFileChange" class="w-full" />
        <div v-if="avatarPreview" class="mt-2">
          <img :src="avatarPreview" alt="Avatar Preview" class="w-16 h-16 rounded-full object-cover border" />
        </div>
      </div>
      <div v-if="errorMessage" class="text-red-600 text-sm mb-2">{{ errorMessage }}</div>
      <div class="flex justify-end gap-2 mt-4">
        <Button label="Cancel" type="button" severity="secondary" @click="onClose" />
        <Button label="Save" type="submit" :loading="loading" />
      </div>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { ProfileStore } from '../store/profile-store';

const props = defineProps({
  visible: Boolean,
  profile: Object
});
const emit = defineEmits(['update:visible', 'updated']);

const form = ref({
  name: '',
  lastName: '',
  address: '',
  avatarUrl: ''
});
const loading = ref(false);
const avatarFile = ref<File|null>(null);
const avatarPreview = ref<string|null>(null);
const errorMessage = ref('');

function onClose() {
  emit('update:visible', false);
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0] || null;
  avatarFile.value = file;
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      avatarPreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    avatarPreview.value = null;
  }
}

watch(() => props.profile, (val) => {
  if (val) {
    form.value.name = val.name || '';
    form.value.lastName = val.lastName || '';
    form.value.address = val.address || '';
    form.value.avatarUrl = val.avatarUrl || '';
    avatarPreview.value = val.avatarUrl || null;
    avatarFile.value = null;
  }
}, { immediate: true });

async function onSubmit() {
  loading.value = true;
  errorMessage.value = '';
  try {
    const store = ProfileStore();
    // Send a plain object, not FormData
    await store.updateProfile(props.profile.id, {
      Name: form.value.name,
      LastName: form.value.lastName,
      Address: form.value.address,
      AvatarUrl: avatarFile.value || ''
    });
    emit('updated');
    emit('update:visible', false);
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.errors) {
      const errors = error.response.data.errors;
      errorMessage.value = Object.values(errors).flat().join(' ');
    } else {
      errorMessage.value = 'An unexpected error occurred.';
    }
  } finally {
    loading.value = false;
  }
}
</script>
