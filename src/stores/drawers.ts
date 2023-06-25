import { defineStore } from "pinia";
import type { Ref } from "vue";
import { ref } from "vue";

export interface DrawersState {
  left: Ref<boolean>;
  right: Ref<boolean>;
}

export const useDrawersStore = defineStore("drawers", (): DrawersState => {
  const left = ref(false);
  const right = ref(false);

  return {
    left,
    right,
  };
});
