<template>
  <aside class="bg-[#ebebeb] min-w-[100px] max-w-[100px] p-3">
    <div class="flex flex-col items-center justify-between h-full">
      <figure class="w-14 h-14 mx-auto">
        <img src="/logo.svg" alt="Logo" class="size-full" />
      </figure>
      <ul class="flex flex-col gap-1">
        <!-- Home -->
        <li class="holder" aria-label="Check your info in he main dashboard" v-if="authStore.role !== 'Specialist'" role="button" @click="$router.push('/home')" :class="[
          'cursor-pointer flex items-center justify-center bg-gray-300/50 w-14 h-14 rounded-md group transition-all duration-300 ease-in-out',
          isActive('/home') ? 'bg-slate-700' : '',
        ]">
          <i class="pi pi-home text-[20px]"
            :class="isActive('/home') ? 'text-slate-50' : 'text-gray-500 group-hover:text-slate-50'"></i>
        </li>
        <!-- Plants -->
        <li class="holder" aria-label="Check your plants or plantation info" v-if="authStore.role !== 'Specialist'" role="button" @click="$router.push('/info-panel')" :class="[
          'cursor-pointer flex items-center justify-center bg-gray-300/50 w-14 h-14 rounded-md group transition-all duration-300 ease-in-out',
          isActive('/info-panel') ? 'bg-slate-700' : '',
        ]">
          <i class="fa-solid fa-seedling text-[16px]"
            :class="isActive('/info-panel') ? 'text-slate-50' : 'text-gray-500 group-hover:text-slate-50'"></i>
        </li>
        <!-- Consulting (Chat) -->
        <li aria-label="ask your questions in consulting" class="holder" role="button" @click="$router.push('/consulting')" :class="[
          'cursor-pointer flex items-center justify-center bg-gray-300/50 w-14 h-14 rounded-md group transition-all duration-300 ease-in-out',
          isActive('/consulting') ? 'bg-slate-700' : '',
        ]">
          <i class="pi pi-comments text-[20px]"
            :class="isActive('/consulting') ? 'text-slate-50' : 'text-gray-500 group-hover:text-slate-50'"></i>
        </li>
        <!-- Profile (Person) -->
        <li class="holder" aria-label="See your profile" role="button" @click="$router.push('/profile')" :class="[
          'cursor-pointer flex items-center justify-center bg-gray-300/50 w-14 h-14 rounded-md group transition-all duration-300 ease-in-out',
          isActive('/profile') ? 'bg-slate-700' : '',
        ]">
          <i class="pi pi-user text-[20px]"
            :class="isActive('/profile') ? 'text-slate-50' : 'text-gray-500 group-hover:text-slate-50'"></i>
        </li>
      </ul>
      <button aria-label="Logout"  class='logout holder cursor-pointer flex items-center justify-center w-12 h-12 bg-slate-700 rounded-md group transition-all duration-300 ease-in-out' @click="authStore.logout()">
            <i class="pi pi-sign-out text-slate-50"></i>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../../iam/interfaces/store/auth-store';
import { useRoute } from 'vue-router';

const authStore = useAuthStore();
const route = useRoute();

function isActive(path: string) {
  return route.path === path;
}
</script>

<style scoped>



.holder:hover{
  scale: 1.03;
}

.logout:hover{
  background-color: #fa4949;
  color: white;
}

</style>