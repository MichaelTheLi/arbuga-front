<template>
  <div v-if="list">
    <div>
      <q-list>
        <div
          v-for="(element, index) in list"
          :key="index"
          data-testid="plant-list-item"
        >
          <q-item dense>
            <q-item-section class="col-7">
              <q-item-label>{{ element.plant.name }}</q-item-label>
            </q-item-section>
            <q-item-section class="col-3">
              <q-input
                class="plant-count-input"
                input-class="text-center"
                :model-value="element.count"
                @update:model-value="onCountUpdate(element, $event)"
                dense
                borderless
                :placeholder="$t('ecosystem.plants_list.count')"
                data-testid="plant-count-input"
              />
            </q-item-section>
            <q-item-section side>
              <q-btn
                @click="onRemoveClick(element)"
                dense
                flat
                icon="delete"
                :title="$t('ecosystem.plants_list.remove')"
                data-testid="plant-remove-button"
              />
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </div>
  </div>
  <div v-else>{{ $t("ecosystem.plant.empty") }}</div>
</template>

<script setup lang="ts">
import type { AquariumPlant } from "@/stores/ecosystems";
import { QBtn, QInput, QItem, QItemLabel, QItemSection, QList } from "quasar";

const emit = defineEmits<{
  (e: "remove", plant: AquariumPlant): void;
  (e: "updateCount", plant: AquariumPlant, count: number): void;
}>();

defineProps<{
  list: AquariumPlant[];
}>();

const onRemoveClick = (plant: AquariumPlant) => {
  emit("remove", plant);
};
const onCountUpdate = (plant: AquariumPlant, count: string | number | null) => {
  if (typeof count === "string") count = parseInt(count);
  emit("updateCount", plant, Math.max(1, count || 1));
};
</script>
