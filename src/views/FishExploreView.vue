<script setup lang="ts">
import { QInfiniteScroll, QPage, QSpinnerDots } from "quasar";
import { useFishSearch } from "@/gateway/gateway";
import { ref, watch } from "vue";
import _ from "lodash";
import type { FishCardData } from "@/components/Fish/FishCard.vue";

const list = ref([] as FishCardData[]);
const search = ref("");
const after = ref("");
const { options, lastCursor, loading, load } = useFishSearch(
  search,
  after,
  25,
  0,
  true
);

watch(options, (newOptions) => {
  const newListItems = _.map(newOptions, (option) => {
    return {
      id: option.fish.id,
      title: option.fish.name,
      shortDescription: option.fish.scientific.species,
      description: option.fish.description,
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
    <h2>{{ $t("fish.explore.heading") }}</h2>
    <h4 class="text-warning">{{ $t("project.section_wip") }}</h4>
    <q-infinite-scroll @load="onLoad" :offset="1500" :debounce="0">
      <div v-for="(fish, index) in list" :key="index" class="caption">
        <h5>{{ fish.title }} ({{ fish.shortDescription }})</h5>
        <p class="text-body2">{{ fish.description }}</p>
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
