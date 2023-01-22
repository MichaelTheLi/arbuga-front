<script setup lang="ts">
import EditEcosystem from "@/components/EditEcosystem.vue";
import { useEcosystemsStore } from "@/stores/ecosystems";
import type { Ecosystem } from "@/stores/ecosystems";
import _ from "lodash";
import { storeToRefs } from "pinia";
import type { UnwrapRef } from "vue";

const store = useEcosystemsStore();

let { current } = storeToRefs(store);

const onsave = function (ecosystemData: UnwrapRef<Ecosystem>) {
  current.value = _.assign({}, ecosystemData);
};
</script>

<template>
  <main>
    <EditEcosystem v-if="current" :ecosystem="current" @save="onsave" />
    <div v-else>Select an ecosystem</div>
  </main>
</template>
