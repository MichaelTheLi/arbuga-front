import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface Ecosystem {
  name: string;
  width: number;
  height: number;
  length: number;
  volume: number;
}

export const useEcosystemsStore = defineStore("ecosystems", () => {
  const createNew = (nameProvided = "") => {
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
      volumeCubicCm,
      volumeLiters,
    };
  };

  const list = ref([
    createNew("Test 1"),
    createNew("Test 2"),
    createNew("Test 3"),
  ]);

  return {
    list: list,
    createNew: createNew,
  };
});
