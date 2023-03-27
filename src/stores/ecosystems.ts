import { defineStore } from "pinia";
import type { Ref, UnwrapRef } from "vue";
import { computed, ref, unref, watch } from "vue";
import _ from "lodash";
import { useSaveEcosystem } from "@/gateway/gateway";
// @ts-ignore
import { deepUnref } from "vue-deepunref";

export interface Ecosystem {
  id: string;
  name: string;
  width: number | null;
  height: number | null;
  length: number | null;
  volumeManual: number | null;
  fish: AquariumFish[];
  plants: AquariumPlant[];
  analysis: EcosystemAnalysis[] | null;
}

export interface AquariumFish {
  fish: Fish;
  count: number;
}

export interface Fish {
  id: string;
  name: string;
  description: string;
}

export interface FishOption {
  fish: Fish;
}

export interface AquariumPlant {
  plant: Plant;
  count: number;
}

export interface Plant {
  id: string;
  name: string;
}

export interface PlantOption {
  plant: Plant;
}

export interface EcosystemAnalysis {
  id: string;
  name: string;
  description: string;
  status: string /* enum actually */;
  messages: EcosystemAnalysisMessage[] | [] | null | undefined;
}

export interface EcosystemAnalysisMessage {
  id: string;
  name: string;
  description: string;
  status: string /* enum actually */;
}

export interface EcosystemState {
  list: Ref<UnwrapRef<Ecosystem>[]>;
  createNew: (nameProvided?: string) => Ecosystem;
  current: Ref<UnwrapRef<Ecosystem> | null>;
  changeCurrent: (
    newCurrent:
      | Ecosystem
      | Ref<Ecosystem>
      | Ref<UnwrapRef<Ecosystem>>
      | UnwrapRef<Ecosystem>
      | null
  ) => void;
  addNew: (newEcosystem: Ecosystem) => void;
}

export const useEcosystemDynamicVolume = (
  _ecosystem: Ref<Ecosystem> | Ecosystem
) => {
  const ecosystem = computed(() => unref(_ecosystem));

  const volumeCubicCm = computed(
    () =>
      (ecosystem.value.width || 0) *
      (ecosystem.value.height || 0) *
      (ecosystem.value.length || 0)
  );
  const volumeLiters = computed(() => volumeCubicCm.value / 1000);
  const volume = computed(() => {
    return ecosystem.value.volumeManual || volumeLiters.value;
  });

  return {
    volume,
  };
};

export const useEcosystemsStore = defineStore(
  "ecosystems",
  (): EcosystemState => {
    const createNew = (nameProvided = ""): Ecosystem => {
      const name = nameProvided;

      const id = "";
      const width = null as number | null;
      const height = null as number | null;
      const length = null as number | null;
      const analysis = null;
      const volumeManual = null as number | null;

      const fish = [] as AquariumFish[];
      const plants = [] as AquariumPlant[];

      return {
        id,
        name,
        width,
        height,
        length,
        volumeManual,
        fish,
        plants,
        analysis,
      };
    };

    const list = ref([]) as Ref<UnwrapRef<Ecosystem>[]>;

    const currentRaw = list.value[0] as UnwrapRef<Ecosystem> | null;
    const current = ref(currentRaw);

    const changeCurrent = (
      newCurrent:
        | Ecosystem
        | Ref<Ecosystem>
        | Ref<UnwrapRef<Ecosystem>>
        | UnwrapRef<Ecosystem>
        | null
    ) => {
      current.value = unref(newCurrent as Ref<UnwrapRef<Ecosystem>>);
    };

    const { execute: _executeSaveEcosystem } = useSaveEcosystem();
    const executeSaveEcosystem = _.debounce(_executeSaveEcosystem, 1000);

    const addNew = (newEcosystemToAdd: Ecosystem) => {
      let index = _.findIndex(list.value, { id: newEcosystemToAdd.id });

      if (index !== -1) {
        // @ts-ignore
        list.value[index] = newEcosystemToAdd;
      } else {
        // @ts-ignore
        index = list.value.push(newEcosystemToAdd) - 1;
      }

      const variablesFromEcosystem = (
        ecosystem: UnwrapRef<Ecosystem> | Ecosystem
      ) => {
        const variables = {
          id: undefined as string | undefined,
          ecosystem: {
            name: ecosystem.name,
            aquarium: {
              dimensions: {
                width: unref(ecosystem.width) || 0,
                height: unref(ecosystem.height) || 0,
                length: unref(ecosystem.length) || 0,
              },
            },
          },
        };

        if (ecosystem.id) {
          variables.id = ecosystem.id;
        }

        return variables;
      };
      let oldVariables = variablesFromEcosystem(deepUnref(newEcosystemToAdd));

      watch(list.value[index], (newEcosystem) => {
        const newVariables = variablesFromEcosystem(deepUnref(newEcosystem));

        if (!_.isEqual(oldVariables.ecosystem, newVariables.ecosystem)) {
          // TODO Current is broken by the new object
          executeSaveEcosystem(newVariables, {
            context: {
              index,
              idUpdate: (newId: string) => {
                newEcosystem.id = newId;
              },
            },
          });
          oldVariables = newVariables;
        }
      });
    };

    return {
      list,
      createNew,
      current,
      changeCurrent,
      addNew,
    };
  }
);
