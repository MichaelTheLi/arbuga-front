<script setup lang="ts">
import EcosystemsList from "@/components/EcosystemsManagement/EcosystemsList.vue";
import { useRouter } from "vue-router";
import { useEcosystemsStore } from "@/stores/ecosystems";
import { QBtn } from "quasar";

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
    <h5 class="q-my-md">
      <span>{{ $t("ecosystem.list_header") }}</span>
      <q-btn
        class="q-ml-md"
        dense
        flat
        round
        icon="add"
        color="primary"
        @click="onCreated"
        data-testid="create-ecosystem-button"
      />
    </h5>
    <EcosystemsList class="q-mb-md" @created="onCreated" />
  </div>
</template>

<style scoped></style>
