<template>
  <div v-if="list">
    <div
      v-for="(element, index) in list"
      :key="index"
      data-testid="plant-list-item"
    >
      {{ element.count }} x {{ element.plant.name }}
    </div>
  </div>
  <div v-else>Add a plant</div>
</template>

<script setup lang="ts">
import type { AquariumPlant } from "@/stores/ecosystems";

defineProps<{
  list: AquariumPlant[];
}>();
</script>

<style scoped></style>
