<template>
  <div class="q-pt-md col q-gutter-md">
    <div v-for="(plant, index) in props.list" :key="index">
      <PlantCard
        :plant="plant"
        @add="onAdd(plant)"
        data-testid="plant-option"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlantCard, {
  type PlantCardData,
} from "@/components/Plants/PlantCard.vue";

const props = defineProps<{
  list: PlantCardData[];
}>();

const emit = defineEmits<{
  (e: "add", selected: PlantCardData): void;
}>();

const onAdd = (selected: PlantCardData) => {
  emit("add", selected);
};
</script>

<style scoped></style>
