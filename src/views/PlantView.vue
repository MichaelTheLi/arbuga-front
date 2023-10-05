<script setup lang="ts">
import { QPage, QSpinnerDots } from "quasar";
import PlantDetails, {
  type PlantDetailsData,
} from "@/components/Plants/PlantDetails.vue";
import { useGetPlant } from "@/gateway/gateway";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

let id = "";
if (typeof route.params.id == "string") {
  id = route.params.id;
}

const { result, loading, error } = useGetPlant(id);

const plant = computed((): PlantDetailsData => {
  const rawPlant = result.value?.plant;

  if (!rawPlant) {
    throw Error("Can't convert plant");
  }

  return {
    id: rawPlant.id,
    description: rawPlant.description,
    title: rawPlant.name,
    scientificName: rawPlant.scientific.species,
    environment: rawPlant.environment,
  };
});
</script>

<template>
  <q-page padding>
    <div v-if="result && !loading">
      <PlantDetails :plant="plant" />
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
