<template>
  <q-card class="my-card q-px-lg q-py-lg" flat>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs col">
        <div class="q-mb-lg">
          <div class="q-mb-sm">
            <div class="q-mb-xs text-h2">{{ props.fish.title }}</div>
            <div class="q-mt-md text-subtitle1">
              <i>{{ props.fish.scientificName }}</i>
            </div>
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
        <q-img
          class="rounded-borders"
          src="https://loremflickr.com/320/240/fish?lock=1"
        />
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { QCard, QCardSection, QImg } from "quasar";
import type { Environment } from "@/stores/ecosystems";

export interface FishDetailsData {
  id: string;
  title: string;
  scientificName: string;
  description: string;
  environment?: Environment;
}

const props = defineProps<{
  fish: FishDetailsData;
}>();
</script>

<style scoped></style>
