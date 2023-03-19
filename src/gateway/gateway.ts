import { useLazyQuery, useMutation, useQuery } from "@vue/apollo-composable";
import _ from "lodash";
import { gql } from "@/__generated__";
import { computed, isRef, reactive, type Ref, unref, watch } from "vue";
import { type FishOption, useEcosystemsStore } from "@/stores/ecosystems";
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
        fish {
          fish {
            id
            name
            description
          }
          count
        }
      }
    }
  }
`);

// noinspection GraphQLUnresolvedReference
export const SEARCH_FISH = gql(/* GraphQL */ `
  query SearchFish($substring: String) {
    fishList(substring: $substring, first: 100) {
      edges {
        cursor
        node {
          id
          name
          description
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
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
          fish {
            fish {
              id
              name
              description
            }
            count
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
        fish {
          fish {
            id
            name
            description
          }
          count
        }
      }
      success
      error
    }
  }
`);

// noinspection GraphQLUnresolvedReference
export const ADD_FISH = gql(/* GraphQL */ `
  mutation AddFish($ecosystemId: ID!, $fishId: ID!) {
    addFishToEcosystem(ecosystemId: $ecosystemId, fishId: $fishId) {
      ecosystem {
        id

        fish {
          fish {
            id
            name
            description
          }
          count
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

      ecosystem.id = ecosystemData.id;
      ecosystem.name = ecosystemData.name;
      ecosystem.width = ecosystemData.aquarium.dimensions.width;
      ecosystem.length = ecosystemData.aquarium.dimensions.length;
      ecosystem.height = ecosystemData.aquarium.dimensions.height;
      if (ecosystemData.analysis) {
        ecosystem.analysis = ecosystemData.analysis;
      }

      if (ecosystemData.fish) {
        ecosystem.fish = ecosystemData.fish;
      }

      if (!store.current) {
        store.changeCurrent(ecosystem);
      } else if (ecosystem.id == store.current.id) {
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

export const useFishSearch = (input: Ref<string>, debounce: number) => {
  const { result, load } = searchFish(input, debounce);

  const options = computed(() => {
    if (!result.value) {
      return [];
    }

    return result.value.fishList.edges
      .filter((edge) => {
        return edge.node;
      })
      .map(({ node }): FishOption => {
        return {
          fish: {
            // @ts-ignore
            id: node.id,
            // @ts-ignore
            name: node.name,
            // @ts-ignore
            description: node.description,
          },
        };
      });
  });

  return { options, load };
};

export const searchFish = (substring: Ref<string>, debounce: number) => {
  const variables = reactive({
    substring: "",
    first: 1000,
    after: "",
  });

  const haveSubstring = computed(() => {
    return !!variables.substring;
  });

  if (isRef(substring)) {
    watch(substring, (newValue) => {
      variables.substring = newValue;
    });
  }

  const { loading, error, result, load } = useLazyQuery(
    SEARCH_FISH,
    variables,
    () => ({
      fetchPolicy: "network-only",
      debounce: debounce ? debounce : undefined,
      enabled: haveSubstring.value,
    })
  );

  return {
    result,
    loading,
    error,
    load,
  };
};

export const useSaveEcosystem = () => {
  const result = useMutation(SAVE_ECOSYSTEM, {
    update: (cache, { data }, options) => {
      if (!data || !data.saveEcosystem || !data.saveEcosystem.ecosystem) {
        return;
      }
      const currentCache = cache.readQuery({ query: LOAD_USER });

      const currentCacheEcosystems = currentCache?.me?.ecosystems;

      let ecosystems: typeof currentCacheEcosystems = [];
      if (currentCacheEcosystems) {
        ecosystems = [...currentCacheEcosystems];
      }

      const { ecosystem } = data.saveEcosystem;
      options.context?.idUpdate(ecosystem.id);
      ecosystems.splice(options.context?.index, 1);

      const newCache = {
        ...currentCache,
        me: {
          ...currentCache?.me,
          ecosystems: [...ecosystems, ecosystem],
        } as UserQueryQuery["me"],
      };
      cache.writeQuery({ query: LOAD_USER, data: newCache });
    },
  });

  return {
    execute: result.mutate,
  };
};

export const useAddFish = () => {
  const { mutate: addFish } = useMutation(ADD_FISH);

  return { addFish };
};

export const useLoginUser = () => {
  const result = useMutation(LOGIN_USER, {
    // refetchQueries: [{ query: LOAD_USER }], // TODO Not working with the local query. Will work with real data, but it's better to use mutation result instead of refetch
    // updateQueries: [{ query: LOAD_USER }],
    update: (cache, originalData) => {
      let data = cache.readQuery({ query: LOAD_USER });
      data = {
        ...data,
        me: originalData?.data?.login?.user,
      };
      cache.writeQuery({ query: LOAD_USER, data });
    },
  });

  result.onDone(({ data }) => {
    localStorage.setItem("token", _.get(data, "login.token", ""));
  });

  return {
    execute: result.mutate,
  };
};
