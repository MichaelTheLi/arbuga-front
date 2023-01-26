import { defineStore } from "pinia";
import type { ComputedRef, Ref, UnwrapRef } from "vue";
import { computed, ref, unref } from "vue";

export interface Ecosystem {
  name: string;
  width: Ref<number>;
  height: Ref<number>;
  length: Ref<number>;
  volumeManual: Ref<number | null>;
  volume: ComputedRef<number>;
}

export interface EcosystemState {
  list: Ref<UnwrapRef<Ecosystem>[]>;
  createNew: (nameProvided?: string) => Ecosystem;
  current: Ref<UnwrapRef<Ecosystem>>;
  changeCurrent: (
    newCurrent:
      | Ecosystem
      | Ref<Ecosystem>
      | Ref<UnwrapRef<Ecosystem>>
      | UnwrapRef<Ecosystem>
  ) => void;
  addNew: (newEcosystem: Ecosystem) => void;
}

export const useEcosystemsStore = defineStore(
  "ecosystems",
  (): EcosystemState => {
    const createNew = (nameProvided = ""): Ecosystem => {
      const name = nameProvided;

      const width = ref(0);
      const height = ref(0);
      const length = ref(0);
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
      };
    };

    const list = ref([]) as Ref<UnwrapRef<Ecosystem>[]>;

    const currentRaw = list.value[0];
    const current = ref(currentRaw);

    const changeCurrent = (
      newCurrent:
        | Ecosystem
        | Ref<Ecosystem>
        | Ref<UnwrapRef<Ecosystem>>
        | UnwrapRef<Ecosystem>
    ) => {
      current.value = unref(newCurrent as Ref<UnwrapRef<Ecosystem>>);
    };

    const addNew = (newEcosystem: Ecosystem) => {
      // @ts-ignore
      list.value.push(newEcosystem);
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
