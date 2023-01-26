<script setup lang="ts">
import EcosystemInfo from "@/components/EcosystemInfo.vue";
import { useEcosystemsStore } from "@/stores/ecosystems";
import { storeToRefs } from "pinia";
import { QPage } from "quasar";
const store = useEcosystemsStore();

let { current } = storeToRefs(store);
</script>

<template>
  <q-page padding>
    <EcosystemInfo v-if="current" :ecosystem="current" />
    <div v-else>Select an ecosystem</div>
  </q-page>
</template>
