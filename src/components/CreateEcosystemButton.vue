<template>
  <button @click="createNew">Create new</button>
</template>

<script setup lang="ts">
import { useEcosystemsStore } from "@/stores/ecosystems";

const emit = defineEmits(['created'])

const store = useEcosystemsStore();

const createNew = function () {
  const newEcosystem = store.createNew("");
  store.list.push(newEcosystem);
  store.changeCurrent(newEcosystem)

  emit("created", newEcosystem);
};
</script>

<style scoped></style>
