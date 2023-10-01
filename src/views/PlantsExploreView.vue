<script setup lang="ts">
import { QInfiniteScroll, QPage, QSpinnerDots } from "quasar";
import { usePlantSearch } from "@/gateway/gateway";
import { ref, watch } from "vue";
import _ from "lodash";
import type { PlantCardData } from "@/components/Plants/PlantCard.vue";

const list = ref([] as PlantCardData[]);
const search = ref("");
const after = ref("");
const { options, lastCursor, loading, load } = usePlantSearch(
  search,
  after,
  25,
  0,
  true
);

watch(options, (newOptions) => {
  const newListItems = _.map(newOptions, (option) => {
    return {
      id: option.plant.id,
      title: option.plant.name,
      shortDescription: option.plant.scientific.species,
      description: option.plant.description,
      status: "compatible",
    };
  });
  list.value = _.concat(list.value, newListItems);
});
// load();
const onLoad = (index: any, done: any) => {
  after.value = lastCursor.value;
  load();

  watch(loading, (newValue) => {
    if (newValue == false) {
      done();
    }
  });
};
</script>

<template>
  <q-page padding>
    <h2>{{ $t("plants.explore.heading") }}</h2>
    <h4 class="text-warning">{{ $t("project.section_wip") }}</h4>
    <q-infinite-scroll @load="onLoad" :offset="1500" :debounce="0">
      <div v-for="(plants, index) in list" :key="index" class="caption">
        <h5>{{ plants.title }} ({{ plants.shortDescription }})</h5>
        <p class="text-body2">{{ plants.description }}</p>
        <hr />
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-page>
</template>
