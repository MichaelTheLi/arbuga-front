<template>
  <q-card flat bordered>
    <q-img class="rounded-borders" :src="props.fish.mainImage" />

    <q-list dense class="q-pt-sm">
      <q-item>
        <router-link
          :to="{ name: 'fish_details', params: { id: props.fish.id } }"
          class="text-h6"
          >{{ props.fish.title }}
        </router-link>
      </q-item>
      <q-item>
        <div class="text-caption">
          {{ props.fish.scientificName }}
        </div>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup lang="ts">
import { QCard, QImg, QItem, QList } from "quasar";
import type { Environment } from "@/stores/ecosystems";

export interface FishListCardData {
  id: string;
  title: string;
  scientificName: string;
  description: string;
  environment?: Environment;
  mainImage?: string;
}

const props = defineProps<{
  fish: FishListCardData;
}>();
</script>

<style scoped></style>
