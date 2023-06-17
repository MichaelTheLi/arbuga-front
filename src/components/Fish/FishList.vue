<template>
  <div v-if="list">
    <div>
      <q-list>
        <div
          v-for="(element, index) in list"
          :key="index"
          data-testid="fish-list-item"
        >
          <q-item dense>
            <q-item-section class="col-7">
              <q-item-label>{{ element.fish.name }}</q-item-label>
            </q-item-section>
            <q-item-section class="col-3">
              <q-input
                class="fish-count-input"
                input-class="text-center"
                :model-value="element.count"
                @update:model-value="onCountUpdate(element, $event)"
                dense
                borderless
                :placeholder="$t('ecosystem.fish_list.count')"
                data-testid="fish-count-input"
              />
            </q-item-section>
            <q-item-section side>
              <q-btn
                @click="onRemoveClick(element)"
                dense
                flat
                icon="delete"
                :title="$t('ecosystem.fish_list.remove')"
                data-testid="fish-remove-button"
              />
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </div>
  </div>
  <div v-else>{{ $t("ecosystem.fish.empty") }}</div>
</template>

<script setup lang="ts">
import type { AquariumFish } from "@/stores/ecosystems";
import { QBtn, QInput, QItem, QItemLabel, QItemSection, QList } from "quasar";

const emit = defineEmits<{
  (e: "remove", fish: AquariumFish): void;
  (e: "updateCount", fish: AquariumFish, count: number): void;
}>();

defineProps<{
  list: AquariumFish[];
}>();

const onRemoveClick = (fish: AquariumFish) => {
  emit("remove", fish);
};
const onCountUpdate = (fish: AquariumFish, count: string | number | null) => {
  if (typeof count === "string") count = parseInt(count);
  emit("updateCount", fish, Math.max(1, count || 1));
};
</script>
