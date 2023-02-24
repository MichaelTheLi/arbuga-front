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
    <EcosystemsList class="q-mb-md" />
    <CreateEcosystemButton @created="onCreated" class="full-width q-mb-md" />
  </div>
</template>

<style scoped></style>
