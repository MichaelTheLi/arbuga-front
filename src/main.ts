import { createApp, h, provide } from "vue";
import { createPinia } from "pinia";

import { Quasar } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/dist/quasar.css";

import App from "./App.vue";
import router from "./router";

// import "./assets/main.css";

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";

const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "https://graphqlzero.almansi.me/api",
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.use(createPinia());
app.use(router);
app.use(Quasar, {
  config: {
    dark: true, // 'auto'
    brand: {
      primary: "#0b7b88",
      secondary: "#157172",
      accent: "#E94560",

      dark: "#13232c",
      "dark-page": "#0e1c26",

      positive: "#21BA45",
      negative: "#C10015",
      info: "#31CCEC",
      warning: "#F2C037",
    },
  },
  plugins: {},
});

app.mount("#app");
