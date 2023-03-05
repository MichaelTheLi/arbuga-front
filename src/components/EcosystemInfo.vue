<template>
  <div>
    <div class="text-body2">
      <p>Actual volume: {{ props.ecosystem.volume }}l</p>

      <div>
        <SelectFish
          :fish-finder="tempFishFinder"
          :debounce-timeout="0"
          @add="onAddList"
        />
        <FishList :list="ecosystem.fish" />
      </div>

      <div>
        <PlantsList :list="ecosystem.plants" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ecosystem, FishOption } from "@/stores/ecosystems";
import SelectFish from "@/components/Fish/SelectFish.vue";
import { type FishCardData } from "@/components/Fish/FishCard.vue";
import FishList from "@/components/Fish/FishList.vue";
import PlantsList from "@/components/Plants/PlantsList.vue";

type FishFinder = (input: string) => FishOption[];
const props = defineProps<{
  ecosystem: Ecosystem;
  fishFinder: FishFinder;
}>();
const tempFishFinder = async (input: string) => {
  return props.fishFinder(input);
};
const emit = defineEmits<{
  (e: "fishAdd", option_id: string): void;
}>();

const onAddList = (selected: FishCardData) => {
  emit("fishAdd", selected.id);
};
</script>

<style scoped></style>
