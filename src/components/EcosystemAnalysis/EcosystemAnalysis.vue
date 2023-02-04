<template>
  <q-list>
    <div v-for="(category, index) of analysis" :key="category.id">
      <q-item-label header>
        {{ category.name }}
        <q-badge
          :color="statusToColor(category.status)"
          :label="category.status"
          text-color="black"
        />
      </q-item-label>

      <!--      <q-item-label overline>{{category.description}}</q-item-label>-->

      <q-item v-for="message of category.messages" :key="message.id">
        <q-item-section>
          <q-item-label lines="1">{{ message.name }}</q-item-label>
          <q-item-label caption>{{ message.description }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge
            :color="statusToColor(message.status)"
            :label="message.status"
            text-color="black"
          />
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
  QItem,
  QItemLabel,
  QItemSection,
  QList,
  QSeparator,
} from "quasar";

defineProps(["analysis"]);
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
  return "info";
};
</script>

<style scoped></style>
