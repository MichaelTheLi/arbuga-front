import type { CodegenConfig } from "@graphql-codegen/cli";
// @ts-ignore
import typeDefs from "./src/gateway/schema";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api.werel.ru/query",
  documents: ["src/background/**/*.ts"],
  generates: {
    "./src/background/__generated__/": {
      schema: typeDefs,
      preset: "client",
      config: {
        skipTypename: true,
        useTypeImports: true,
      },
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./src/background/graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
