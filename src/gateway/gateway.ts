import { useMutation, useQuery } from "@vue/apollo-composable";
import _ from "lodash";
import { gql } from "@/__generated__";
import { watch, type Ref, unref } from "vue";
import { useEcosystemsStore } from "@/stores/ecosystems";
import type { Ecosystem } from "@/stores/ecosystems";
import { useUserStore } from "@/stores/user";
import type { UserQueryQuery } from "@/__generated__/graphql";

// noinspection GraphQLUnresolvedReference
export const LOAD_USER = gql(/* GraphQL */ `
  query userQuery {
    me {
      id
      login
      name
      ecosystems {
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
      token
      user {
        id
        login
        name
        ecosystems {
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
  }
`);

// noinspection GraphQLUnresolvedReference
export const SAVE_ECOSYSTEM = gql(/* GraphQL */ `
  mutation SAVE_ECOSYSTEM($id: ID, $ecosystem: EcosystemInput!) {
    saveEcosystem(id: $id, ecosystem: $ecosystem) {
      ecosystem {
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
      success
      error
    }
  }
`);

export const propagateEcosystems = (me: UserQueryQuery["me"]) => {
  const store = useEcosystemsStore();

  if (me && me.ecosystems) {
    me.ecosystems.forEach((ecosystemData) => {
      const ecosystem = store.createNew();

      ecosystem.id = ecosystemData.id;
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
  const { loading, error, result, refetch } = useQuery(
    LOAD_USER,
    {},
    {
      fetchPolicy: "cache-and-network",
    }
  );

  watch(result, (queryResult: Ref<UserQueryQuery | undefined>) => {
    if (queryResult) {
      const queryResultRaw = unref(queryResult);
      if (queryResultRaw && queryResultRaw.me) {
        propagateEcosystems(queryResultRaw.me);
        propagateUser(queryResultRaw.me);
      }
    }
  });

  return { loading, error, refetch };
};

export const useSaveEcosystem = () => {
  const result = useMutation(SAVE_ECOSYSTEM, {
    update: (cache, { data: { saveEcosystem }}, options) => {
      let data = cache.readQuery({ query: LOAD_USER });
      let ecosystems = [...data.me.ecosystems];

      options.context?.idUpdate(saveEcosystem.ecosystem.id);
      ecosystems.splice(options.context?.index, 1);

      data = {
        ...data,
        me: {
          ...data.me,
          ecosystems: [...ecosystems, saveEcosystem.ecosystem],
        },
      };
      cache.writeQuery({ query: LOAD_USER, data });
    },
  });

  return {
    execute: result.mutate,
  };
};

export const useLoginUser = () => {
  const result = useMutation(LOGIN_USER, {
    // refetchQueries: [{ query: LOAD_USER }], // TODO Not working with the local query. Will work with real data, but it's better to use mutation result instead of refetch
    // updateQueries: [{ query: LOAD_USER }],
    update: (
      cache,
      {
        data: {
          login: { user },
        },
      }
    ) => {
      let data = cache.readQuery({ query: LOAD_USER });
      data = {
        ...data,
        me: user,
      };
      cache.writeQuery({ query: LOAD_USER, data });
    },
  });

  const { refetch } = fetchUser();

  result.onDone(({ data }) => {
    localStorage.setItem("token", _.get(data, "login.token", ""));

    refetch();
  });

  return {
    execute: result.mutate,
  };
};
