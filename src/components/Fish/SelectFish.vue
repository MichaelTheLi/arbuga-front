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
import { ref, watch } from "vue";
import _ from "lodash";
import FishOptionsList from "@/components/Fish/FishOptionsList.vue";
import { useFishSearch } from "@/gateway/gateway";

const props = defineProps<{
  debounceTimeout: number;
}>();
const emit = defineEmits<{
  (e: "add", option_id: string): void;
}>();

const search = ref("");
const list = ref([] as FishCardData[]);

const { options, load } = useFishSearch(search, props.debounceTimeout);

watch(search, () => {
  load();
});
watch(options, (newOptions) => {
  list.value = _.map(newOptions, (option) => {
    return {
      id: option.fish.id,
      title: option.fish.name,
      shortDescription: "temp",
      description: "temp long",
      status: "compatible",
    };
  });
});

const onAdd = (selected: FishCardData) => {
  emit("add", selected);
  search.value = "";
};
</script>

<style scoped></style>
