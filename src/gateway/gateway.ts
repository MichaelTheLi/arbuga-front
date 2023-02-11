import { useMutation, useQuery } from "@vue/apollo-composable";
import _ from "lodash";
import { gql } from "@/__generated__";
import { watch, type Ref, unref } from "vue";
import { useEcosystemsStore } from "@/stores/ecosystems";
import { useUserStore } from "@/stores/user";
import type { UserQueryQuery } from "@/__generated__/graphql";

// noinspection GraphQLUnresolvedReference
export const LOAD_USER = gql(/* GraphQL */ `
  query userQuery {
    me {
      id
      login
      name
      ecosystems @client {
        id
        name
        aquarium {
          dimensions {
            width
            height
            length
          }
        }
        analysis {
          id
          name
          description
          status
          messages {
            id
            name
            description
            status
          }
        }
      }
    }
  }
`);

// noinspection GraphQLUnresolvedReference
export const LOGIN_USER = gql(/* GraphQL */ `
  mutation userLogin($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      id
      login
      name
      ecosystems @client {
        id
        name
        aquarium {
          dimensions {
            width
            height
            length
          }
        }
        analysis {
          id
          name
          description
          status
          messages {
            id
            name
            description
            status
          }
        }
      }
    }
  }
`);

export const propagateEcosystems = (me: UserQueryQuery["me"]) => {
  const store = useEcosystemsStore();

  if (me && me.ecosystems) {
    me.ecosystems.forEach((ecosystemData) => {
      const ecosystem = store.createNew();

      ecosystem.name = ecosystemData.name;
      ecosystem.width.value = ecosystemData.aquarium.dimensions.width;
      ecosystem.length.value = ecosystemData.aquarium.dimensions.length;
      ecosystem.height.value = ecosystemData.aquarium.dimensions.height;
      if (ecosystemData.analysis) {
        ecosystem.analysis.value = ecosystemData.analysis;
      }

      if (!store.current) {
        store.changeCurrent(ecosystem);
      }
      store.addNew(ecosystem);
    });
  }
};

export const propagateUser = (me: UserQueryQuery["me"]) => {
  const userStore = useUserStore();

  const userOmitted = _.omit(me, ["ecosystems"]);
  userStore.changeUser({ login: null, ...userOmitted });
};

export const fetchUser = () => {
  const { loading, error, result } = useQuery(LOAD_USER);

  watch(result, (queryResult: Ref<UserQueryQuery | undefined>) => {
    if (queryResult) {
      const queryResultRaw = unref(queryResult);
      if (queryResultRaw && queryResultRaw.me) {
        propagateEcosystems(queryResultRaw.me);
        propagateUser(queryResultRaw.me);
      }
    }
  });

  return { loading, error };
};

export const useLoginUser = () => {
  const result = useMutation(LOGIN_USER, {
    refetchQueries: [{ query: LOAD_USER }],
  });

  return {
    execute: result.mutate,
  };
};
