<script setup lang="ts">
import { QInfiniteScroll, QPage, QSpinnerDots, useMeta } from "quasar";
import { useFishSearch } from "@/gateway/gateway";
import { ref, watch } from "vue";
import _ from "lodash";
import type { FishListCardData } from "@/components/Fish/FishListCard.vue";
import FishListCard from "@/components/Fish/FishListCard.vue";
import { useI18n } from "vue-i18n";

const list = ref([] as FishListCardData[]);
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
  const newListItems = _.map(newOptions, (option): FishListCardData => {
    const { name, description, scientific, id, environment } = option.fish;

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

const i18n = useI18n();
useMeta({
  title: i18n.t("titles.fish_list"),
  meta: {
    description: {
      name: "description",
      content: i18n.t("descriptions.fish_list"),
    },
  },
});
</script>

<template>
  <q-page padding>
    <h2>{{ $t("fish.explore.heading") }}</h2>
    <h4 class="text-warning">{{ $t("project.section_wip") }}</h4>
    <q-infinite-scroll @load="onLoad" :offset="1500" :debounce="0">
      <div
        v-for="(fish, index) in list"
        :key="index"
        class="q-pa-md q-gutter-md"
      >
        <FishListCard :fish="fish" />
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-page>
</template>
