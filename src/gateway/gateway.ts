import { useLazyQuery, useMutation, useQuery } from "@vue/apollo-composable";
import _ from "lodash";
import { gql, useFragment } from "@/__generated__";
import { computed, isRef, reactive, type Ref, unref, watch } from "vue";
import {
  type FishOption,
  type PlantOption,
  useEcosystemsStore,
} from "@/stores/ecosystems";
import { useUserStore } from "@/stores/user";
import type { UserQueryQuery } from "@/__generated__/graphql";
import { useApolloClient } from "@vue/apollo-composable";

export const EcosystemFragment = gql(/* GraphQL */ `
  fragment FullEcosystem on Ecosystem {
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
      name
      serviceName
      description
      status
      messages {
        name
        serviceName
        parameters {
          name
          value
          type
        }
        description
        status
      }
    }
    fish {
      fish {
        id
        name
        scientific {
          species
        }
        description
      }
      count
    }
    plants {
      plant {
        id
        name
        scientific {
          species
        }
        description
      }
      count
    }
    waterReplacement {
      water {
        chemical {
          ph
          gh
          kh
          ammonia
          nitrite
          nitrate
        }
        temperature
      }
    }
    equipment {
      filters {
        flow
      }
      heaters {
        power
      }
      lightingItems {
        lux
      }
    }
  }
`);

// noinspection GraphQLUnresolvedReference
export const LOAD_USER = gql(/* GraphQL */ `
  query userQuery {
    me {
      id
      login
      name
      ecosystems {
        ...FullEcosystem
      }
    }
  }
`);

