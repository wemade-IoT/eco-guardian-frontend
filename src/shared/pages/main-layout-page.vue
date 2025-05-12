<template>
  <div class="min-h-[100dvh] h-[100dvh] flex flex-row bg-[#ebebeb] overflow-hidden">
    <sidebar></sidebar>
    <div class="flex flex-col flex-1 overflow-hidden">
      <toolbar />
      <main class="flex-1 overflow-auto custom-scrollbar px-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '../components/ui/sidebar.component.vue';
import Toolbar from '../components/ui/toolbar.component.vue';

</script>

<style scoped></style>