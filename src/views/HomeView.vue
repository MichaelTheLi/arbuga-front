<script setup lang="ts">
import EcosystemInfo from "@/components/EcosystemInfo.vue";
import { useEcosystemsStore } from "@/stores/ecosystems";
import { storeToRefs } from "pinia";
import { QBtn, QPage, QPageSticky } from "quasar";
import EditEcosystem from "@/components/EditEcosystem.vue";
const store = useEcosystemsStore();

let { current } = storeToRefs(store);

const onsave = function () {
  console.log(current.value)
};
</script>

<template>
  <q-page padding>
    <div v-if="current">
      <EditEcosystem :ecosystem="current" />
      <h5 class="q-my-md">Parameters</h5>
      <EcosystemInfo :ecosystem="current" />

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="save" color="accent" @click="onsave" />
      </q-page-sticky>
    </div>
    <div v-else>Select an ecosystem</div>
  </q-page>
</template>
