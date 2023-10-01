<script setup lang="ts">
import EcosystemInfo from "@/components/EcosystemInfo.vue";
import { useEcosystemsStore } from "@/stores/ecosystems";
import { storeToRefs } from "pinia";
import { QPage } from "quasar";
import EditEcosystem from "@/components/EditEcosystem.vue";

const store = useEcosystemsStore();

let { current } = storeToRefs(store);
</script>

<template>
  <q-page padding>
    <div v-if="current">
      <EditEcosystem :ecosystem="current" />
      <h5 class="q-my-md">{{ $t("ecosystem.parameters") }}</h5>
      <EcosystemInfo :ecosystem="current" />
    </div>
    <div v-else>{{ $t("ecosystem.please_select") }}</div>
  </q-page>
</template>
