import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/iam/interfaces/pages/login-page.component.vue";
import RegisterPage from "@/iam/interfaces/pages/register-page.component.vue";
import MainLayoutPage from "@/shared/pages/main-layout-page.vue";
import DashboardPage from "@/analytics/interfaces/pages/dashboard.component.vue";
import ChoosePlanPage from "@/payment/interfaces/pages/choose-plan-page.component.vue";
import ConsultingPageComponent from "../crm/interfaces/pages/consulting-page.component.vue";
import PaymentSuccededPageComponent from "../payment/interfaces/pages/payment-succeded-page.component.vue";
import InstallationPreferenceSelectionComponent from "../planning/interfaces/pages/installation-preference-selection.component.vue";
import OrderPlanningComponent from "../planning/interfaces/pages/order-planning.component.vue";
import OrderPaymentPageComponent from "../planning/interfaces/pages/order-payment-page.component.vue";
import ProfileInformationPageComponent from "../profile/interfaces/store/profile-information-page.component.vue";

const routes = [
  { path: '/', redirect: '/login' },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/choose-plan", component: ChoosePlanPage },
    { path: "/payment-succeded", component: PaymentSuccededPageComponent },

  {
    path: "/",
    component: MainLayoutPage,
    children: [
      {
        path: "/home",
        component: DashboardPage, // Asegúrate de que esta sea la página correcta
        props: true,
      },
      {
        path: "/consulting",
        component: ConsultingPageComponent, // Asegúrate de que esta sea la página correcta
        props: true,
      },
      {
        path: "/installation",
        component: InstallationPreferenceSelectionComponent,
        props: true,
      },
      {
        path: "/order-planning",
        component: OrderPlanningComponent,
        props: true,
      },
      {
        path: "/order-payment",
        component: OrderPaymentPageComponent,
        props: true,
      },
      {
        path: "/profile",
        component: ProfileInformationPageComponent,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
