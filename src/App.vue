<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import EcosystemsManagement from "./components/EcosystemsManagement/EcosystemsManagement.vue";
import {
  QAvatar,
  QBtn,
  QDrawer,
  QFooter,
  QHeader,
  QLayout,
  QPageContainer,
  QSpace,
  QToolbar,
  QToolbarTitle,
  useMeta,
} from "quasar";
import { fetchUser } from "@/gateway/gateway";
import AccountMenu from "@/components/Account/AccountMenu.vue";
import CopyrightComponent from "@/components/CopyrightComponent.vue";
import { useI18n } from "vue-i18n";
import { useDrawersStore } from "@/stores/drawers";

const drawers = useDrawersStore();
const router = useRouter();

const toggleLeftDrawer = () => {
  drawers.left = !drawers.left;
};

const toggleRightDrawer = () => {
  drawers.right = !drawers.right;
};

const rightDrawerNames = ["home", "add_fish", "add_plants"];
router.afterEach((to) => {
  if (to.name && rightDrawerNames.includes(String(to.name))) {
    drawers.right = true;
  }
});

const onTitleClick = () => {
  router.push("/");
};

fetchUser();

const i18n = useI18n();
const projectName = i18n.t("project.name");
useMeta({
  title: projectName,
  titleTemplate: (title) => `${title} Home`,

  meta: {
    description: {
      name: "description",
      content: "Home page of " + projectName,
    },
    equiv: {
      "http-equiv": "Content-Type",
      content: "text/html; charset=UTF-8",
    },
  },
});
</script>

<template>
  <q-layout view="lhh LpR lfr">
    <q-header class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="list" @click="toggleLeftDrawer" />

        <q-toolbar-title shrink @click="onTitleClick" class="cursor-pointer">
          <q-avatar>
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
          </q-avatar>
          {{ $t("project.name") }}
        </q-toolbar-title>
        <q-space />

        <AccountMenu />
        <q-btn dense flat round icon="list" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer
      bordered
      show-if-above
      v-model="drawers.left"
      side="left"
      :width="250"
    >
      <EcosystemsManagement />
    </q-drawer>

    <q-drawer
      show-if-above
      v-model="drawers.right"
      side="right"
      class="q-pa-sm right-drawer"
      :width="400"
    >
      <RouterView name="rightDrawer" />
    </q-drawer>

    <q-page-container>
      <RouterView />
    </q-page-container>

    <q-footer class="bg-transparent text-white flex flex-center">
      <copyright-component />
    </q-footer>
  </q-layout>
</template>

<!--suppress CssUnusedSymbol -->
<style>
.q-drawer--right {
  max-width: 90vw;
}
</style>
