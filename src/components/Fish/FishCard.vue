<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs col">
        <div class="text-overline text-orange-9">{{ props.fish.status }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ props.fish.title }}</div>
        <div class="text-caption text-grey">
          {{ props.fish.shortDescription }}
        </div>

        <q-card-actions align="between" class="q-py-sm q-px-none no-wrap">
          <q-btn
            color="primary"
            size="sm"
            padding="xs md"
            :label="$t('fish.add_action')"
            data-testid="add-fish"
            class="col-6"
            @click="onAddClick"
          />
          <q-btn
            size="sm"
            padding="xs md"
            flat
            :label="$t('fish.more_info')"
            class="col-6"
            data-testid="show-more-info"
            @click="expanded = !expanded"
          />
        </q-card-actions>
      </q-card-section>

      <q-card-section class="col-5 flex flex-center">
        <q-img class="rounded-borders" :src="props.fish.mainImage" />
      </q-card-section>
    </q-card-section>

    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="text-subtitle2" data-testid="fish-description">
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
} from "quasar";
import { ref } from "vue";

export interface FishCardData {
  id: string;
  status: string;
  title: string;
  shortDescription: string;
  description: string;
  mainImage?: string;
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
