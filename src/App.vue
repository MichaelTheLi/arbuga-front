<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import EcosystemsManagement from "./components/EcosystemsManagement/EcosystemsManagement.vue";
import {
  QAvatar,
  QBtn,
  QDrawer,
  QHeader, QIcon,
  QLayout,
  QPageContainer,
  QRouteTab, QSeparator,
  QSpace,
  QTabs,
  QToolbar,
  QToolbarTitle
} from "quasar";
import { fetchUser } from "@/gateway/gateway_apollo";
import EcosystemAnalysisWrap from "@/components/EcosystemAnalysis/EcosystemAnalysis.vue";
import UserInfoView from "@/components/UserInfoView.vue";

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};

fetchUser();
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

        <!--        <q-tabs align="left">-->
        <!--          <q-route-tab to="/" label="Browse" />-->
        <!--        </q-tabs>-->
        <q-space />

        <q-tabs>
          <q-route-tab to="/about" label="About" />
        </q-tabs>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer
      bordered
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      :width="250"
    >
      <h5 class="q-my-sm q-pa-sm">Ecosystems</h5>
      <EcosystemsManagement />
      <q-separator />
      <div class="q-pa-sm">
        <UserInfoView />
      </div>
    </q-drawer>

    <q-drawer
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      class="q-pa-sm"
      :width="400"
    >
      <EcosystemAnalysisWrap />
    </q-drawer>

    <q-page-container>
      <RouterView />
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
