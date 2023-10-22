<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs col">
        <div class="q-mb-md">
          <div class="text-h5 q-mt-sm q-mb-xs">
            <router-link
              :to="{ name: 'fish_details', params: { id: props.fish.id } }"
              >{{ props.fish.title }}
            </router-link>
          </div>
          <div class="text-caption text-grey">
            {{ props.fish.scientificName }}
          </div>
        </div>
        <div class="text-body1 text-grey q-mb-md">
          {{ props.fish.description }}
        </div>
        <div class="text-body1 text-grey q-mb-xs">
          <div>
            <span>{{ $t("plants.info.temperature") }}:&nbsp;</span>
            <span>{{
              $n(
                props.fish.environment?.waterParametersRange.min.temperature ||
                  0,
                "decimal"
              )
            }}</span>
            <span>&nbsp;-&nbsp;</span>
            <span>{{
              $n(
                props.fish.environment?.waterParametersRange.max.temperature ||
                  0,
                "decimal"
              )
            }}</span>
          </div>
          <div>
            <span>{{ $t("plants.info.ph") }}:&nbsp;</span>
            <span>{{
              $n(
                props.fish.environment?.waterParametersRange.min.ph || 0,
                "decimal"
              )
            }}</span>
            <span>&nbsp;-&nbsp;</span>
            <span>{{
              $n(
                props.fish.environment?.waterParametersRange.max.ph || 0,
                "decimal"
              )
            }}</span>
          </div>
          <div>
            <span>{{ $t("plants.info.gh") }}:&nbsp;</span>
            <span>{{
              $n(
                props.fish.environment?.waterParametersRange.min.gh || 0,
                "decimal"
              )
            }}</span>
            <span>&nbsp;-&nbsp;</span>
            <span>{{
              $n(
                props.fish.environment?.waterParametersRange.max.gh || 0,
                "decimal"
              )
            }}</span>
          </div>
          <div>
            <span>{{ $t("plants.info.kh") }}:&nbsp;</span>
            <span>{{
              $n(
                props.fish.environment?.waterParametersRange.min.kh || 0,
                "decimal"
              )
            }}</span>
            <span>&nbsp;-&nbsp;</span>
            <span>{{
              $n(
                props.fish.environment?.waterParametersRange.max.kh || 0,
                "decimal"
              )
            }}</span>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="col-5 flex flex-center">
        <q-img class="rounded-borders" :src="props.fish.mainImage" />
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { QCard, QCardSection, QImg } from "quasar";
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
