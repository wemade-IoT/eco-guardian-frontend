<template>
  <div class="flex flex-col md:flex-row min-h-screen">
    <!-- LEFT-SIDE  -->
    <div class="w-full h-screen md:h-auto md:w-1/2 bg-[#FAF5E7] flex flex-col justify-start p-8 md:p-16 relative">
      <!-- Logo -->
      <div class="absolute top-10 left-10">
        <img src="/src/assets/images/logo-ecoguardian.png" alt="EcoGuardian Logo" class="h-16" />
      </div>

      <!-- FORM -->
      <div class="max-w-md mt-36">
        <h1 class="text-3xl font-bold mb-2">Welcome to<br>EcoGuardian Platform</h1>
        <p class="mb-8 md:mt-0 mt-10">Enter your information</p>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium mb-2">Usuario *</label>
            <input type="email" id="email" v-model="email" class="w-full p-3 rounded bg-white placeholder:text-gray-400"
              placeholder="usuario" required />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium  mb-2 md:mt-0 mt-10">Password *</label>
            <input type="password" id="password" v-model="password"
              class="w-full p-3 rounded bg-white placeholder:text-gray-400" placeholder="password" required />
          </div>
          <div>
            <router-link to="/register" class="block text-xs font-bold md:mb-0 mb-2 md:mt-0 text-center text-[#578257] hover:underline">
              Crear una cuenta
            </router-link>
          </div>
          <div class="pt-4">
            <button type="submit" class="w-full py-3 bg-[#578257] text-white rounded hover:bg-[#4a6b4a]  mt-28">
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- RIGHT SIDE -->
    <div class="hidden md:block w-1/2">
      <!-- BG ECOGUARDIAN -->
      <img src="/src/assets/images/bg-ecoguardian.png" alt="EcoGuardian Background"
        class="w-full h-full object-cover" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../store/auth-store";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value);
    window.alert("¡Inicio de sesión exitoso! Bienvenido a la plataforma.");
    router.push("/home");
  } catch (error) {
    window.alert("Error al iniciar sesión. Verifica tus datos e inténtalo de nuevo.");
    console.error("Login failed:", error);
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