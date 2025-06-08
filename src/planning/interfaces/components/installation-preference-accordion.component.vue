<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Button from 'primevue/button';
</script>

<template>
  <div class="w-full flex flex-col gap-3 p-4">
    <Accordion value="0">
      <AccordionPanel value="0">
        <AccordionHeader >I want a specialist to install my order</AccordionHeader>
        <AccordionContent class="flex flex-col gap-5">
          <div class="flex flex-col items-start justify-start mb-4 gap-4">
            <p class="text-2xl font-medium">
              Don't want to worry about installation? Our specialists are here to help!
            </p>
            <p class="text-2xs text-gray-600">
              Choose a date and time that works for you, and our team will handle the rest.
            </p>
          </div>
          <div class="flex items-center justify-center mb-4">
            <img src="@/planning/assets/images/installation-preference-1.jpg" alt="Installation Preference" class="w-[65%] h-auto rounded-lg shadow-md mb-4" />
          </div>
          <div class="flex flex-col items-end justify-end mb-4 gap-4">
            <p class="text-sm text-gray-600 italic">
              Please note that this service is available for an additional fee.
            </p>
            <Button class="text-white confirm-button px-6 py-2 w-[15rem]">
              Confirm
            </Button>
          </div>
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel value="1">
        <AccordionHeader>I want to install the device myself</AccordionHeader>
        <AccordionContent>
          <div class="flex flex-col justify-between h-[30rem]">
            <div>
              <p class="text-2xl text-gray-600">
                No specialist will come to install the device, and you will not be charged an additional fee.
              </p>
            </div>
            <div class="flex flex-col items-end gap-4">
              <Button class="text-white confirm-button px-6 py-2 w-[15rem]">
                Confirm
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>

</template>

<style scoped>
.confirm-button {
  background-color: var(--color-primary);
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
}
.confirm-button:hover,
.confirm-button:focus,
.confirm-button:active {
  background-color: var(--color-primary) !important;
}
:deep(.p-accordionheader) {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>