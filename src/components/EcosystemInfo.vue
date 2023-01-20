<template>
  <p>Name: {{ current.name }}</p>
  <p>Volume: {{ current.volume }}l</p>
  <p>Dimensions: {{ current.length }}cm x {{ current.width }}cm x {{ current.height }}cm</p>
</template>

<script setup lang="ts">
import { useEcosystemsStore } from "@/stores/ecosystems";
import { storeToRefs } from "pinia";
const store = useEcosystemsStore();


let { current } = storeToRefs(store);
</script>

<style scoped></style>
