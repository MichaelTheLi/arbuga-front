<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <FishCard
      v-for="(fish, index) in props.list"
      :key="index"
      :fish="fish"
      @add="onAdd(fish)"
      data-testid="fish-option"
    />
  </div>
</template>

<script setup lang="ts">
import FishCard, { type FishCardData } from "@/components/Fish/FishCard.vue";

const props = defineProps<{
  list: FishCardData[];
}>();

const emit = defineEmits<{
  (e: "add", selected: FishCardData): void;
}>();

const onAdd = (selected: FishCardData) => {
  emit("add", selected);
};
</script>

<style scoped></style>
