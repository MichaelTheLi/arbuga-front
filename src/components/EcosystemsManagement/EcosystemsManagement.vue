<script setup lang="ts">
import EcosystemsList from "@/components/EcosystemsManagement/EcosystemsList.vue";
import CreateEcosystemButton from "@/components/EcosystemsManagement/CreateEcosystemButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const onCreated = () => {
  router.push("/");
};
</script>

<template>
  <div class="q-pa-sm">
    <CreateEcosystemButton @created="onCreated" class="full-width q-mb-md"/>
    <EcosystemsList class="q-mb-md"/>
  </div>
</template>

<style scoped></style>
