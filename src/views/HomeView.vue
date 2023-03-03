<script setup lang="ts">
import EcosystemInfo from "@/components/EcosystemInfo.vue";
import { FishOption, useEcosystemsStore } from "@/stores/ecosystems";
import { storeToRefs } from "pinia";
import { QPage } from "quasar";
import EditEcosystem from "@/components/EditEcosystem.vue";
import _ from "lodash";
const store = useEcosystemsStore();

let { current } = storeToRefs(store);

const options = [
  {
    fish: {
      id: "test1",
      name: "Option 1",
    },
  },
  {
    fish: {
      id: "test2",
      name: "Option 2",
    },
  },
  {
    fish: {
      id: "test3",
      name: "Option 3",
    },
  },
];
const stubFishFinder = (input: string): FishOption[] => {
  if (!input) {
    return [];
  }

  const strRegExPattern = `.*?${input}.*?`;
  const regex = new RegExp(strRegExPattern, "g");
  return _.filter(options, (option) => {
    return !!option.fish.name.match(regex);
  });
};
</script>

<template>
  <q-page padding>
    <div v-if="current">
      <EditEcosystem :ecosystem="current" />
      <h5 class="q-my-md">Parameters</h5>
      <EcosystemInfo :ecosystem="current" :fish-finder="stubFishFinder" />
    </div>
    <div v-else>Select an ecosystem</div>
  </q-page>
</template>
