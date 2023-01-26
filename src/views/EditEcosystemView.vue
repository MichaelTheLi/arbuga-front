<script setup lang="ts">
import EditEcosystem from "@/components/EditEcosystem.vue";
import { useEcosystemsStore } from "@/stores/ecosystems";
import type { Ecosystem } from "@/stores/ecosystems";
import _ from "lodash";
import { storeToRefs } from "pinia";
import type { UnwrapRef } from "vue";
import { QPage } from "quasar";

const store = useEcosystemsStore();

let { current } = storeToRefs(store);

const onsave = function (ecosystemData: UnwrapRef<Ecosystem>) {
  current.value = _.assign({}, ecosystemData);
};
</script>

<template>
  <q-page padding>
    <EditEcosystem v-if="current" :ecosystem="current" @save="onsave" />
    <div v-else>Select an ecosystem</div>
  </q-page>
</template>
