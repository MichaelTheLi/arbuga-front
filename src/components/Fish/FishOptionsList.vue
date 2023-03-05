<template>
  <div class="q-pa-md row items-start q-col-gutter-md">
    <div class="col-4" v-for="(fish, index) in props.list" :key="index">
      <FishCard :fish="fish" @add="onAdd(fish)" data-testid="fish-option" />
    </div>
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
