<template>
  <p>Name: {{ ecosystem.name }}</p>
  <p>Volume: {{ ecosystem.volume }}l</p>
  <p>Dimensions: {{ ecosystem.length }}cm x {{ ecosystem.width }}cm x {{ ecosystem.height }}cm</p>
</template>

<script setup lang="ts">
import { useEcosystemsStore } from "@/stores/ecosystems";
const store = useEcosystemsStore();

const ecosystem = store.current;
</script>

<style scoped></style>
