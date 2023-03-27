<template>
  <q-card class="my-card" flat bordered>
    <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />

    <q-card-section>
      <div class="text-overline text-orange-9">{{ props.plant.status }}</div>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ props.plant.title }}</div>
      <div class="text-caption text-grey">
        {{ props.plant.shortDescription }}
      </div>
    </q-card-section>

    <q-card-actions>
      <q-btn
        color="primary"
        size="sm"
        padding="xs md"
        label="Add"
        data-testid="add-plant"
        @click="onAddClick"
      />

      <q-space />

      <q-btn
        color="grey"
        round
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
        data-testid="show-more-info"
      />
    </q-card-actions>

    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="text-subtitle2" data-testid="plant-description">
          {{ props.plant.description }}
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script setup lang="ts">
import {
  QBtn,
  QCard,
  QCardActions,
  QCardSection,
  QImg,
  QSeparator,
  QSlideTransition,
  QSpace,
} from "quasar";
import { ref } from "vue";

export interface PlantCardData {
  id: string;
  status: string;
  title: string;
  shortDescription: string;
  description: string;
}

const expanded = ref(false);

const props = defineProps<{
  plant: PlantCardData;
}>();

const emit = defineEmits<{
  (e: "add"): void;
}>();

const onAddClick = () => {
  emit("add");
};
</script>

<style scoped></style>
