<template>
  <div v-if="props.list">
    <div
      v-for="(plant, index) in props.list"
      :key="index"
      data-testid="plant-list-item"
    >
      {{ plant.count }} x {{ plant.name }}
    </div>
  </div>
  <div v-else>Add a plant</div>
</template>

<script setup lang="ts">
import type { AquariumPlant } from "@/stores/ecosystems";

const props = defineProps<{
  list: AquariumPlant[];
}>();
</script>

<style scoped></style>
