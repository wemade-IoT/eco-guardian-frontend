import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/iam/interfaces/pages/login-page.component.vue";
import RegisterPage from "@/iam/interfaces/pages/register-page.component.vue";
import MainLayoutPage from "@/shared/pages/main-layout-page.vue";
import AnalyticsPage from "@/analytics/interfaces/pages/analytics-page.component.vue";
import ChoosePlanPage from "@/payment/interfaces/pages/choose-plan-page.component.vue";

const routes = [
  { path: '/', redirect: '/login' },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/choose-plan", component: ChoosePlanPage },
  {
    path: "/",
    component: MainLayoutPage,
    children: [
      {
        path: "/home",
        component: AnalyticsPage,
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
