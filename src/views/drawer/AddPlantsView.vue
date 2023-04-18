<script setup lang="ts">
import { useEcosystemsStore } from "@/stores/ecosystems";
import { useAddPlant } from "@/gateway/gateway";
import SelectPlant from "@/components/Plants/SelectPlant.vue";
import type { PlantCardData } from "@/components/Plants/PlantCard.vue";

const store = useEcosystemsStore();

const { addPlant } = useAddPlant();
const onAddPlant = (selectPlant: PlantCardData) => {
  if (store.current) {
    addPlant({
      ecosystemId: store.current.id,
      plantId: selectPlant.id,
    });
  } else {
    console.error("Cannot add plant, select ecosystem");
  }
};
</script>

<template>
  <h5 class="q-my-sm q-pa-sm">{{ $t("ecosystem.plants.add_header") }}</h5>
  <SelectPlant :debounce-timeout="300" @add="onAddPlant" />
</template>
