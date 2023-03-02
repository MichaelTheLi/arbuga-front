<template>
  <div>
    <div class="text-body2">
      <p>Actual volume: {{ props.ecosystem.volume }}l</p>

      <div>
        <input data-testid="fish-selector-id" v-model="selectedOptionId" />
        <input data-testid="fish-selector" v-model="searchSubstring" />
        <div data-testid="fish-options">
          <div v-if="showOptions">
            <div
              data-testid="fish-option"
              v-for="(option, index) in fishOptions"
              :key="index"
              @click="onSelect(option)"
            >
              {{ option.fish.name }}
            </div>
          </div>
        </div>
        <div data-testid="add-fish" @click="onAdd">Add fish</div>
        <div
          v-for="(fish, index) in props.ecosystem.fish"
          :key="index"
          data-testid="fish-item"
        >
          {{ fish.count }} x {{ fish.name }}
        </div>
      </div>

      <div>
        <div
          v-for="(plant, index) in props.ecosystem.plants"
          :key="index"
          data-testid="plant-item"
        >
          {{ plant.count }} x {{ plant.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ecosystem, FishOption } from "@/stores/ecosystems";
import { computed, ref, watch } from "vue";

type FishFinder = (input: string) => FishOption[];
const props = defineProps<{
  ecosystem: Ecosystem;
  fishFinder: FishFinder;
}>();
const emit = defineEmits<{
  (e: "add", option_id: string): void;
}>();

const selectedOptionId = ref<string | undefined>(undefined);
const searchSubstring = ref<string | undefined>(undefined);

const onAdd = () => {
  if (selectedOptionId.value) {
    emit("add", selectedOptionId.value);
  }
};

const onSelect = (option: FishOption) => {
  searchSubstring.value = option.fish.name;
  selectedOptionId.value = option.fish.id;
};

const showOptions = ref(true);

const fishOptions = computed((): FishOption[] => {
  if (searchSubstring.value) {
    return props.fishFinder(searchSubstring.value);
  }

  return [];
});

watch(fishOptions, (newFishOptions) => {
  if (newFishOptions.length === 1) {
    onSelect(newFishOptions[0]);
    showOptions.value = false;
  } else {
    showOptions.value = true;
  }
});
</script>

<style scoped></style>
