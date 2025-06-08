<template>
  <div class="flex flex-col md:flex-row min-h-screen">
    <!-- LEFT-SIDE  -->
    <div class="w-full h-screen md:h-auto md:w-1/2 bg-[#FAF5E7] flex flex-col justify-start p-8 md:p-16 relative">
      <!-- Logo -->
      <div class="absolute top-10 left-10">
        <img src="/src/assets/images/logo-ecoguardian.png" alt="EcoGuardian Logo" class="h-16" />
      </div>

      <!-- FORMULARIO -->
      <div class="max-w-md mt-36">
        <h1 class="text-3xl font-bold mb-2">Welcome to<br>EcoGuardian Platform</h1>
        <p class="mb-8 md:mt-0 mt-10">Enter your information</p>

        <form @submit.prevent="handleRegister" class="space-y-9">
          <!-- NAME -->
          <div class="flex gap-4">
            <div class="w-1/2">
              <label for="name" class="block text-sm font-medium mb-2">Name *</label>
              <input type="text" id="name" v-model="name" class="w-full p-3 rounded bg-white placeholder:text-gray-400"
                placeholder="name" required />
            </div>
            <div class="w-1/2">
              <label for="lastName" class="block text-sm font-medium mb-2">Last Name *</label>
              <input type="text" id="lastName" v-model="lastName" class="w-full p-3 rounded bg-white placeholder:text-gray-400"
                placeholder="lastname" required />
            </div>
          </div>
          
          <!-- EMAIL -->
          <div>
            <label for="email" class="block text-sm font-medium mb-2">Email *</label>
            <input type="email" id="email" v-model="email" class="w-full p-3 rounded bg-white placeholder:text-gray-400"
              placeholder="email" required />
          </div>
          
          <!-- PASSWORD -->
          <div class="flex gap-4">
            <div class="w-1/2">
              <label for="password" class="block text-sm font-medium mb-2">Password *</label>
              <input type="password" id="password" v-model="password"
                class="w-full p-3 rounded bg-white placeholder:text-gray-400" placeholder="password" required />
            </div>
            <div class="w-1/2">
              <label for="confirmPassword" class="block text-sm font-medium mb-2">Confirm password *</label>
              <input type="password" id="confirmPassword" v-model="confirmPassword"
                class="w-full p-3 rounded bg-white placeholder:text-gray-400" placeholder="confirm password" required />
            </div>
          </div>
          
          <div class="pt-4">
            <button type="submit" class="w-full py-3 bg-[#578257] text-white rounded hover:bg-[#4a6b4a] md:mt-0 mt-16">
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../store/auth-store";
import { useRouter } from "vue-router";

const name = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const router = useRouter();

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Las contraseñas no coinciden");
    return;
  }

  const authStore = useAuthStore();

  try {
    await authStore.register({
      name: name.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value
    });
    router.push("/login");
  } catch (error) {
    console.error("Registration failed:", error);
  }
};
</script>

<style scoped>
@media (max-width: 768px) {
  input,
  button {
    font-size: 16px;
  }
}
</style>