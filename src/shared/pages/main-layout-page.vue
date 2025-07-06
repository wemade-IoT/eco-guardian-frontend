<template>
  <div class="min-h-[100dvh] h-[100dvh] flex flex-row bg-[#ebebeb] overflow-hidden">
    <sidebar></sidebar>
    <div class="main-container flex flex-col flex-1 overflow-hidden">
      <toolbar />
      <main class="content-area">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '../components/ui/sidebar.component.vue';
import Toolbar from '../components/ui/toolbar.component.vue';

</script>

<style>

.main-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100dvh;
  padding: 0 1rem 0.5rem 1rem;
  flex: 1;
  overflow: hidden;
}

.content-area {
  flex: 1;
  overflow: auto; /* Allows content to scroll */
  min-height: 0; /* Important for nested flex scrolling */
}

</style>