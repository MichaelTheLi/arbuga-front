<template>
  <div v-for="ecosystem in store.list" :key="ecosystem.name">
    <span>{{ ecosystem.name }}: {{ ecosystem.volume }}</span>
  </div>
</template>

<script lang="ts" setup>
import { useEcosystemsStore } from "@/stores/ecosystems";

const store = useEcosystemsStore();
</script>

<style scoped></style>
