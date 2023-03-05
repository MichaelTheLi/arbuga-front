<template>
  <div v-if="props.list">
    <div
      v-for="(fish, index) in props.list"
      :key="index"
      data-testid="fish-list-item"
    >
      {{ fish.count }} x {{ fish.name }}
    </div>
  </div>
  <div v-else>Add a fish</div>
</template>

<script setup lang="ts">
import type { AquariumFish } from "@/stores/ecosystems";

const props = defineProps<{
  list: AquariumFish[];
}>();
</script>

<style scoped></style>
