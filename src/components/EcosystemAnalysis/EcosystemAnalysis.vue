<template>
  <EcosystemAnalysis
    v-if="current && current.analysis"
    :analysis="current.analysis"
  />
  <div v-else>No analysis available. Please select or create an ecosystem</div>
</template>

<script setup lang="ts">
import EcosystemAnalysis from "@/components/EcosystemAnalysis/EcosystemAnalysisInner.vue";
import { useEcosystemsStore } from "@/stores/ecosystems";
import { storeToRefs } from "pinia";

const store = useEcosystemsStore();
let { current } = storeToRefs(store);
</script>

<style scoped></style>
