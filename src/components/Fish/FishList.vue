<template>
  <div v-if="list">
    <div
      v-for="(element, index) in list"
      :key="index"
      data-testid="fish-list-item"
    >
      {{ element.count }} x {{ element.fish.name }}
    </div>
  </div>
  <div v-else>{{ $t("ecosystem.fish.empty") }}</div>
</template>

<script setup lang="ts">
import type { AquariumFish } from "@/stores/ecosystems";

defineProps<{
  list: AquariumFish[];
}>();
</script>

<style scoped></style>
