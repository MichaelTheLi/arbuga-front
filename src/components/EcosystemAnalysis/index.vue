<template>
  <EcosystemAnalysis v-if="current" :analysis="current.analysis" />
  <div v-else>Select an ecosystem</div>
</template>

<script setup lang="ts">
import EcosystemAnalysis from "@/components/EcosystemAnalysis/EcosystemAnalysis.vue";
import { useEcosystemsStore } from "@/stores/ecosystems";
import { storeToRefs } from "pinia";

const store = useEcosystemsStore();
let { current } = storeToRefs(store);
</script>

<style scoped></style>
