import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/iam/interfaces/pages/login-page.component.vue";
import RegisterPage from "@/iam/interfaces/pages/register-page.component.vue";
import MainLayoutPage from "@/shared/pages/main-layout-page.vue";
import DashboardPage from "@/analytics/interfaces/pages/dashboard.component.vue";

const routes = [
  { path: '/', redirect: '/login' },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  {
    path: "/",
    component: MainLayoutPage,
    children: [
      {
        path: "/home",
        component: DashboardPage,
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