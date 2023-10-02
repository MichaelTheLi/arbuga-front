import { createApp, h, provide } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";

import { Quasar } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/dist/quasar.css";

import App from "./App.vue";
import router from "./router";

// import "./assets/main.css";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "@/gateway/client_apollo";

import { i18nMessages, numberFormats } from "./config";

const i18n = createI18n({
  numberFormats: numberFormats,
  legacy: false,
  locale: navigator.language,
  fallbackLocale: "en-US",
  formatFallbackMessages: true,
  messages: i18nMessages,
});

// noinspection JSUnusedGlobalSymbols
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.use(i18n);
app.use(createPinia());
app.use(router);
app.use(Quasar, {
  config: {
    dark: true, // 'auto'
    brand: {
      primary: "#0b7b88",
      secondary: "#157172",
      accent: "#0eaab9",

      dark: "#13232c",
      "dark-page": "#0e1c26",

      positive: "#21BA45",
      negative: "#C10015",
      info: "#31CCEC",
      warning: "#F2C037",
    },
  },
  plugins: ["Meta"],
});

app.mount("#app");
