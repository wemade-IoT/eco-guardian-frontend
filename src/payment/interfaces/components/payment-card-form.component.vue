<template>
  <div class="payment-modal">
    <!-- Header -->
    <div class="flex items-center gap-3 w-full mb-6">
      <div class="flex items-center justify-center w-10 h-10 bg-[#578257] rounded-full">
        <i class="pi pi-credit-card text-white text-lg"></i>
      </div>
      <div>
        <h2 class="text-lg font-bold text-gray-800">Complete Payment</h2>
        <p class="text-[13px] text-gray-">Secure checkout powered by Stripe</p>
      </div>
    </div>

    <div class="space-y-6">
      <!-- Payment Summary -->
      <div class="bg-gray-50 rounded-lg p-4 border border-gray-300">
        <div class="flex justify-between items-center mb-2">
          <span class="text-lg font-bold text-gray-900">
            <span class="text-gray-700 mr-1 text-base">Domestic Plan:</span>
            {{ getCurrencySymbolByCountry(dialogData?.countryName) }}
            {{ convertedAmount }}
          </span>
        </div>
        <div class="flex justify-between items-center text-sm text-gray-600">
          <span>Discount code</span>
          <span>
            {{ dialogData?.discountCode ? dialogData.discountCode : 'No Provided' }}
          </span>
        </div>
        <hr class="my-3 border-gray-300">
        <div class="flex justify-between items-center">
          <span class="font-semibold text-gray-800">Total due today</span>
          <span class="text-xl font-bold text-[#578257]">
            {{ getCurrencySymbolByCountry(dialogData?.countryName) }} {{ convertedAmount }}
          </span>
        </div>
      </div>

      <form v-if="stripeLoaded" @submit.prevent="handleSubmit">
        <StripeElements :stripe-key="stripeKey" :instance-options="stripeOptions" :elements-options="elementsOptions"
          ref="elementsComponent">
          <StripeElement type="payment" :options="paymentElementOptions" ref="paymentComponent" />
        </StripeElements>
        <div class="flex gap-3 pt-6">
          <Button label="Cancel" severity="secondary" class="flex-1" @click="handleClose" />
          <Button type="submit" :label="processing ? 'Processing...' : 'Pay'" class="flex-1"
            :disabled="!stripeLoaded || processing" :loading="processing" />
        </div>
      </form>

      <!-- Stripe Badge -->
      <div class="text-center">
        <div class="flex items-center justify-center gap-2 text-xs text-gray-700">
          <span>Secure payments by</span>
          <a href="https://stripe.com/es-us/legal/ssa" target="_blank" rel="noopener nooreferer"
            class="flex items-center gap-1 font-semibold text-[#635BFF] -mb-[0.5px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" viewBox="0 0 512 214">
              <path fill="#635BFF"
                d="M512 110.08c0-36.409-17.636-65.138-51.342-65.138c-33.85 0-54.33 28.73-54.33 64.854c0 42.808 24.179 64.426 58.88 64.426c16.925 0 29.725-3.84 39.396-9.244v-28.445c-9.67 4.836-20.764 7.823-34.844 7.823c-13.796 0-26.027-4.836-27.591-21.618h69.547c0-1.85.284-9.245.284-12.658m-70.258-13.511c0-16.071 9.814-22.756 18.774-22.756c8.675 0 17.92 6.685 17.92 22.756zm-90.31-51.627c-13.939 0-22.899 6.542-27.876 11.094l-1.85-8.818h-31.288v165.83l35.555-7.537l.143-40.249c5.12 3.698 12.657 8.96 25.173 8.96c25.458 0 48.64-20.48 48.64-65.564c-.142-41.245-23.609-63.716-48.498-63.716m-8.534 97.991c-8.391 0-13.37-2.986-16.782-6.684l-.143-52.765c3.698-4.124 8.818-6.968 16.925-6.968c12.942 0 21.902 14.506 21.902 33.137c0 19.058-8.818 33.28-21.902 33.28M241.493 36.551l35.698-7.68V0l-35.698 7.538zm0 10.809h35.698v124.444h-35.698zm-38.257 10.524L200.96 47.36h-30.72v124.444h35.556V87.467c8.39-10.951 22.613-8.96 27.022-7.396V47.36c-4.551-1.707-21.191-4.836-29.582 10.524m-71.112-41.386l-34.702 7.395l-.142 113.92c0 21.05 15.787 36.551 36.836 36.551c11.662 0 20.195-2.133 24.888-4.693V140.8c-4.55 1.849-27.022 8.391-27.022-12.658V77.653h27.022V47.36h-27.022zM35.982 83.484c0-5.546 4.551-7.68 12.09-7.68c10.808 0 24.461 3.272 35.27 9.103V51.484c-11.804-4.693-23.466-6.542-35.27-6.542C19.2 44.942 0 60.018 0 85.192c0 39.252 54.044 32.995 54.044 49.92c0 6.541-5.688 8.675-13.653 8.675c-11.804 0-26.88-4.836-38.827-11.378v33.849c13.227 5.689 26.596 8.106 38.827 8.106c29.582 0 49.92-14.648 49.92-40.106c-.142-42.382-54.329-34.845-54.329-50.774" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onBeforeMount, onMounted, ref, toRaw } from 'vue';
