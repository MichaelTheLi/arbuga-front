import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import typeDefs from "@/gateway/schema";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({ uri: "http://localhost:8080/query" });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
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
