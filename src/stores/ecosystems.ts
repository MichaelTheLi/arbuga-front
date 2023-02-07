import { deepUnref } from "vue-deepunref";
import { defineStore } from "pinia";
import type { ComputedRef, Ref, UnwrapRef } from "vue";
import { computed, ref, toRaw, unref } from "vue";

export interface Ecosystem {
  name: string;
  width: Ref<number>;
  height: Ref<number>;
  length: Ref<number>;
  volumeManual: Ref<number | null>;
  volume: ComputedRef<number>;
  analysis: Ref<EcosystemAnalysis | null>;
}

export interface EcosystemAnalysis {
  id: string;
  name: string;
  description: string;
  status: string /* enum actually */;
  messages: EcosystemAnalysisMessage[];
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
  rememberedCurrent: Ref<UnwrapRef<Ecosystem> | null>;
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
}

export const useEcosystemsStore = defineStore(
  "ecosystems",
  (): EcosystemState => {
    const createNew = (nameProvided = ""): Ecosystem => {
      const name = nameProvided;

      const width = ref(0);
      const height = ref(0);
      const length = ref(0);
      const analysis = ref(null);
      const volumeManual = ref(null as number | null);
      const volumeCubicCm = computed(
        () => width.value * height.value * length.value
      );
      const volumeLiters = computed(() => volumeCubicCm.value / 1000);
      const volume = computed(() => volumeManual.value || volumeLiters.value);

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
    };
  }
);