import { StripeElements, StripeElement } from "vue-stripe-js";
import { loadStripe, type StripeElementsOptionsMode, type StripePaymentElementOptions, } from "@stripe/stripe-js"
import Button from 'primevue/button';
import { useAuthStore } from '../../../iam/interfaces/store/auth-store';
import { convertAmountByCountry, getCountryCodeByName, getCurrencySymbolByCountry } from '../../../public/utils/helpers/currency';
import { usePaymentStore } from '../store/payment-store';
import { useSubscriptionStore } from '../store/subscription-store';
import { getPlanId } from '../../../public/utils/helpers/subscription';
import { SubscriptionAssembler } from '../../domain/assembler/subscription-assembler';
import { PaymentAssembler } from '../../domain/assembler/payment-assembler';
import { ProfileStore } from '../../../profile/interfaces/store/profile-store';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const dialogRef = inject<any>('dialogRef');
const dialogData = dialogRef.value.data;
const convertedAmount = ref<number | null>(null);

const stripeLoaded = ref(false);
const stripeOptions: StripeElementsOptionsMode = {
  clientSecret: dialogData.clientSecret,
};
console.log(dialogData.amount)
const elementsOptions = ref<StripeElementsOptionsMode>({
  mode: "payment",
  amount: dialogData.amount * 100,
  currency: dialogData.currency || 'usd',
  appearance: {
    theme: "flat",
  },
})

const paymentElementOptions = ref<StripePaymentElementOptions>({
  readOnly: false,
  layout: "tabs",
  defaultValues: {
    billingDetails: {
      name: dialogData?.name || 'GUEST',
      address: {
        country: getCountryCodeByName(dialogData?.countryName) || 'US',
      }
    }
  },
  fields: {
    billingDetails: {
      address: {
        country: 'auto'
      }
    },
  }
})

const elementsComponent = ref();
const paymentComponent = ref();
const processing = ref(false);
const authStore = useAuthStore();
const paymentStore = usePaymentStore();
const subscriptionStore = useSubscriptionStore();
const paymentAssembler = new PaymentAssembler();
const subscriptionAssembler = new SubscriptionAssembler();
const profileStore = ProfileStore();

onBeforeMount(async () => {
  await loadStripe(stripeKey);
  stripeLoaded.value = true;
});

onMounted(async () => {
  try {
    convertedAmount.value = await convertAmountByCountry(
      dialogData?.amount,
      dialogData?.countryName,
    );
  } catch (error) {
    convertedAmount.value = 0;
  }
});

async function handleSubmit() {
  const stripeInstance = await elementsComponent.value?.instance;
  const elements = await elementsComponent.value?.elements;

  if (!stripeInstance) {
    console.error("Stripe instance not loaded");
    return;
  }


  console.log("dialogData", dialogData?.planSelected);
  console.log("planSelectedId", getPlanId(dialogData?.planSelected));

  console.log("userData", authStore.userData?.email, authStore.userData?.password, getPlanId(dialogData?.planSelected));

  // todo esta wea de los create deberia hacerse luego de validado el pago, pero por mientras 
  // se hace asi para que evitar un bug
  const user = await authStore.register({
    email: authStore.userData?.email || '',
    password: authStore.userData?.password || '',
    roleId: getPlanId(dialogData?.planSelected),
  });

  console.log("user", user);

  const subscriptionRequest = subscriptionAssembler.toRequest({
    userId: user.userId || '',
    subscriptionTypeId: getPlanId(dialogData?.planSelected),
    subscriptionStateId: 1,
    currency: dialogData?.currency || 'usd',
    amount: dialogData?.amount || 0,
  });

  const subscription = await subscriptionStore.createSubscription(subscriptionRequest);

  console.log("subscription", subscription);

  const paymentRequest = paymentAssembler.toRequest({
    paymentIntentId: toRaw(dialogData)?.clientSecret || '',
    paymentMethodId: "1",
    amount: dialogData?.amount || 0,
    currency: dialogData?.currency || 'usd',
    paymentStatus: 'completed', // Cambiado a completed ya que el pago fue validado
    userId: user.userId || 0,
    referenceId: subscription.id,
    referenceType: 1
  });

  console.log("paymentRequest", paymentRequest);

  await paymentStore.createPayment(paymentRequest);

  //Logica de creacion de perfil


  const profileToLoad = {
    Name: authStore.userData?.name || '',
    UserId: user.userId || 0,
    LastName: authStore.userData?.lastName || '',
    Email: authStore.userData?.email || '',
    Address: dialogData.countryName || '',
    AvatarUrl: authStore.userData?.avatarUrl || null, // Se inicia como null
    SubscriptionId: authStore.userData.subscriptionId
  };
  console.log("Creating profile for user", user.userId,  "with subscription", authStore.userData.subscriptionId);

  await profileStore.createProfile(profileToLoad)
    .then(() => {
      console.log("Profile pipeline completed successfully");
    })
    .catch((error) => {
      console.error("Error creating profile:", error);
    });


  await elements.submit();
  const { error } = await stripeInstance.confirmPayment({
    elements,
    clientSecret: dialogData.clientSecret,
    confirmParams: {
      return_url: `${import.meta.env.VITE_BASE_URL}/payment-succeded`,
      payment_method_data: {
        billing_details: {
          name: authStore.userData?.name || 'GUEST',
          email: dialogData?.email,
          address: {
            country: getCountryCodeByName(dialogData?.countryName) || 'US',
          },
        },
      },
    },
  });

  if (error) {
    console.error("Payment error:", error);
    dialogRef.value.close();
    return;
  }

  dialogRef.value.close();
}

const handleClose = () => {
  dialogRef.value.close();
};

</script>