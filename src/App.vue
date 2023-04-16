<script setup lang="ts">
import { ref } from "vue";
import { RouterView, useRouter } from "vue-router";
import EcosystemsManagement from "./components/EcosystemsManagement/EcosystemsManagement.vue";
import {
  QAvatar,
  QBtn,
  QDrawer,
  QHeader,
  QLayout,
  QPageContainer,
  QRouteTab,
  QSpace,
  QTabs,
  QToolbar,
  QToolbarTitle,
} from "quasar";
import { fetchUser } from "@/gateway/gateway";
import AccountMenu from "@/components/Account/AccountMenu.vue";

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);
const router = useRouter();

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};
const onTitleClick = () => {
  router.push("/");
};

// TODO Open right drawer on routes what needs it. Remove manual open?
// router.

fetchUser();
</script>

<template>
  <q-layout view="lhh LpR fFf">
    <q-header class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="list" @click="toggleLeftDrawer" />

        <q-toolbar-title shrink @click="onTitleClick" class="cursor-pointer">
          <q-avatar>
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
          </q-avatar>
          Arbuga
        </q-toolbar-title>
        <q-tabs>
          <q-route-tab to="/about" label="About" />
        </q-tabs>
        <q-space />

        <AccountMenu />
        <q-btn dense flat round icon="list" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer
      bordered
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      :width="250"
    >
      <EcosystemsManagement />
    </q-drawer>

    <q-drawer
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      class="q-pa-sm"
      :width="400"
    >
      <RouterView name="rightDrawer" />
    </q-drawer>

    <q-page-container>
      <RouterView />
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
