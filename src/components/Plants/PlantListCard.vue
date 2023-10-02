<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs col">
        <div class="q-mb-md">
          <div class="text-h5 q-mt-sm q-mb-xs">
            <router-link
              :to="{ name: 'plant_details', params: { id: props.plant.id } }"
              >{{ props.plant.title }}
            </router-link>
          </div>
          <div class="text-caption text-grey">
            {{ props.plant.scientificName }}
          </div>
        </div>
        <div class="text-body1 text-grey q-mb-md">
          {{ props.plant.description }}
        </div>
        <div class="text-body1 text-grey q-mb-xs">
          <div>
            <span>{{ $t("plants.info.temperature") }}:&nbsp;</span>
            <span>{{
              $n(
                props.plant.environment?.waterParametersRange.min.temperature ||
                  0,
                "decimal"
              )
            }}</span>
            <span>&nbsp;-&nbsp;</span>
            <span>{{
              $n(
                props.plant.environment?.waterParametersRange.max.temperature ||
                  0,
                "decimal"
              )
            }}</span>
          </div>
          <div>
            <span>{{ $t("plants.info.ph") }}:&nbsp;</span>
            <span>{{
              $n(
                props.plant.environment?.waterParametersRange.min.ph || 0,
                "decimal"
              )
            }}</span>
            <span>&nbsp;-&nbsp;</span>
            <span>{{
              $n(
                props.plant.environment?.waterParametersRange.max.ph || 0,
                "decimal"
              )
            }}</span>
          </div>
          <div>
            <span>{{ $t("plants.info.gh") }}:&nbsp;</span>
            <span>{{
              $n(
                props.plant.environment?.waterParametersRange.min.gh || 0,
                "decimal"
              )
            }}</span>
            <span>&nbsp;-&nbsp;</span>
            <span>{{
              $n(
                props.plant.environment?.waterParametersRange.max.gh || 0,
                "decimal"
              )
            }}</span>
          </div>
          <div>
            <span>{{ $t("plants.info.kh") }}:&nbsp;</span>
            <span>{{
              $n(
                props.plant.environment?.waterParametersRange.min.kh || 0,
                "decimal"
              )
            }}</span>
            <span>&nbsp;-&nbsp;</span>
            <span>{{
              $n(
                props.plant.environment?.waterParametersRange.max.kh || 0,
                "decimal"
              )
            }}</span>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="col-5 flex flex-center">
        <q-img
          class="rounded-borders"
          src="https://loremflickr.com/320/240/aquarium?lock=14"
        />
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { QCard, QCardSection, QImg } from "quasar";
import type { Environment } from "@/stores/ecosystems";

export interface PlantListCardData {
  id: string;
  title: string;
  scientificName: string;
  description: string;
  environment?: Environment;
}

const props = defineProps<{
  plant: PlantListCardData;
}>();
</script>

<style scoped></style>
