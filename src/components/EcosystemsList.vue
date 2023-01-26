<template>
  <q-list separator>
    <q-item
      v-for="ecosystem in list"
      :key="ecosystem.name"
      @click="onEcosystemSelect(ecosystem)"
      clickable
      v-ripple
    >
      <q-item-section>
        <q-item-label overline>{{ ecosystem.name || "New" }}</q-item-label>
        <q-item-label
          >{{ ecosystem.volume }} L, {{ ecosystem.length }}x{{
            ecosystem.width
          }}x{{ ecosystem.height }}</q-item-label
        >
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
import { useEcosystemsStore } from "@/stores/ecosystems";
import type { Ecosystem } from "@/stores/ecosystems";
import { storeToRefs } from "pinia";
import type { UnwrapRef } from "vue";
import { QItem, QItemLabel, QItemSection, QList } from "quasar";

const store = useEcosystemsStore();

const { list } = storeToRefs(store);

const onEcosystemSelect = (ecosystem: UnwrapRef<Ecosystem>) => {
  store.changeCurrent(ecosystem);
};
</script>

<style scoped></style>
