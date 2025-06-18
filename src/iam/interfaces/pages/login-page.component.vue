<template>
  <div class="min-h-screen h-screen flex">
    <!-- LEFT SIDE - Form Section -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gradient-to-br from-[#FAF5E7] to-[#F0EBD8]">
      <div class="w-full max-w-md">
        <!-- Logo -->
        <div class="text-center mb-8">
          <img src="/logo.svg" alt="EcoGuardian Logo" class="h-16 mx-auto mb-5" />
          <h1 class="text-2xl lg:text-3xl font-bold text-gray-800 mb-3">Welcome Back</h1>
          <p class="text-gray-600 text-sm lg:text-base">Sign in to your EcoGuardian account</p>
        </div>

        <!-- Form -->
        <form novalidate @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email Field -->
          <div class="flex flex-col">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div class="relative">
              <Input id="email-address" v-model="email" type="email" required :class="[
                'w-full border-1 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary',
                emailError ? '!border-red-500' : 'border-gray-400/60'
              ]" placeholder="maku@email.com" />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <i class="pi pi-envelope text-gray-400 text-sm"></i>
              </div>
            </div>
            <span v-if="emailError" class="text-red-500 font-sans text-sm pt-1">{{ emailError }}</span>
          </div>

          <!-- Password Field -->
          <div class="flex flex-col">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div class="relative">
              <Input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" required
                :class="[
                  'w-full border-1 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary',
                  passwordError ? '!border-red-500' : 'border-gray-400/60'
                ]" placeholder="Enter your password" />
              <button type="button" @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors">
                <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" class="text-sm"></i>
              </button>
            </div>
            <span v-if="passwordError" class="text-red-500 font-sans text-sm pt-1">{{ passwordError }}</span>
          </div>

          <!-- Remember & Forgot Password -->
          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center">
              <input type="checkbox" v-model="rememberMe"
                class="h-4 w-4 text-[#578257] focus:ring-[#578257] border-gray-300 rounded" />
              <span class="ml-2 text-gray-600">Remember me</span>
            </label>
            <router-link to="/forgot-password"
              class="text-[#578257] hover:text-[#4a6b4a] font-medium transition-colors">
              Forgot password?
            </router-link>
          </div>

          <!-- Submit Button -->
          <button type="submit" :disabled="isLoading"
            class="mt-3 w-full py-3 px-4 bg-[#578257] hover:bg-[#4a6b4a] text-white font-medium rounded-lg transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-[#578257] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <span v-if="!isLoading">Sign In</span>
            <div v-else class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              Signing in...
            </div>
          </button>

          <!-- Sign Up Link -->
          <div class="text-center">
            <p class="text-sm text-gray-600">
              Don't have an account?
              <router-link to="/register" class="font-medium text-[#578257] hover:text-[#4a6b4a] transition-colors">
                Create account
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
    
    <!-- RIGHT SIDE - Image Section -->
    <div class="hidden lg:block lg:w-1/2 relative select-none">
      <div class="absolute inset-0 bg-gradient-to-br from-[#578257]/20 to-transparent z-10"></div>
      <img src="/src/assets/images/bg-ecoguardian-alpha.jpeg" alt="EcoGuardian Background"
        class="w-full h-full object-cover" />
    </div>
  </div>

  <!-- Loading Spinner -->
  <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
    <ProgressSpinner style="width: 50px; height: 50px; color: #578257;" strokeWidth="5" fill="transparent"
      animationDuration=".5s" aria-label="Custom ProgressSpinner" />
  </div>
</template>

<script setup lang="ts">
import Input from 'primevue/inputtext'
import ProgressSpinner from 'primevue/progressspinner'
import { useField, useForm } from 'vee-validate';
import signInSchema from '../../../public/schemas/sign-in-schema';
import { ref } from 'vue';
import CustomDialog from '../../../shared/components/ui/custom-dialog.component.vue';
import { createModal } from '../../../public/utils/helpers/create-modal';
import { useDialog } from "primevue";
import { useToast } from "primevue/usetoast";
import { useAuthStore } from '../store/auth-store';
import { useRouter } from 'vue-router';

const dialog = useDialog();
const toast = useToast();
const authStore = useAuthStore();
const router = useRouter();
const showPassword = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const rememberMe = ref<boolean>(false);

const { errors } = useForm({
  validationSchema: signInSchema,
  initialValues: {
    email: '',
    password: '',
  }
})

const { value: email, errorMessage: emailError } = useField<string>('email');
const { value: password, errorMessage: passwordError } = useField<string>('password');

const handleLogin = async () => {

  if (!email.value || !password.value) {
    createModal(
      dialog,
      CustomDialog,
      {
        title: 'Missing Fields',
        subtitle: 'Please fill in all required fields.',
        type: 'error',
        severity: 'danger',
      }
    );
    return;
  }

  if (errors.value.email || errors.value.password) {
    createModal(
      dialog,
      CustomDialog,
      {
        title: 'Validation Error',
        subtitle: 'Please correct the errors before proceeding.',
        type: 'error',
        severity: 'danger',
      }
    );
    return;
  }

  isLoading.value = true;

  console.log(typeof email.value);

  try {
    await authStore.login(email.value, password.value);
    console.log('Login successful:', { email: email.value, password: password.value, rememberMe: rememberMe.value });
    router.replace("/home");
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Login Failed',
      detail: 'Invalid email or password. Please try again.',
      life: 4000
    });
    console.error('Login failed:', error);
  } finally {
    isLoading.value = false;
  }
}
</script>