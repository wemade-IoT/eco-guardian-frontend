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
