<template>
  <Dialog
    :visible="open"
    modal
    header="Terms & Conditions"
    :closable="false"
    :dismissableMask="true"
    :style="{ width: '500px' }"
    class="pt-6"
  >
    <div class="flex flex-col gap-4 py-2">
      <div class="text-gray-700 text-sm max-h-80 custom-scrollbar overflow-y-auto px-1">
        <ul class="list-disc pl-5 space-y-2">
          <li>
            All payments are processed securely via Stripe. We do not store your credit card information.
          </li>
          <li>
            By proceeding, you agree to our billing policy and authorize us to charge your selected payment method for the chosen subscription plan.
          </li>
          <li>
            Prices do not include VAT or other applicable taxes, which will be calculated based on your billing country and added to the total amount at checkout.
          </li>
          <li>
            Subscriptions renew automatically at the end of each billing cycle unless cancelled at least 24 hours before the renewal date.
          </li>
          <li>
            You can manage or cancel your subscription at any time from your account settings. Cancellations will take effect at the end of the current billing period.
          </li>
          <li>
            Refunds are subject to our <a href="#" class="text-primary underline">refund policy</a>. Refund requests must be submitted within 7 days of the transaction date.
          </li>
          <li>
            In case of payment failure, access to premium features may be suspended until the outstanding balance is settled.
          </li>
          <li>
            We reserve the right to update these terms and conditions at any time. Continued use of our services after changes constitutes acceptance of the new terms.
          </li>
          <li>
            For more information, please review our <a href="#" class="text-primary underline">full terms and conditions</a> or contact our support team.
          </li>
        </ul>
      </div>
      <div class="flex justify-center gap-2 mt-4">
        <Button label="Understood" icon="pi pi-check" @click="$emit('close')" />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

defineProps({
  open: {
    type: Boolean,
    default: false
  }
})


</script>

<style scoped>
</style>