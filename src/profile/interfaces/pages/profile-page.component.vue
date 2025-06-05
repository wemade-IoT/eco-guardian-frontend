<script setup lang="ts">

import ProfileInfoCard from "@/profile/interfaces/components/profile-info-card.component.vue";
import ProfileSubscriptionInfo from "@/profile/interfaces/components/profile-subscription-info.component.vue";
import ProfilePayments from "@/profile/interfaces/components/profile-payments.component.vue";
</script>

<template>
  <div class="flex flex-col ">
    <profile-info-card></profile-info-card>
    <profile-subscription-info></profile-subscription-info>
    <profile-payments></profile-payments>
  </div>
</template>

<style scoped>

</style>