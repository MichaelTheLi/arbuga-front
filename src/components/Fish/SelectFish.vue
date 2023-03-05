<template>
  <div class="select-fish">
    <q-input
      filled
      v-model="search"
      label="Search"
      stack-label
      data-testid="fish-selector"
    />
    <FishOptionsList :list="list" @add="onAdd" data-testid="fish-options" />
  </div>
</template>

<script setup lang="ts">
import { QInput } from "quasar";
import type { FishCardData } from "@/components/Fish/FishCard.vue";
import { FishOption } from "@/stores/ecosystems";
import { ref, watch } from "vue";
import _ from "lodash";
import FishOptionsList from "@/components/Fish/FishOptionsList.vue";

export type FishFinder = (input: string) => Promise<FishOption[]>;

const props = defineProps<{
  fishFinder: FishFinder;
  debounceTimeout: number;
}>();
const emit = defineEmits<{
  (e: "add", option_id: string): void;
}>();

const search = ref("");
const list = ref([] as FishCardData[]);
let finder = (value: string) => {
  props.fishFinder(value).then((options) => {
    list.value = _.map(options, (option) => {
      return {
        id: option.fish.id,
        title: option.fish.name,
        shortDescription: "temp",
        description: "temp long",
        status: "compatible",
      };
    });
  });
};

if (props.debounceTimeout > 0) {
  finder = _.debounce(finder, props.debounceTimeout);
}

watch(search, (newVal) => {
  finder(newVal);
});

const onAdd = (selected: FishCardData) => {
  emit("add", selected);
  search.value = "";
};
</script>

<style scoped></style>
