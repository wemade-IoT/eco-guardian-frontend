<template>
  <form novalidate @submit.prevent="onSubmitBillingForm"
    class="mt-12 border-1 border-slate-300 rounded-lg py-7 px-7 w-full bg-gray-50 shadow mx-auto">
    <div class="flex flex-row justify-between w-full items-center">
      <h2 class="text-xl font-bold text-gray-800">Billing Details</h2>
      <figure class="h-full flex items-center justify-center cursor-pointer hover:bg-slate-500
        transition-scale duration-200 ease-linear p-1.5 rounded-full bg-slate-400">
        <i class="pi pi-question text-lg text-slate-50"></i>
      </figure>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-4.5">
      <div>
        <label for="billing-email" class="block text-gray-700 mb-1">
          Email <span class="text-red-500">*</span>
        </label>
        <Input id="billing-email" v-model="email" type="email" required :class="[
          'w-full border-1 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary',
          emailError ? '!border-red-500' : 'border-gray-400/60'
        ]" placeholder="maku@email.com" />
        <span v-if="emailError" class="text-red-500 font-sans text-sm">{{ emailError }}</span>
      </div>
      <div class="w-full">
        <label for="billing-country" class="block text-gray-700 mb-1">
          Country <span class="text-red-500">*</span>
        </label>
        <Select id="billing-country" v-model="country" :options="countries" optionLabel="label" optionValue="label"
          placeholder="Select your country" required class="!border-gray-400/60 w-full">
          <template #option="slotProps">
            <div class="flex items-center">
              <img :alt="slotProps.option.label" :src="slotProps.option.src" class="mr-2" style="width: 20px" />
              <span>{{ slotProps.option.label }}</span>
            </div>
          </template>
        </Select>
        <span v-if="countryError" class="text-red-500 font-sans text-sm">{{ countryError
        }}</span>
      </div>
    </div>
    <div class="mb-5">
      <label for="discount" class="block text-gray-700 mb-1">
        Discount Code <span class="text-gray-400 text-xs">(Optional)</span>
      </label>
      <Input id="discount-code" v-model="discountCode" type="text" required :class="[
        'w-full border-1 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary',
        discountCodeError ? '!border-red-500' : 'border-gray-400/60'
      ]" placeholder="Enter your discount code" />
      <span v-if="discountCodeError" class="text-red-500 font-sans text-sm">{{
        discountCodeError
      }}</span>
    </div>
    <div class="flex flex-col gap-1">
      <p class="text-gray-500 text-sm text-pretty max-w-[800px]">
        Prices do not include <span class="font-bold">VAT</span>, which will be determined based on the user's billing
        country.
      </p>
      <p class="text-gray-500 text-sm text-pretty max-w-[800px]">
        The final price can be seen on the purchase page, before completing the payment.
      </p>
    </div>
    <div class="flex items-center mt-5 mb-2">
      <Checkbox id="terms" v-model="acceptedTerms" :binary="true" class="mr-2" />
      <label for="terms" class="text-sm text-gray-500 select-none font-semibold flex items-center gap-1">
        <span>
          I have read and accept the
          <span @click="showTermsModal = true" class="underline text-primary hover:text-green-800 font-bold"
            style="cursor:pointer;">
            Terms & Conditions
          </span>
        </span>
      </label>
    </div>
    <button type="submit" :class="[
      'w-full font-semibold py-2.5 rounded transition mt-4 mb-2',
      (!acceptedTerms || !country || Object.keys(errors).length > 0)
        ? 'bg-gray-400/80 text-gray-400 cursor-not-allowed'
        : 'bg-primary hover:bg-green-800 text-white'
    ]" :disabled="!acceptedTerms">
      <span class="text-white">Confirm Payment</span>
    </button>
    <!-- <payment-card-form></payment-card-form> -->
    <terms-conditions-modal :open="showTermsModal" @close="showTermsModal = false" />
  </form>
</template>

<script setup lang="ts">
import Select from 'primevue/select'
import Input from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import { countries } from '../../../public/utils/consts/countries';
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import billingDetailSchema from '../../../public/schemas/billing-detail.schema';
import { useDialog, useToast } from 'primevue';
import PaymentCardForm from './payment-card-form.component.vue';
import TermsConditionsModal from '../components/terms-conditions-modal.component.vue';
import { usePaymentStore } from '../store/payment-store';
import { convertAmountByCountry, getCurrencyByCountry } from '../../../public/utils/helpers/currency';
import type { CountryName } from '../../../public/utils/interfaces/country';
import type { PlanType } from '../../../public/utils/types/plan-selected';

const props = defineProps<{
  isPlanSelected: boolean;
  amount: number;
  planSelected: PlanType | null;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}>();

const { handleSubmit, errors } = useForm({
  validationSchema: billingDetailSchema,
  initialValues: {
    email: '',
    country: '',
    discountCode: '',
  }
})

const paymentStore = usePaymentStore();
const toast = useToast();
const dialog = useDialog();
const acceptedTerms = ref<boolean>(false)
const showTermsModal = ref<boolean>(false);

const { value: email, errorMessage: emailError } = useField<string>('email');
const { value: country, errorMessage: countryError } = useField<string>('country');
const { value: discountCode, errorMessage: discountCodeError } = useField<string>('discountCode');

const onSubmitBillingForm = handleSubmit(async (values) => {

  if (!props.planSelected) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Please select a plan before proceeding.',
      life: 3000
    });
    return;
  }

  if (!acceptedTerms.value) return;

  const convertedAmount = await convertAmountByCountry(props.amount, values.country as CountryName);

  console.log('Converted Amount:', convertedAmount);

  const response = await paymentStore.createPaymentIntent({
    amount: convertedAmount,
    currency: getCurrencyByCountry(values.country as CountryName),
    paymentMethodId: '',
  });

  const clientSecret = response?.clientSecret || '';

  paymentStore.setPaymentFinancialData(convertedAmount, getCurrencyByCountry(values.country as CountryName));
  console.log('Payment Process so Far:', paymentStore.getPaymentRequest);
  // Handle emits from PaymentCardForm via dialog events

  //Convert plant Selected to a number for the subscriptionTypeId

  const planSelectedId = props.planSelected ? props.planSelected : 'DOMESTIC';
  const planSelectedTypeId = planSelectedId === 'DOMESTIC' ? 1
    : planSelectedId === 'PRO' ? 2
    : planSelectedId === 'ENTERPRISE' ? 3
    : 0; // Default case if no match

  // Guardar datos en localStorage antes del pago para recovery en payment-succeded
  localStorage.setItem('paymentData', JSON.stringify({
    userEmail: props.email,
    userPassword: props.password || '',
    firstName: props.firstName || '',
    lastName: props.lastName || '',
    country: values.country,
    amount: convertedAmount,
    currency: getCurrencyByCountry(values.country as CountryName),
    planSelected: planSelectedTypeId,
    referenceId: 0, // In this process we know its an subscription, so we can set a reference ID
    referenceType: 'subscription',
  }));
  

  dialog.open(PaymentCardForm, {
    props: {
      modal: true,
      style: { width: "500px" },
      closable: false,
    },
    data: {
      firstName: props.firstName || '',
      lastName: props.lastName || '',
      userEmail: props.email || '',
      userPassword: props.password || '',
      email: values.email,
      country: values.country,
      discountCode: values.discountCode,
      clientSecret: clientSecret,
      amount: props.amount,
      currency: getCurrencyByCountry(values.country as CountryName),
      countryName: values.country,
      referenceId: 0,
      referenceType: 'subscription', // We know its a subscription
    }
  });

  

});



</script>

<style scoped></style>