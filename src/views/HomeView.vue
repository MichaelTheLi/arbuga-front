<script setup lang="ts">
import EcosystemInfo from "@/components/EcosystemInfo.vue";
import { useEcosystemsStore } from "@/stores/ecosystems";
import { storeToRefs } from "pinia";
import { QPage } from "quasar";
import EditEcosystem from "@/components/EditEcosystem.vue";
import { useAddFish } from "@/gateway/gateway";
const store = useEcosystemsStore();

const { addFish } = useAddFish();
let { current } = storeToRefs(store);

const onFishAdd = (optionId: string) => {
  if (store.current) {
    addFish({
      ecosystemId: store.current.id,
      fishId: optionId,
    });
  } else {
    console.error("Cannot add, select ecosystem");
  }
};
</script>

<template>
  <q-page padding>
    <div v-if="current">
      <EditEcosystem :ecosystem="current" />
      <h5 class="q-my-md">Parameters</h5>
      <EcosystemInfo :ecosystem="current" @fishAdd="onFishAdd" />
    </div>
    <div v-else>Select an ecosystem</div>
  </q-page>
</template>
