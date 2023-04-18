import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [vue()],
  plugins: [
    // @ts-ignore
    vue({
      template: { transformAssetUrls },
    }),

    // @ts-ignore
    quasar({
      autoImportComponentCase: "pascal",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    setupFiles: "src/components/__tests__/vitest.setup.ts",
    coverage: {
      provider: "istanbul", // or 'c8',
      exclude: ["**/*.spec.js", "__generated__"],
    },
  },
});
