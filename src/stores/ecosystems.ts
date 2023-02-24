import { defineStore } from "pinia";
import type { ComputedRef, Ref, UnwrapRef } from "vue";
import { computed, ref, unref, watch } from "vue";
import _ from "lodash";
import { useSaveEcosystem } from "@/gateway/gateway";
// @ts-ignore
import { deepUnref } from "vue-deepunref";

export interface Ecosystem {
  id: string;
  name: string;
  width: Ref<number | null>;
  height: Ref<number | null>;
  length: Ref<number | null>;
  volumeManual: Ref<number | null>;
  volume: ComputedRef<number>;
  analysis: Ref<EcosystemAnalysis[] | null>;
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

export const useEcosystemsStore = defineStore(
  "ecosystems",
  (): EcosystemState => {
    const createNew = (nameProvided = ""): Ecosystem => {
      const name = nameProvided;

      const id = "";
      const width = ref(null as number | null);
      const height = ref(null as number | null);
      const length = ref(null as number | null);
      const analysis = ref(null);
      const volumeManual = ref(null as number | null);
      const volumeCubicCm = computed(
        () => (width.value || 0) * (height.value || 0) * (length.value || 0)
      );
      const volumeLiters = computed(() => volumeCubicCm.value / 1000);
      const volume = computed(() => volumeManual.value || volumeLiters.value);

      const convertToInt = (value: number | string | null): number | null => {
        if (typeof value === "string") {
          value = parseFloat(value);
        }

        return value ? value : null;
      };

      watch(width, (newValue) => (width.value = convertToInt(newValue)));
      watch(height, (newValue) => (height.value = convertToInt(newValue)));
      watch(length, (newValue) => (length.value = convertToInt(newValue)));
      watch(
        volumeManual,
        (newValue) => (volumeManual.value = convertToInt(newValue))
      );

      return {
        id,
        name,
        width,
        height,
        length,
        volume,
        volumeManual,
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
