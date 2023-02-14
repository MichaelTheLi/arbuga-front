import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { anonymousUser, loggedUser } from "@/gateway/seed";
import typeDefs from "@/gateway/schema";
import { setContext } from "@apollo/client/link/context";

// TODO Auth https://www.apollographql.com/docs/react/networking/authentication/#cookie
const httpLink = createHttpLink({ uri: "http://localhost:8080/query" });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : "",
      "auth-token": token ? token : "",
    },
  };
});
const link = authLink.concat(httpLink);
export const cache = new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        ecosystems: {
          read(_, { readField }) {
            const login = readField("login");
            if (login !== "" && login !== null) {
              return loggedUser?.ecosystems;
            }

            return anonymousUser?.ecosystems;
          },
        },
      },
    },
  },
});

// cache.readQuery({ query: LOAD_USER });

// cache.writeQuery({
//   query: LOAD_USER,
//   data: {
//     me: anonymousUser,
//   },
// });

// cache.updateQuery({ query: LOAD_USER }, (data) => {
//   console.log(data);
//   return {
//     me: {
//       id: "test",
//       login: "Test login",
//       name: "Test name",
//       ...data?.me,
//       ecosystems: anonymousUser?.ecosystems,
//     },
//   };
// });

const resolvers = {
  // Mutation: {
  //   login: () => {
  //     cache.writeQuery({
  //       query: LOAD_USER,
  //       data: {
  //         me: loggedUser,
  //       },
  //     });
  //     return loggedUser;
  //   },
  // },
};

export const apolloClient = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers,
});
