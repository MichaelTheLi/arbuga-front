<template>
  <div>
    <div class="text-body2">
      <p>Actual volume: {{ volume }}l</p>

      <div>
        <FishList :list="ecosystem.fish" />
        <PlantsList :list="ecosystem.plants" />
        <SelectFish :debounce-timeout="300" @add="onAddFish" />
        <SelectPlant :debounce-timeout="300" @add="onAddPlant" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ecosystem } from "@/stores/ecosystems";
import SelectFish from "@/components/Fish/SelectFish.vue";
import type { FishCardData } from "@/components/Fish/FishCard.vue";
import FishList from "@/components/Fish/FishList.vue";
import PlantsList from "@/components/Plants/PlantsList.vue";
import { useEcosystemDynamicVolume } from "@/stores/ecosystems";
import { toRef } from "vue";
import SelectPlant from "@/components/Plants/SelectPlant.vue";

const props = defineProps<{
  ecosystem: Ecosystem;
}>();
const emit = defineEmits<{
  (e: "fishAdd", option_id: string): void;
  (e: "plantAdd", option_id: string): void;
}>();

const onAddFish = (selected: FishCardData) => {
  emit("fishAdd", selected.id);
};

const onAddPlant = (selected: FishCardData) => {
  emit("plantAdd", selected.id);
};

const ecosystemForVolume = toRef(props, "ecosystem");

const { volume } = useEcosystemDynamicVolume(ecosystemForVolume);
</script>

<style scoped></style>
