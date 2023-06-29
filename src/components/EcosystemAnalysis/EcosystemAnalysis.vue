<template>
  <div v-if="!current">{{ $t("ecosystem.please_select") }}</div>
  <div v-else-if="!current.analysis">
    {{ $t("ecosystem.analysis.not_available") }}
  </div>
  <div v-else><EcosystemAnalysis :analysis="convertedAnalysis" /></div>
</template>

<script setup lang="ts">
import EcosystemAnalysis from "@/components/EcosystemAnalysis/EcosystemAnalysisInner.vue";
import {
  type EcosystemConvertedAnalysis,
  useEcosystemsStore,
} from "@/stores/ecosystems";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { computed } from "vue";

const store = useEcosystemsStore();
const { current } = storeToRefs(store);

const i18n = useI18n();

const convertedAnalysis = computed((): EcosystemConvertedAnalysis[] => {
  if (!current.value || !current.value.analysis) {
    return [];
  }

  return current.value.analysis.map((category) => {
    let messages: any[];
    messages = [];

    const i18nKey = "ecosystem.analysis.category." + category.serviceName;

    if (category.messages) {
      messages = category.messages.map((message) => {
        const i18nMessageKey = i18nKey + "." + message.serviceName;
        let parameters: any = {};

        message.parameters.forEach((param) => {
          parameters[param.name] = param.value;
        });

        if (parameters["current_value"] < parameters["min"]) {
          parameters["modifier"] = i18n.t(i18nKey + ".low");
          if (parameters["current_value"] < parameters["bad_min"]) {
            parameters["modifier"] = i18n.t(i18nKey + ".critically_low");
          }
        }

        if (parameters["current_value"] > parameters["max"]) {
          parameters["modifier"] = i18n.t(i18nKey + ".high");
          if (parameters["current_value"] > parameters["bad_max"]) {
            parameters["modifier"] = i18n.t(i18nKey + ".critically_high");
          }
        }
        return {
          serviceName: message.serviceName,
          status: message.status,
          statusName: i18n.t(i18nKey + ".status." + message.status),
          name: i18n.t(i18nMessageKey + ".name", parameters),
          description: i18n.t(i18nMessageKey + ".description", parameters),
        };
      });
    }

    return {
      serviceName: category.serviceName,
      description: i18n.t(i18nKey + ".description"),
      status: category.status,
      statusName: i18n.t(i18nKey + ".status." + category.status),
      name: i18n.t(i18nKey + ".name"),
      messages: messages,
    };
  });
});
</script>

<style scoped></style>
