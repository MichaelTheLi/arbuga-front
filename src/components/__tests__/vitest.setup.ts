import { config } from "@vue/test-utils";
import { createI18n } from "vue-i18n";
import { i18nMessages, numberFormats } from "../../config";

const i18n = createI18n({
  legacy: false,
  locale: "en-US",
  formatFallbackMessages: false,
  messages: i18nMessages,
  numberFormats: numberFormats,
});

config.global.plugins = [i18n];
