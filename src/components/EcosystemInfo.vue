<template>
  <div>
    <div class="text-body2">
      <p>Actual volume: {{ props.ecosystem.volume }}l</p>
      <div>
        <div
          v-for="(fish, index) in props.ecosystem.fish"
          :key="index"
          data-testid="fish-item"
        >
          {{ fish.count }} x {{ fish.name }}
        </div>
      </div>
      <div>
        <div
          v-for="(plant, index) in props.ecosystem.plants"
          :key="index"
          data-testid="plant-item"
        >
          {{ plant.count }} x {{ plant.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ecosystem } from "@/stores/ecosystems";

const props = defineProps<{
  ecosystem: Ecosystem;
}>();
</script>

<style scoped></style>
