<template>
  <q-card class="my-card q-px-lg q-py-lg" flat>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs col">
        <div class="q-mb-lg">
          <div class="q-mb-sm">
            <div class="q-mb-xs text-h2">{{ props.plant.title }}</div>
            <div class="q-mt-md text-subtitle1">
              <i>{{ props.plant.scientificName }}</i>
            </div>
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
        <div class="references text-body2 text-grey q-mt-md q-mb-xs">
          <div
            v-for="(reference, index) in props.plant.references"
            v-bind:key="index"
          >
            <a :href="reference.url" target="_blank">{{ reference.title }}</a>
            <span>&nbsp;</span>
            <span>{{ reference.baseTitle }}</span>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="col-5 flex flex-center">
        <div class="carousel-container">
          <q-carousel
            animated
            :arrows="navigationActive"
            :navigation="navigationActive"
            infinite
            v-model="slide"
            class="rounded-borders"
          >
            <q-carousel-slide
              v-for="(imageSrc, index) in props.plant.images"
              v-bind:key="index"
              :name="index"
              :img-src="imageSrc"
            />
          </q-carousel>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { QCard, QCardSection, QCarousel, QCarouselSlide } from "quasar";
import type { Environment } from "@/stores/ecosystems";
import { computed, ref } from "vue";

export interface Reference {
  title: string;
  baseTitle: string;
  url?: string;
}

export interface PlantDetailsData {
  id: string;
  title: string;
  scientificName: string;
  description: string;
  environment?: Environment;
  images?: string[];
  references?: Reference[];
}

const props = defineProps<{
  plant: PlantDetailsData;
}>();
const slide = ref(0);
const navigationActive = computed(() => {
  return props.plant.images && props.plant.images.length > 1;
});
</script>

<style scoped>
.carousel-container {
  width: 100%;
}
</style>
