<script setup lang="ts">
import EcosystemInfo from "@/components/EcosystemInfo.vue";
import { useEcosystemsStore } from "@/stores/ecosystems";
import { storeToRefs } from "pinia";
import { QBtn, QPage, QPageSticky } from "quasar";
import EditEcosystem from "@/components/EditEcosystem.vue";
const store = useEcosystemsStore();

let { current, currentChanged } = storeToRefs(store);

const onsave = function () {
  console.group("save");
  console.log(current.value);
  console.groupEnd();
};

const onrestore = function () {
  console.group("restore");
  console.log(current.value);
  store.restoreCurrent();
  console.groupEnd();
};
</script>

<template>
  <q-page padding>
    <div v-if="current">
      <EditEcosystem :ecosystem="current" />
      <h5 class="q-my-md">Parameters</h5>
      <EcosystemInfo :ecosystem="current" />

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <div class="q-gutter-sm">
          <q-btn
            fab
            icon="restore"
            color="secondary"
            @click="onrestore"
            :disabled="!currentChanged"
          />
          <q-btn
            fab
            icon="save"
            color="secondary"
            @click="onsave"
            :disabled="!currentChanged"
          />
        </div>
      </q-page-sticky>
    </div>
    <div v-else>Select an ecosystem</div>
  </q-page>
</template>
