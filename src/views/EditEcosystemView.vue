<script setup lang="ts">
import EditEcosystem from "@/components/EditEcosystem.vue";
import { useEcosystemsStore, Ecosystem } from "@/stores/ecosystems";
import _ from "lodash";
import { storeToRefs } from "pinia";

const store = useEcosystemsStore();

let { current } = storeToRefs(store);

const onsave = function (ecosystemData: Ecosystem) {
  current.value = _.assign({}, ecosystemData);
};
</script>

<template>
  <main>
    <EditEcosystem v-if="current" :ecosystem="current" @save="onsave" />
    <div v-else>Select an ecosystem</div>
  </main>
</template>
