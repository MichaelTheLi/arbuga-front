<script setup lang="ts">
import { QPage, useMeta } from "quasar";
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const projectName = i18n.t("project.name");
useMeta({
  title: i18n.t("titles.home"),
  meta: {
    description: {
      name: "description",
      content: i18n.t("descriptions.home", { projectName }),
    },
  },
});
</script>

<template>
  <q-page padding>
    <h2>{{ $t("home.heading") }}</h2>
    <div class="text-body1">
      <p>{{ $t("home.welcome_message") }}</p>
      <!-- Here goes some usage guide and helpful links -->
    </div>
    <div class="text-body-2">
      <!--suppress HtmlUnknownTag -->
      <i18n-t keypath="home.guide.info" tag="p" class="text-body1">
        <template v-slot:fish>
          <router-link to="/fish/explore">
            {{ $t("home.guide.fish_link_title") }}
          </router-link>
        </template>
        <template v-slot:plants>
          <router-link to="/plants/explore">
            {{ $t("home.guide.plants_link_title") }}
          </router-link>
        </template>
        <template v-slot:ecosystem>
          <router-link to="/ecosystem/">
            {{ $t("home.guide.ecosystem_link_title") }}
          </router-link>
        </template>
      </i18n-t>
    </div>
  </q-page>
</template>

<style></style>
