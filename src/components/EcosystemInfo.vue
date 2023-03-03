<template>
  <div>
    <div class="text-body2">
      <p>Actual volume: {{ props.ecosystem.volume }}l</p>

      <div>
        <SelectFish
          :fish-finder="tempFishFinder"
          @add="onAddList"
          :debounce-timeout="0"
        />
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
import type { Ecosystem, FishOption } from "@/stores/ecosystems";
import SelectFish from "@/components/Fish/SelectFish.vue";
import { type FishCardData } from "@/components/Fish/FishCard.vue";

type FishFinder = (input: string) => FishOption[];
const props = defineProps<{
  ecosystem: Ecosystem;
  fishFinder: FishFinder;
}>();
const tempFishFinder = async (input: string) => {
  return props.fishFinder(input);
};
const emit = defineEmits<{
  (e: "add", option_id: string): void;
}>();

const onAddList = (selected: FishCardData) => {
  emit("add", selected.id);
};
</script>

<style scoped></style>
