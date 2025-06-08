<template>
  <div class="flex flex-col md:flex-row min-h-screen">
    <!-- LEFT-SIDE  -->
    <div class="w-full h-screen md:h-auto md:w-1/2 bg-[#FAF5E7] flex flex-col justify-start p-8 md:p-16 relative">
      <!-- Logo -->
      <div class="absolute top-10 left-10">
        <img src="/src/assets/images/logo-ecoguardian.png" alt="EcoGuardian Logo" class="h-16" />
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