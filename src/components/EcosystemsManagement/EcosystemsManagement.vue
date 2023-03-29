<script setup lang="ts">
import EcosystemsList from "@/components/EcosystemsManagement/EcosystemsList.vue";
import { useRouter } from "vue-router";
import { useEcosystemsStore } from "@/stores/ecosystems";

const router = useRouter();

const store = useEcosystemsStore();

const onCreated = () => {
  const newEcosystem = store.createNew("");
  store.addNew(newEcosystem);

  router.push("/");
  store.changeCurrent(newEcosystem);
};
</script>

<template>
  <div class="q-pa-sm">
    <EcosystemsList class="q-mb-md" @created="onCreated" />
  </div>
</template>

<style scoped></style>
