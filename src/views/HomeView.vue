<script setup lang="ts">
import EcosystemInfo from "@/components/EcosystemInfo.vue";
import { useEcosystemsStore } from "@/stores/ecosystems";
import { storeToRefs } from "pinia";
const store = useEcosystemsStore();

let { current } = storeToRefs(store);
</script>

<template>
  <main>
    <EcosystemInfo v-if="current" :ecosystem="current" />
    <div v-else>Select an ecosystem</div>
  </main>
</template>
