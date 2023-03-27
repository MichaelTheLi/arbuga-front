<script setup lang="ts">
import EcosystemInfo from "@/components/EcosystemInfo.vue";
import { useEcosystemsStore } from "@/stores/ecosystems";
import { storeToRefs } from "pinia";
import { QPage } from "quasar";
import EditEcosystem from "@/components/EditEcosystem.vue";
import { useAddFish, useAddPlant } from "@/gateway/gateway";
const store = useEcosystemsStore();

const { addFish } = useAddFish();
const { addPlant } = useAddPlant();
let { current } = storeToRefs(store);

const onFishAdd = (optionId: string) => {
  if (store.current) {
    addFish({
      ecosystemId: store.current.id,
      fishId: optionId,
    });
  } else {
    console.error("Cannot add fish, select ecosystem");
  }
};
const onPlantAdd = (optionId: string) => {
  if (store.current) {
    addPlant({
      ecosystemId: store.current.id,
      plantId: optionId,
    });
  } else {
    console.error("Cannot add plant, select ecosystem");
  }
};
</script>

<template>
  <q-page padding>
    <div v-if="current">
      <EditEcosystem :ecosystem="current" />
      <h5 class="q-my-md">Parameters</h5>
      <EcosystemInfo
        :ecosystem="current"
        @fishAdd="onFishAdd"
        @plantAdd="onPlantAdd"
      />
    </div>
    <div v-else>Select an ecosystem</div>
  </q-page>
</template>
