<template>
  <div class="flex flex-col items-center w-full max-w-md mx-auto bg-white gap-4 py-4">
    <div class="flex flex-col items-center gap-2">
      <div class="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100/80 shadow-inner mb-2">
        <i :class="iconClass" style="font-size: 2.5rem;" />
      </div>
      <h2 class="text-2xl font-extrabold text-gray-800 text-center mb-1">
        {{ dialogData?.title || 'Información' }}
      </h2>
    </div>
    <p class="text-center text-gray-600 text-base font-medium mb-4">
      {{ dialogData?.subtitle || 'Por favor, completa todos los campos.' }}
    </p>
    <Button
      label="OK"
      :severity="buttonSeverity"
      class="w-32 py-2 rounded-lg text-base font-semibold shadow hover:shadow-lg transition-all"
      @click="handleClose"
    />
  </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import { computed, inject } from 'vue'
import { useRouter } from 'vue-router';

const dialogRef = inject<any>('dialogRef')
const dialogData = dialogRef.value.data;
const router = useRouter()

const iconClass = computed(() => {
  switch (dialogData.type) {
    case 'success':
      return 'pi pi-check-circle text-green-600'
    case 'info':
      return 'pi pi-info-circle text-blue-600'
    case 'error':
      return 'pi pi-times-circle text-red-600'
    default:
      return 'pi pi-info-circle text-blue-600'
  }
})

const buttonSeverity = computed(() => {
  switch (dialogData.type) {
    case 'success':
      return 'success'
    case 'info':
      return 'info'
    case 'error':
      return 'danger'
    default:
      return 'primary'
  }
})

async function handleClose() {
  if (dialogData.redirectionPath) {
    router.push(dialogData.redirectionPath)
    dialogRef.value.close()
  } else {
    dialogRef.value.close()
  }
}
</script>