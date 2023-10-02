<script setup lang="ts">
import { QInfiniteScroll, QPage, QSpinnerDots } from "quasar";
import { usePlantSearch } from "@/gateway/gateway";
import { ref, watch } from "vue";
import _ from "lodash";
import type { PlantListCardData } from "@/components/Plants/PlantListCard.vue";
import PlantListCard from "@/components/Plants/PlantListCard.vue";

const list = ref([] as PlantListCardData[]);
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
  const newListItems = _.map(newOptions, (option): PlantListCardData => {
    const { name, description, scientific, id, environment } = option.plant;

    return {
      id: id,
      title: name,
      scientificName: scientific.species,
      description: description,
      environment: environment,
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
      <div
        v-for="(plant, index) in list"
        :key="index"
        class="q-pa-md q-gutter-md"
      >
        <PlantListCard :plant="plant" />
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-page>
</template>
