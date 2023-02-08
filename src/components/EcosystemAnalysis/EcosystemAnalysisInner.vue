<template>
  <q-list>
    <h5 class="q-my-md">Your progress</h5>
    <q-linear-progress
      rounded
      color="accent"
      size="lg"
      :value="progress"
      class="q-my-md"
      animation-speed="300"
    />
    <div v-for="(category, index) of analysis" :key="category.id">
      <q-item-label header>
        <span :class="'text-' + statusToColor(category.status)">{{
          category.name
        }}</span>
        <q-badge
          v-if="category.status !== 'ok'"
          :color="statusToColor(category.status)"
          :label="category.status"
          text-color="black"
          class="q-ml-xs"
        />
      </q-item-label>

      <!--      <q-item-label overline>{{category.description}}</q-item-label>-->

      <q-item v-for="message of category.messages" :key="message.id">
        <q-item-section>
          <q-item-label lines="1">{{ message.name }}</q-item-label>
          <q-item-label caption>{{ message.description }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon
            :color="statusToColor(message.status)"
            :name="statusToIcon(message.status)"
          />
        </q-item-section>
      </q-item>

      <q-separator spaced inset v-show="index < analysis.length - 1" />
    </div>
  </q-list>
</template>

<script setup lang="ts">
import {
  QBadge,
  QIcon,
  QItem,
  QItemLabel,
  QItemSection,
  QLinearProgress,
  QList,
  QSeparator,
} from "quasar";
import { computed } from "vue";
import type { EcosystemAnalysis } from "@/stores/ecosystems";

const props = defineProps<{
  analysis: EcosystemAnalysis[];
}>();

const progress = computed(() => {
  const valid = props.analysis.filter(
    (analysisItem) => analysisItem.status === "ok"
  ).length;
  const total = props.analysis.length;
  return valid / total;
});

const statusToColor = (status: string) => {
  if (status === "ok") {
    return "teal-7";
  }
  if (status === "moderate") {
    return "amber-7";
  }
  if (status === "bad") {
    return "red-7";
  }
  return "teal";
};

const statusToIcon = (status: string) => {
  if (status === "ok") {
    return "check";
  }
  if (status === "moderate") {
    return "warning";
  }
  if (status === "bad") {
    return "error";
  }
  return "info";
};
</script>

<style scoped></style>
