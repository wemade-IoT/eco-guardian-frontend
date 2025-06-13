<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Confirm Payment"
    :closable="false"
    :dismissableMask="true"
    :style="{ width: '400px' }"
  >
    <div class="flex flex-col items-center gap-5 py-4">
      <figure class="h-full flex items-center justify-center rounded-full">
        <i style="font-size: 3.5rem;" class="pi pi-check-circle text-green-600"></i>
      </figure>
      <p class="text-center text-gray-700 text-lg font-medium">
        Are you sure you want to confirm your payment?
      </p>
      <div class="flex gap-3 mt-4">
        <Button label="Cancel" severity="secondary" @click="visible = false" />
        <Button label="Confirm" @click="confirm" />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

const visible = ref<boolean>(false)

function open() {
  visible.value = true
}

function confirm() {
  visible.value = false
}

defineExpose({ open })
</script>

<style scoped>
</style>