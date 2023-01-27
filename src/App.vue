<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import EcosystemsManagement from "./components/EcosystemsManagement.vue";
import {
  QAvatar,
  QBtn,
  QDrawer,
  QHeader,
  QLayout,
  QPageContainer,
  QRouteTab,
  QTabs,
  QToolbar,
  QToolbarTitle,
} from "quasar";
import { loadEcosystems } from "@/gateway/gateway";
import { useEcosystemsStore } from "@/stores/ecosystems";

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};

loadEcosystems().then((ecosystems) => {
  const store = useEcosystemsStore();

  ecosystems.forEach((ecosystemData) => {
    const ecosystem = store.createNew();

    ecosystem.name = ecosystemData.name;
    ecosystem.width.value = ecosystemData.aquarium.dimensions.width;
    ecosystem.length.value = ecosystemData.aquarium.dimensions.length;
    ecosystem.height.value = ecosystemData.aquarium.dimensions.height;

    store.addNew(ecosystem);
  });
});
</script>

<template>
  <q-layout view="lhh LpR fFf">
    <q-header class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
          </q-avatar>
          Arbuga
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="Home" />
        <q-route-tab to="/edit" label="Edit" />
        <q-route-tab to="/about" label="About" />
      </q-tabs>
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
      Here will be fish, plants and equipment gallery to add to the aquarium
    </q-drawer>

    <q-page-container>
      <RouterView />
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
