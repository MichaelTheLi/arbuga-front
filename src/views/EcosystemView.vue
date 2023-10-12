<script setup lang="ts">
import EcosystemInfo from "@/components/EcosystemInfo.vue";
import { useEcosystemsStore } from "@/stores/ecosystems";
import { storeToRefs } from "pinia";
import { QPage, useMeta } from "quasar";
import EditEcosystem from "@/components/EditEcosystem.vue";
import { useI18n } from "vue-i18n";

const store = useEcosystemsStore();

let { current } = storeToRefs(store);

const i18n = useI18n();
useMeta({
  title: i18n.t("titles.your_ecosystem"),
  meta: {
    description: {
      name: "description",
      content: i18n.t("descriptions.your_ecosystem"),
    },
  },
});
</script>

<template>
  <q-page padding>
    <div v-if="current">
      <EditEcosystem :ecosystem="current" />
      <h5 class="q-my-md">{{ $t("ecosystem.parameters") }}</h5>
      <EcosystemInfo :ecosystem="current" />
    </div>
    <div v-else>{{ $t("ecosystem.please_select") }}</div>
  </q-page>
</template>