// noinspection GraphQLUnresolvedReference
export const SEARCH_FISH = gql(/* GraphQL */ `
  query SearchFish($substring: String, $first: Int, $after: ID) {
    fishList(substring: $substring, first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          name
          scientific {
            species
          }
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
export const SEARCH_PLANT = gql(/* GraphQL */ `
  query SearchPlant($substring: String) {
    plantList(substring: $substring, first: 100) {
      edges {
        cursor
        node {
          id
          name
          scientific {
            species
          }
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
          ...FullEcosystem
        }
      }
    }
  }
`);

// noinspection GraphQLUnresolvedReference
export const REGISTER_USER = gql(/* GraphQL */ `
  mutation userRegister($login: String!, $password: String!, $name: String!) {
    register(login: $login, password: $password, name: $name) {
      token
      user {
        id
        login
        name
        ecosystems {
          ...FullEcosystem
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
        ...FullEcosystem
      }
      success
      error
    }
  }
`);

// noinspection GraphQLUnresolvedReference
export const REMOVE_ECOSYSTEM = gql(/* GraphQL */ `
  mutation REMOVE_ECOSYSTEM($id: ID!) {
    removeEcosystem(id: $id)
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

// noinspection GraphQLUnresolvedReference
export const UPDATE_FISH = gql(/* GraphQL */ `
  mutation updateFish($ecosystemId: ID!, $fishId: ID!, $count: Int!) {
    updateFishInEcosystem(
      ecosystemId: $ecosystemId
      fishId: $fishId
      count: $count
    ) {
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

// noinspection GraphQLUnresolvedReference
export const ADD_PLANT = gql(/* GraphQL */ `
  mutation AddPlant($ecosystemId: ID!, $plantId: ID!) {
    addPlantToEcosystem(ecosystemId: $ecosystemId, plantId: $plantId) {
      ecosystem {
        id

        plants {
          plant {
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
export const UPDATE_PLANT = gql(/* GraphQL */ `
  mutation UpdatePlant($ecosystemId: ID!, $plantId: ID!, $count: Int!) {
    updatePlantInEcosystem(
      ecosystemId: $ecosystemId
      plantId: $plantId
      count: $count
    ) {
      ecosystem {
        id

        plants {
          plant {
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
    me.ecosystems.forEach((ecosystemDataRaw) => {
      const ecosystemData = useFragment(EcosystemFragment, ecosystemDataRaw);
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

      if (ecosystemData.plants) {
        ecosystem.plants = ecosystemData.plants;
      }

      if (
        ecosystemData.waterReplacement &&
        ecosystemData.waterReplacement.water
      ) {
        const water = ecosystemData.waterReplacement.water;

        ecosystem.waterReplacement = {
          waterParameters: {
            ph: parseFloat(water.chemical.ph.toFixed(1)),
            gh: water.chemical.gh,
            kh: water.chemical.kh,
            temperature: parseFloat(water.temperature.toFixed(1)),
          },
        };
      }

      if (ecosystemData.equipment) {
        ecosystem.equipment = {
          filtersFlow: _.reduce(
            ecosystemData.equipment.filters,
            (sum, { flow }) => sum + flow,
            0
          ),
          heatersPower: _.reduce(
            ecosystemData.equipment.heaters,
            (sum, { power }) => sum + power,
            0
          ),
          lightingLux: _.reduce(
            ecosystemData.equipment.lightingItems,
            (sum, { lux }) => sum + lux,
            0
          ),
        };
      }

      if (!store.current) {
        if (
          !store.lastKnownCurrentId ||
          store.lastKnownCurrentId === ecosystem.id
        ) {
          store.changeCurrent(ecosystem);
        }
      } else if (ecosystem.id == store.current.id) {
        store.changeCurrent(ecosystem);
      }

      store.addNew(ecosystem);
    });

    if (!store.current && store.list[0]) {
      store.changeCurrent(store.list[0]);
    }
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

  const ecosystemsStore = useEcosystemsStore();
  const userStore = useUserStore();

  const clearStores = () => {
    ecosystemsStore.list = [];
    ecosystemsStore.current = null;
    userStore.user = null;
  };
  watch(result, (queryResult: Ref<UserQueryQuery | undefined>) => {
    if (queryResult) {
      const queryResultRaw = unref(queryResult);
      if (queryResultRaw && queryResultRaw.me) {
        propagateEcosystems(queryResultRaw.me);
        propagateUser(queryResultRaw.me);
      } else {
        clearStores();
      }
    } else {
      clearStores();
    }
  });

  return { loading, error, refetch };
};

export const useFishSearch = (
  input: Ref<string>,
  after: Ref<string>,
  first: number,
  debounce: number,
  emptyAllowed: boolean
) => {
  const { result, loading, load } = searchFish(
    input,
    after,
    first,
    debounce,
    emptyAllowed
  );

  const lastCursor = computed(() => {
    if (!result.value) {
      return "";
    }

    return result.value.fishList.pageInfo.endCursor;
  });

  const options = computed(() => {
    if (!result.value) {
      return [];
    }

    return result.value.fishList.edges
      .filter((edge) => {
        return edge.node;
      })
      .map(({ node }): FishOption => {
        if (!node) {
          // @ts-ignore
          return null;
        }

        return {
          fish: {
            id: node.id,
            name: node.name,
            scientific: node.scientific,
            description: node.description,
          },
        };
      });
  });

  return { options, loading, lastCursor, load };
};

export const searchFish = (
  substring: Ref<string>,
  after: Ref<string>,
  first: number,
  debounce: number,
  emptyAllowed: boolean
) => {
  const variables = reactive({
    substring: "",
    first: first || 100,
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

  if (isRef(after)) {
    watch(after, (newValue) => {
      variables.after = newValue;
    });
  }

  const { loading, error, result, load } = useLazyQuery(
    SEARCH_FISH,
    variables,
    () => ({
      fetchPolicy: "network-only",
      debounce: debounce ? debounce : undefined,
      enabled: emptyAllowed || haveSubstring.value,
    })
  );

  return {
    result,
    loading,
    error,
    load,
  };
};

export const usePlantSearch = (input: Ref<string>, debounce: number) => {
  const { result, load } = searchPlant(input, debounce);

  const options = computed(() => {
    if (!result.value) {
      return [];
    }

    return result.value.plantList.edges
      .filter((edge) => {
        return edge.node;
      })
      .map(({ node }): PlantOption => {
        if (!node) {
          // @ts-ignore
          return null;
        }
        return {
          plant: {
            id: node.id,
            name: node.name,
            scientific: node.scientific,
            description: node.description,
          },
        };
      });
  });

  return { options, load };
};

export const searchPlant = (substring: Ref<string>, debounce: number) => {
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
    SEARCH_PLANT,
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

      const ecosystem = useFragment(
        EcosystemFragment,
        data.saveEcosystem.ecosystem
      );
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

export const useRemoveEcosystem = () => {
  const result = useMutation(REMOVE_ECOSYSTEM, {
    update: (cache, { data }, options) => {
      if (!data || !data.removeEcosystem) {
        return;
      }
      const currentCache = cache.readQuery({ query: LOAD_USER });

      const currentCacheEcosystems = currentCache?.me?.ecosystems;

      let ecosystems: typeof currentCacheEcosystems = [];
      if (currentCacheEcosystems) {
        ecosystems = [...currentCacheEcosystems];
      }

      _.remove(ecosystems, (ecosystemRaw) => {
        const ecosystem = useFragment(EcosystemFragment, ecosystemRaw);
        return options.variables?.id === ecosystem.id;
      });

      const newCache = {
        ...currentCache,
        me: {
          ...currentCache?.me,
          ecosystems: ecosystems,
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
  const { mutate: addFish } = useMutation(ADD_FISH, {
    refetchQueries: [{ query: LOAD_USER }],
  });

  return { addFish };
};

export const useAddPlant = () => {
  const { mutate: addPlant } = useMutation(ADD_PLANT, {
    refetchQueries: [{ query: LOAD_USER }],
  });

  return { addPlant };
};

export const useUpdateFish = () => {
  const { mutate: updateFish } = useMutation(UPDATE_FISH, {
    refetchQueries: [{ query: LOAD_USER }],
  });

  return { updateFish };
};

export const useUpdatePlant = () => {
  const { mutate: updatePlant } = useMutation(UPDATE_PLANT, {
    refetchQueries: [{ query: LOAD_USER }],
  });

  return { updatePlant };
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

export const useLogoutUser = () => {
  const { resolveClient } = useApolloClient();

  return {
    execute: () => {
      localStorage.removeItem("token");
      const client = resolveClient();
      // noinspection JSIgnoredPromiseFromCall
      client.resetStore();
    },
  };
};

export const useRegisterUser = () => {
  const result = useMutation(REGISTER_USER, {
    update: (cache, originalData) => {
      let data = cache.readQuery({ query: LOAD_USER });
      data = {
        ...data,
        me: originalData?.data?.register?.user,
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
