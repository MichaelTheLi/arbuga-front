<template>
  <q-card flat bordered>
    <q-img class="rounded-borders" :src="props.plant.mainImage" />

    <q-list dense class="q-pt-sm">
      <q-item>
        <router-link
          :to="{ name: 'plant_details', params: { id: props.plant.id } }"
          class="text-h6"
          >{{ props.plant.title }}
        </router-link>
      </q-item>
      <q-item>
        <div class="text-caption">
          {{ props.plant.scientificName }}
        </div>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup lang="ts">
import { QCard, QImg, QItem, QList } from "quasar";
import type { Environment } from "@/stores/ecosystems";

export interface PlantListCardData {
  id: string;
  title: string;
  scientificName: string;
  description: string;
  environment?: Environment;
  mainImage?: string;
}

const props = defineProps<{
  plant: PlantListCardData;
}>();
</script>

<style scoped></style>
