<template>
  <q-btn @click="createNew" label="Create new" />
</template>

<script setup lang="ts">
import { useEcosystemsStore } from "@/stores/ecosystems";
import { QBtn } from "quasar";

const emit = defineEmits(["created"]);

const store = useEcosystemsStore();

const createNew = function () {
  const newEcosystem = store.createNew("");
  store.addNew(newEcosystem);
  store.changeCurrent(newEcosystem);

  emit("created", newEcosystem);
};
</script>

<style scoped></style>
