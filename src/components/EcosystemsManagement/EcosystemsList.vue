<template>
  <q-list separator>
    <q-item
      v-for="ecosystem in list"
      :key="ecosystem.name"
      @click="onEcosystemSelect(ecosystem)"
      clickable
      v-ripple
      :active="isActive(ecosystem)"
      active-class="bg-primary text-white"
      data-testid="ecosystems-list-item"
    >
      <q-item-section>
        <q-item-label>{{
          ecosystem.name || $t("ecosystem.new_name")
        }}</q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-item-label caption>{{
          $t("ecosystem.volume_param", { volume: volume(ecosystem).value })
        }}</q-item-label>
        <q-item-label>
          {{ ecosystem.length }}x{{ ecosystem.width }}x{{ ecosystem.height }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
import type { Ecosystem } from "@/stores/ecosystems";
import {
  useEcosystemDynamicVolume,
  useEcosystemsStore,
} from "@/stores/ecosystems";
import { storeToRefs } from "pinia";
import type { UnwrapRef } from "vue";
import { QItem, QItemLabel, QItemSection, QList } from "quasar";
import { useRouter } from "vue-router";

const store = useEcosystemsStore();
const router = useRouter();

const { list } = storeToRefs(store);

const onEcosystemSelect = (ecosystem: UnwrapRef<Ecosystem>) => {
  store.changeCurrent(ecosystem);
  router.push("/");
};

const isActive = (ecosystem: UnwrapRef<Ecosystem>) => {
  return store.current === ecosystem;
};

const volume = (ecosystem: Ecosystem) => {
  return useEcosystemDynamicVolume(ecosystem).volume;
};
</script>

<style scoped></style>
