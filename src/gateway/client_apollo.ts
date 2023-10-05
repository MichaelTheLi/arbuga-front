import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import typeDefs from "@/gateway/schema";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({ uri: import.meta.env.VITE_BACKEND_URL });

const authLink = setContext((request, { headers }) => {
  let additionalHeaders = {};

  if (request.operationName != "userLogin") {
    const token = localStorage.getItem("token");

    additionalHeaders = {
      authorization: token ? `Bearer ${token}` : "",
    };
  }

  return {
    headers: {
      ...headers,
      ...additionalHeaders,
    },
  };
});

const link = authLink.concat(httpLink);
export const cache = new InMemoryCache({
  possibleTypes: {
    Animal: ["Fish", "Plant"],
  },
});

const resolvers = {};

export const apolloClient = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers,
});
