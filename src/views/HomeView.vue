<script setup lang="ts">
import EcosystemInfo from "@/components/EcosystemInfo.vue";
import { useEcosystemsStore } from "@/stores/ecosystems";
import { storeToRefs } from "pinia";
import { QPage } from "quasar";
import EditEcosystem from "@/components/EditEcosystem.vue";
const store = useEcosystemsStore();

let { current } = storeToRefs(store);

const onFishAdd = (optionId: string) => {
  console.log(optionId);
  // const foundFish = _.find(options, { fish: { id: optionId } });
  // if (foundFish) {
  //   const newFish = {
  //     id: optionId,
  //     name: foundFish.fish.name,
  //     count: 1,
  //   };
  //   current.value?.fish.push(newFish);
  // } else {
  //   console.error("Fish not found: " + optionId);
  // }
};
</script>

<template>
  <q-page padding>
    <div v-if="current">
      <EditEcosystem :ecosystem="current" />
      <h5 class="q-my-md">Parameters</h5>
      <EcosystemInfo :ecosystem="current" @fishAdd="onFishAdd" />
    </div>
    <div v-else>Select an ecosystem</div>
  </q-page>
</template>
