<script setup lang="ts">
import { ref, watch } from "vue";
import { RouterView } from "vue-router";
import EcosystemsManagement from "./components/EcosystemsManagement.vue";
import {
  QAvatar,
  QBtn,
  QDrawer,
  QHeader,
  QLayout,
  QPageContainer,
  QRouteTab, QSpace,
  QTabs,
  QToolbar,
  QToolbarTitle
} from "quasar";
import { loadEcosystems } from "@/gateway/gateway_apollo";
import { useEcosystemsStore } from "@/stores/ecosystems";
import EcosystemAnalysisWrap from "@/components/EcosystemAnalysisWrap.vue";

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};

const { result } = loadEcosystems();

watch(result, (ecosystems) => {
  console.log(ecosystems);
  const store = useEcosystemsStore();

  if (ecosystems && ecosystems.ecosystems) {
    ecosystems.ecosystems.forEach((ecosystemData) => {
      const ecosystem = store.createNew();

      console.log(ecosystem);
      console.log(ecosystemData);
      ecosystem.name = ecosystemData.name;
      ecosystem.width.value = ecosystemData.aquarium.dimensions.width;
      ecosystem.length.value = ecosystemData.aquarium.dimensions.length;
      ecosystem.height.value = ecosystemData.aquarium.dimensions.height;
      if (ecosystemData.analysis) {
        ecosystem.analysis.value = ecosystemData.analysis;
      }

      store.addNew(ecosystem);
    });
  }
});
</script>

<template>
  <q-layout view="lhh LpR fFf">
    <q-header class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title shrink>
          <q-avatar>
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
          </q-avatar>
          Arbuga
        </q-toolbar-title>

        <q-tabs align="left">
          <q-route-tab to="/" label="Browse" />
          <q-route-tab to="/edit" label="Ecosystem" />
        </q-tabs>
        <q-space />

        <q-tabs>
          <q-route-tab to="/about" label="About" />
        </q-tabs>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer bordered show-if-above v-model="leftDrawerOpen" side="left">
      <EcosystemsManagement />
    </q-drawer>

    <q-drawer
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      class="q-pa-sm"
    >
      <EcosystemAnalysisWrap />
    </q-drawer>

    <q-page-container>
      <RouterView />
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
