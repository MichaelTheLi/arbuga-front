<template>
  <q-list>
    <div class="q-pa-sm">
      <h5 class="q-my-md">{{ $t("ecosystem.analysis.your_progress") }}</h5>
      <q-linear-progress
        data-testid="analysis-progress"
        rounded
        color="accent"
        size="lg"
        :value="progress"
        animation-speed="300"
      />
    </div>
    <div
      v-for="(category, index) of preparedAnalysis"
      :key="category.serviceName"
      data-testid="analysis-category"
    >
      <q-item-label header data-testid="analysis-category-status">
        <span :class="'text-' + statusToColor(category.status)">{{
          category.name
        }}</span>
        <q-badge
          v-if="category.status !== 'ok'"
          :color="statusToColor(category.status)"
          :label="category.statusName"
          text-color="black"
          class="q-ml-xs"
        />
      </q-item-label>

      <!--      <q-item-label overline>{{category.description}}</q-item-label>-->

      <q-item
        v-for="message of category.messages"
        :key="message.serviceName"
        data-testid="analysis-message"
      >
        <q-item-section>
          <q-item-label lines="1">{{ message.name }}</q-item-label>
          <q-item-label caption>{{ message.description }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon
            data-testid="message-icon"
            :color="statusToColor(message.status)"
            :name="statusToIcon(message.status)"
          />
        </q-item-section>
      </q-item>

      <q-separator spaced inset v-show="index < analysis.length - 1" />
    </div>
  </q-list>
</template>

<script setup lang="ts">
import {
  QBadge,
  QIcon,
  QItem,
  QItemLabel,
  QItemSection,
  QLinearProgress,
  QList,
  QSeparator,
} from "quasar";
import { computed } from "vue";
import type { EcosystemAnalysis } from "@/stores/ecosystems";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  analysis: EcosystemAnalysis[];
}>();

const progress = computed(() => {
  const valid = props.analysis.filter(
    (analysisItem) => analysisItem.status === "ok"
  ).length;
  const total = props.analysis.length;
  return valid / total;
});

const i18n = useI18n();
const preparedAnalysis = props.analysis.map((category) => {
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
    status: category.status,
    statusName: i18n.t(i18nKey + ".status." + category.status),
    name: i18n.t(i18nKey + ".name"),
    messages: messages,
  };
});

const statusToColor = (status: string) => {
  if (status === "ok") {
    return "teal-7";
  }
  if (status === "moderate") {
    return "amber-7";
  }
  if (status === "bad") {
    return "red-7";
  }
  return "teal";
};

const statusToIcon = (status: string) => {
  if (status === "ok") {
    return "check";
  }
  if (status === "moderate") {
    return "warning";
  }
  if (status === "bad") {
    return "error";
  }
  return "info";
};
</script>

<style scoped></style>
