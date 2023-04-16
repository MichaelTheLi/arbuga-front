<script setup lang="ts">
import { useEcosystemsStore } from "@/stores/ecosystems";
import { useAddFish } from "@/gateway/gateway";
import SelectFish from "@/components/Fish/SelectFish.vue";
import type { FishCardData } from "@/components/Fish/FishCard.vue";

const store = useEcosystemsStore();

const { addFish } = useAddFish();
const onAddFish = (selectedFish: FishCardData) => {
  if (store.current) {
    addFish({
      ecosystemId: store.current.id,
      fishId: selectedFish.id,
    });
  } else {
    console.error("Cannot add fish, select ecosystem");
  }
};
</script>

<template>
  <h5 class="q-my-sm q-pa-sm">Add fish</h5>
  <SelectFish :debounce-timeout="300" @add="onAddFish" />
</template>
