<template>
  <q-card class="my-card" flat bordered>
    <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />

    <q-card-section>
      <div class="text-overline text-orange-9">{{ props.fish.status }}</div>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ props.fish.title }}</div>
      <div class="text-caption text-grey">
        {{ props.fish.shortDescription }}
      </div>
    </q-card-section>

    <q-card-actions>
      <q-btn
        flat
        color="dark"
        label="Add"
        data-testid="add-fish"
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
      />
    </q-card-actions>

    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="text-subitle2">
          {{ props.fish.description }}
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

export interface FishCardData {
  id: string;
  status: string;
  title: string;
  shortDescription: string;
  description: string;
}

const expanded = ref(false);

const props = defineProps<{
  fish: FishCardData;
}>();

const emit = defineEmits<{
  (e: "add"): void;
}>();

const onAddClick = () => {
  emit("add");
};
</script>

<style scoped></style>
