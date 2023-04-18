<template>
  <div v-if="!current">{{ $t("ecosystem.please_select") }}</div>
  <div v-else-if="!current.analysis">
    {{ $t("ecosystem.analysis.not_available") }}
  </div>
  <div v-else><EcosystemAnalysis :analysis="current.analysis" /></div>
</template>

<script setup lang="ts">
import EcosystemAnalysis from "@/components/EcosystemAnalysis/EcosystemAnalysisInner.vue";
import { useEcosystemsStore } from "@/stores/ecosystems";
import { storeToRefs } from "pinia";

const store = useEcosystemsStore();
const { current } = storeToRefs(store);
</script>

<style scoped></style>
