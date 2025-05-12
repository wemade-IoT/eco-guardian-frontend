import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";

// PrimeIcons
import "primeicons/primeicons.css";

// Routing
import router from "./router/index.ts";

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
    unstyled: true,
  })
  .use(router);

app.mount("#app");
