import { config } from "@vue/test-utils";
import { createI18n } from "vue-i18n";
import { i18nMessages } from "../../config";

const i18n = createI18n({
  legacy: true,
  locale: "en-US",
  formatFallbackMessages: true,
  messages: i18nMessages,
});

config.global.plugins = [i18n];
