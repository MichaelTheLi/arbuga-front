import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { LOAD_USER } from "@/gateway/gateway";
import { anonymousUser, loggedUser } from "@/gateway/seed";
import typeDefs from "@/gateway/schema";

const httpLink = createHttpLink({ uri: "https://graphqlzero.almansi.me/api" });

const cache = new InMemoryCache();

cache.writeQuery({
  query: LOAD_USER,
  data: {
    me: anonymousUser,
  },
});

const resolvers = {
  Mutation: {
    login: () => {
      cache.writeQuery({
        query: LOAD_USER,
        data: {
          me: loggedUser,
        },
      });
      return loggedUser;
    },
  },
};

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers,
});
