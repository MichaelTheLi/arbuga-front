import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import typeDefs from "@/gateway/schema";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({ uri: "http://localhost:8080/query" });

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
export const cache = new InMemoryCache({});

const resolvers = {};

export const apolloClient = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers,
});
