import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client/core";
import typeDefs from "@/gateway/schema";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";

const httpLink = createHttpLink({ uri: import.meta.env.VITE_BACKEND_URL });

const authLink = setContext((request, { headers }) => {
  return new Promise((success) => {
    let additionalHeaders = {};

    if (request.operationName != "userLogin") {
      const token = localStorage.getItem("token");

      additionalHeaders = {
        authorization: token ? `Bearer ${token}` : "",
      };
    }

    success({
      headers: {
        ...headers,
        ...additionalHeaders,
      },
    });
  });
});

const graphqlErrorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
});

const networkErrorLink = onError(({ networkError }) => {
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);

    if (
      "statusCode" in networkError &&
      (networkError.statusCode === 401 || networkError.statusCode === 403)
    ) {
      localStorage.removeItem("token");
    }
  }
});

const retryLink = new RetryLink({
  delay: {
    initial: 1000,
  },
});

export const cache = new InMemoryCache({
  possibleTypes: {
    Animal: ["Fish", "Plant"],
  },
});

const resolvers = {};

export const apolloClient = new ApolloClient({
  link: from([
    retryLink,
    graphqlErrorLink,
    networkErrorLink,
    authLink,
    httpLink,
  ]),
  cache,
  typeDefs,
  resolvers,
});
