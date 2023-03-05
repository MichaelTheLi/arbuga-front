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
  {
    fish: {
      id: "test4",
      name: "Option 4",
    },
  },
  {
    fish: {
      id: "test5",
      name: "Option 5",
    },
  },
  {
    fish: {
      id: "test6",
      name: "Option 6",
    },
  },
  {
    fish: {
      id: "test7",
      name: "Option 7",
    },
  },
  {
    fish: {
      id: "test8",
      name: "Option 8",
    },
  },
  {
    fish: {
      id: "test9",
      name: "Option 9",
    },
  },
];

const stubFishFinder = async (input: string): Promise<FishOption[]> => {
  if (!input) {
    return [];
  }

  const strRegExPattern = `.*?${input}.*?`;
  const regex = new RegExp(strRegExPattern, "g");
  return _.filter(options, (option) => {
    return !!option.fish.name.match(regex);
  });
};

const onFishAdd = (optionId: string) => {
  const foundFish = _.find(options, { fish: { id: optionId } });
  if (foundFish) {
    const newFish = {
      id: optionId,
      name: foundFish.fish.name,
      count: 1,
    };
    current.value?.fish.push(newFish);
  } else {
    console.error("Fish not found: " + optionId);
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
        :fish-finder="stubFishFinder"
        @fishAdd="onFishAdd"
      />
    </div>
    <div v-else>Select an ecosystem</div>
  </q-page>
</template>
