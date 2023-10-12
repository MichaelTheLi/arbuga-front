<script setup lang="ts">
import { QPage, QSpinnerDots, useMeta } from "quasar";
import FishDetails, {
  type FishDetailsData,
} from "@/components/Fish/FishDetails.vue";
import { useGetFish } from "@/gateway/gateway";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

let id = "";
if (typeof route.params.id == "string") {
  id = route.params.id;
}

const { result, loading, error } = useGetFish(id);

const fish = computed((): FishDetailsData => {
  const rawFish = result.value?.fish;

  if (!rawFish) {
    return {};
  }

  return {
    id: rawFish.id,
    description: rawFish.description,
    title: rawFish.name,
    scientificName: rawFish.scientific.species,
    environment: rawFish.environment,
  };
});

useMeta(() => {
  return {
    title: fish.value?.title,
    meta: {
      description: {
        name: "description",
        content: fish.value?.description,
      },
      keywords: {
        name: "keywords",
        content: fish.value?.scientificName,
      },
    },
  };
});
</script>

<template>
  <q-page padding>
    <div v-if="result && !loading">
      <FishDetails :fish="fish" />
    </div>
    <div v-else-if="error">
      {{ error.message }}
    </div>
    <div v-else>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </div>
  </q-page>
</template>
