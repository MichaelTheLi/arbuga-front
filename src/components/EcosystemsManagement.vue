<script setup lang="ts">
import EcosystemsList from "@/components/EcosystemsList.vue";
import CreateEcosystemButton from "@/components/CreateEcosystemButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const onCreated = () => {
  router.push("/edit");
};
</script>

<template>
  <div class="q-pa-sm">
    <EcosystemsList />
    <br />
    <CreateEcosystemButton @created="onCreated" />
  </div>
</template>

<style scoped></style>
