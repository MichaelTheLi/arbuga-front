// @ts-ignore
import { deepUnref } from "vue-deepunref";
import { defineStore } from "pinia";
import type { ComputedRef, Ref, UnwrapRef } from "vue";
import { computed, ref, unref, watch } from "vue";
import _ from "lodash";

export interface Ecosystem {
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
  rememberedCurrent: Ref<UnwrapRef<Ecosystem> | null>; // TODO Make this part of the list, maybe EcosystemItem which stores both state and initialState
  changeCurrent: (
    newCurrent:
      | Ecosystem
      | Ref<Ecosystem>
      | Ref<UnwrapRef<Ecosystem>>
      | UnwrapRef<Ecosystem>
  ) => void;
  addNew: (newEcosystem: Ecosystem) => void;
  restoreCurrent: () => void;
  rememberCurrent: () => void;
  currentChanged: ComputedRef<boolean>;
}

export const useEcosystemsStore = defineStore(
  "ecosystems",
  (): EcosystemState => {
    const createNew = (nameProvided = ""): Ecosystem => {
      const name = nameProvided;

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
    const rememberedCurrentRaw = null as UnwrapRef<Ecosystem> | null;
    const rememberedCurrent = ref(rememberedCurrentRaw);

    const changeCurrent = (
      newCurrent:
        | Ecosystem
        | Ref<Ecosystem>
        | Ref<UnwrapRef<Ecosystem>>
        | UnwrapRef<Ecosystem>
    ) => {
      current.value = unref(newCurrent as Ref<UnwrapRef<Ecosystem>>);
      rememberCurrent();
    };

    const currentChanged = computed(() => {
      return !_.isEqual(
        _.omit(deepUnref(current.value), ["analysis"]),
        _.omit(deepUnref(rememberedCurrent.value), ["analysis"])
      );
    });

    const restoreCurrent = () => {
      if (current.value) {
        Object.assign(current.value, rememberedCurrent.value);
      }
    };

    const rememberCurrent = () => {
      rememberedCurrent.value = { ...deepUnref(current.value) };
    };

    const addNew = (newEcosystem: Ecosystem) => {
      // @ts-ignore
      list.value.push(newEcosystem);
    };

    return {
      list,
      createNew,
      current,
      rememberedCurrent,
      changeCurrent,
      addNew,
      restoreCurrent,
      rememberCurrent,
      currentChanged,
    };
  }
);
