import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { anonymousUser, loggedUser } from "@/gateway/seed";
import typeDefs from "@/gateway/schema";

// TODO Auth https://www.apollographql.com/docs/react/networking/authentication/#cookie
const httpLink = createHttpLink({ uri: "http://localhost:8080/query" });

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
  link: httpLink,
  cache,
  typeDefs,
  resolvers,
});
