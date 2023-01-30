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
import typeDefs from "@/gateway/schema";
import { faker } from "@faker-js/faker";

const httpLink = createHttpLink({ uri: "https://graphqlzero.almansi.me/api" });

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        ecosystems: {
          read() {
            return [
              {
                id: "zxc",
                name: faker.word.adjective() + " " + faker.word.noun(),
                aquarium: {
                  dimensions: {
                    width: faker.datatype.number({ min: 20, max: 100 }),
                    height: faker.datatype.number({ min: 20, max: 100 }),
                    length: faker.datatype.number({ min: 20, max: 100 }),
                  },
                },
              },
              {
                id: "qwe",
                name: faker.word.adjective() + " " + faker.word.noun(),
                aquarium: {
                  dimensions: {
                    width: faker.datatype.number({ min: 20, max: 100 }),
                    height: faker.datatype.number({ min: 20, max: 100 }),
                    length: faker.datatype.number({ min: 20, max: 100 }),
                  },
                },
              },
            ];
          },
        },
      },
    },
  },
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
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
