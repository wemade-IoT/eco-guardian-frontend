import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import '@fortawesome/fontawesome-free/css/all.css';

// PrimeIcons
import "primeicons/primeicons.css";

// Routing
import router from "./router/index.ts";
import { createPinia } from "pinia";
import {Button, Dialog, InputText} from "primevue";

const app = createApp(App);
app
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        prefix: "p",
        cssLayer: false,
        darkModeSelector: "manual",
      },
    },
  })
  .use(router).use(createPinia());

app.component("pv-dialog", Dialog);
app.component("pv-text",InputText)
app.component("pv-button",Button)

app.mount("#app");
