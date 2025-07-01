<template>
  <aside class="bg-[#ebebeb] min-w-[100px] max-w-[100px] p-3">
    <div class="flex flex-col items-center justify-between h-full">
      <figure class="w-14 h-14 mx-auto">
        <img src="/logo.svg" alt="Logo" class="size-full" />
      </figure>
      <ul class="flex flex-col gap-1">
        <!-- Home -->
        <li v-if="authStore.role !== 'Specialist'" role="button" @click="$router.push('/home')" :class="[
          'cursor-pointer flex items-center justify-center bg-gray-300/50 w-14 h-14 rounded-md group transition-all duration-300 ease-in-out',
          isActive('/home') ? 'bg-slate-700' : '',
        ]">
          <i class="pi pi-home text-[20px]"
            :class="isActive('/home') ? 'text-slate-50' : 'text-gray-500 group-hover:text-slate-50'"></i>
        </li>
        <!-- Plants -->
        <li v-if="authStore.role !== 'Specialist'" role="button" @click="$router.push('/info-panel')" :class="[
          'cursor-pointer flex items-center justify-center bg-gray-300/50 w-14 h-14 rounded-md group transition-all duration-300 ease-in-out',
          isActive('/info-panel') ? 'bg-slate-700' : '',
        ]">
          <i class="fa-solid fa-seedling text-[16px]"
            :class="isActive('/info-panel') ? 'text-slate-50' : 'text-gray-500 group-hover:text-slate-50'"></i>
        </li>
        <!-- Consulting (Chat) -->
        <li role="button" @click="$router.push('/consulting')" :class="[
          'cursor-pointer flex items-center justify-center bg-gray-300/50 w-14 h-14 rounded-md group transition-all duration-300 ease-in-out',
          isActive('/consulting') ? 'bg-slate-700' : '',
        ]">
          <i class="pi pi-comments text-[20px]"
            :class="isActive('/consulting') ? 'text-slate-50' : 'text-gray-500 group-hover:text-slate-50'"></i>
        </li>
        <!-- Profile (Person) -->
        <li role="button" @click="$router.push('/profile')" :class="[
          'cursor-pointer flex items-center justify-center bg-gray-300/50 w-14 h-14 rounded-md group transition-all duration-300 ease-in-out',
          isActive('/profile') ? 'bg-slate-700' : '',
        ]">
          <i class="pi pi-user text-[20px]"
            :class="isActive('/profile') ? 'text-slate-50' : 'text-gray-500 group-hover:text-slate-50'"></i>
        </li>
      </ul>
      <figure class="cursor-pointer w-13 h-13 mx-auto rounded-full overflow-hidden" @click="authStore.logout()">
        <img src="https://avatars.githubusercontent.com/u/129230632?v=4" alt="hotman_photo" class="size-full" />
      </figure>
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