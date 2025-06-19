<template>
  <router-view></router-view>
  <DynamicDialog />
  <Toast position="bottom-right"/>
</template>

<script setup lang="ts">
import DynamicDialog from 'primevue/dynamicdialog';
import Toast from 'primevue/toast';
</script>

<style scoped></style>