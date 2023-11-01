console.log("Test");

import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import { gql } from "../__generated__";
import { computed, watch } from "vue";
import { createClient } from "@/gateway/client_apollo";

// noinspection GraphQLUnresolvedReference
export const SEARCH_FISH = gql(/* GraphQL */ `
  query SearchFish($substring: String, $first: Int, $after: ID) {
    fishList(substring: $substring, first: $first, after: $after) {
      edges {
        cursor
        node {
          id
        }
      }
    }
  }
`);

class LocalStorageTokenStorage {
  getToken(): string | null {
    return null;
  }
  setToken(token: string | null): void {}
}

const { apolloClient } = createClient(
  "https://api.werel.ru/query", // TODO URI for background
  new LocalStorageTokenStorage()
);

provideApolloClient(apolloClient);

const { loading, error, result } = useQuery(
  SEARCH_FISH,
  {
    substring: "",
    first: 10000,
    after: "",
  },
  () => ({ fetchPolicy: "network-only" })
);

const urls = computed(() => {
  const value = result.value;
  return value?.fishList.edges.map((edge) => {
    return `https://werel.ru/fish/${edge.node?.id}`;
  });
});

console.log("Test");

console.log(loading.value);

watch(urls, () => {
  console.log(urls.value);
});
