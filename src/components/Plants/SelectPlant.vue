<template>
  <div class="select-plant">
    <q-input
      filled
      v-model="search"
      :label="$t('plants.search')"
      dense
      stack-label
      data-testid="plant-selector"
    />
    <PlantOptionsList :list="list" @add="onAdd" data-testid="plant-options" />
  </div>
</template>

<script setup lang="ts">
import { QInput } from "quasar";
import type { PlantCardData } from "@/components/Plants/PlantCard.vue";
import { ref, watch } from "vue";
import _ from "lodash";
import PlantOptionsList from "@/components/Plants/PlantsOptionsList.vue";
import { usePlantSearch } from "@/gateway/gateway";

const props = defineProps<{
  debounceTimeout: number;
}>();
const emit = defineEmits<{
  (e: "add", selected: PlantCardData): void;
}>();

const search = ref("");
const list = ref([] as PlantCardData[]);

const { options, load } = usePlantSearch(
  search,
  ref(""),
  100,
  props.debounceTimeout,
  false
);

watch(search, () => {
  if (search.value) {
    load();
  } else {
    list.value = [];
  }
});

watch(options, (newOptions) => {
  list.value = _.map(newOptions, (option) => {
    return {
      id: option.plant.id,
      title: option.plant.name,
      shortDescription: option.plant.scientific.species,
      description: option.plant.description,
      status: "compatible",
      mainImage: option.plant.specimenImageUrls[0],
    };
  });
});

const onAdd = (selected: PlantCardData) => {
  emit("add", selected);
};
</script>

<style scoped></style>
