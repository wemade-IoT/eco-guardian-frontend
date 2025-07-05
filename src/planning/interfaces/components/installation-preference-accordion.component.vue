<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import { useOrderStore } from '../stores/order-store';

const router = useRouter();



const handleAssitedInstallation = () => {
  // Navigate to the order planning page for assisted installation
  console.log('Assisted installation selected');

  useOrderStore().setAction('AssistedInstallation');

  router.push('/order-planning');
};

const handleSelfInstallation = () => {
  // Navigate to the order planning page for self installation
  console.log('Self installation selected');
  useOrderStore().setAction('SelfInstallation');
  router.push('/order-planning');
};


</script>

<template>
  <div class="w-full max-w-6xl my-5 mx-auto bg-gray-50">
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="p-6 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Installation Preferences</h1>
        <p class="text-gray-600">Choose how you'd like to handle your device installation</p>
      </div>

      <Accordion value="0" class="border-none">
        <!-- Specialist Installation Option -->
        <AccordionPanel value="0" class="border-b border-gray-100 last:border-b-0">
          <AccordionHeader class="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <i class="pi pi-wrench text-emerald-600 text-lg"></i>
              </div>
              <span class="text-lg font-semibold text-gray-800">Professional Installation Service</span>
            </div>
          </AccordionHeader>
          <AccordionContent class="px-6 pb-6 pt-2">
            <div class="grid lg:grid-cols-2 gap-8 items-center">
              <!-- Content Section -->
              <div class="space-y-6">
                <div class="space-y-3">
                  <h3 class="text-xl font-semibold text-gray-800">
                    Let our experts handle everything!
                  </h3>
                  <p class="text-gray-600 leading-relaxed">
                    Choose a convenient date and time, and our certified specialists will install your device
                    professionally. Sit back and relax while we take care of the technical details.
                  </p>
                </div>

                <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div class="flex items-start gap-3">
                    <i class="pi pi-info-circle text-amber-600 text-lg mt-0.5"></i>
                    <div>
                      <p class="text-sm font-medium text-amber-800 mb-1">Additional Service Fee</p>
                      <p class="text-sm text-amber-700">
                        Professional installation includes setup, configuration, and basic training.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Image Section -->
              <div class="flex justify-center">
                <img src="@/planning/assets/images/installation-preference-1.jpg" alt="Professional Installation"
                  class="w-full max-w-md h-64 object-cover rounded-lg shadow-md" />
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
              <Button variant="outlined" class="px-6 py-2.5 text-gray-600 border-gray-300 hover:bg-gray-50"
                @click="router.push('/home')">
                Cancel
              </Button>
              <Button class="confirm-button px-8 py-2.5" @click="handleAssitedInstallation">
                <i class="pi pi-check mr-2"></i>
                Confirm Installation Service
              </Button>
            </div>
          </AccordionContent>
        </AccordionPanel>

        <!-- Self Installation Option -->
        <AccordionPanel value="1" class="border-b border-gray-100 last:border-b-0">
          <AccordionHeader class="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <i class="pi pi-user text-blue-600 text-lg"></i>
              </div>
              <span class="text-lg font-semibold text-gray-800">Self Installation</span>
            </div>
          </AccordionHeader>
          <AccordionContent class="px-6 pb-6 pt-2">
            <div class="min-h-[300px] flex flex-col justify-between">
              <!-- Content Section -->
              <div class="space-y-6">
                <div class="space-y-3">
                  <h3 class="text-xl font-semibold text-gray-800">
                    Install it yourself - it's easier than you think!
                  </h3>
                  <p class="text-gray-600 leading-relaxed">
                    Save on installation costs and set up your device at your own pace. We provide detailed
                    instructions and customer support to guide you through the process.
                  </p>
                </div>

                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div class="flex items-start gap-3">
                    <i class="pi pi-check-circle text-green-600 text-lg mt-0.5"></i>
                    <div>
                      <p class="text-sm font-medium text-green-800 mb-1">No Additional Fees</p>
                      <p class="text-sm text-green-700">
                        Complete setup guide and 24/7 support included at no extra cost.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                <Button variant="outlined" class="px-6 py-2.5 text-gray-600 border-gray-300 hover:bg-gray-50"
                  @click="router.push('/home')">
                  Cancel
                </Button>
                <Button class="confirm-button px-8 py-2.5" @click="handleSelfInstallation">
                  <i class="pi pi-check mr-2"></i>
                  Confirm Self Installation
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  </div>
</template>

<style scoped>
.confirm-button {
  background-color: var(--color-primary);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.confirm-button:hover,
.confirm-button:focus,
.confirm-button:active {
  background-color: var(--color-primary) !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

:deep(.p-accordion .p-accordionheader-toggle) {
  border: none;
  background: transparent;
  padding: 0;
}

:deep(.p-accordion .p-accordionpanel) {
  border: none;
}

:deep(.p-accordioncontent) {
  padding: 0;
  border: none;
}

:deep(.p-button-outlined) {
  background: transparent;
  border: 1px solid #d1d5db;
  color: #6b7280;
}

:deep(.p-button-outlined:hover) {
  background: #f9fafb;
  border-color: #9ca3af;
}
</style>