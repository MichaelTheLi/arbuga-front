import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Ref, ComputedRef } from "vue";

export interface Ecosystem {
  name: string;
  width: Ref<number>;
  height: Ref<number>;
  length: Ref<number>;
  volumeManual: Ref<number>;
  volume: ComputedRef<number>;
}

export const useEcosystemsStore = defineStore("ecosystems", () => {
  const createNew = (nameProvided = ""): Ecosystem => {
    const name = nameProvided;

    const width = ref(10);
    const height = ref(20);
    const length = ref(10);
    const volumeManual = ref(0);
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

  const initialList = [
    createNew("Test 1") as Ecosystem,
    createNew("Test 2"),
    createNew("Test 3"),
  ];
  const list = ref(initialList);

  const current = ref(list.value[0]);

  const changeCurrent = (newCurrent: Ecosystem) => {
    current.value = newCurrent;
  };

  return {
    list,
    createNew,
    current,
    changeCurrent,
  };
});
