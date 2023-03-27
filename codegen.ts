import type { CodegenConfig } from "@graphql-codegen/cli";
// @ts-ignore
import typeDefs from "./src/gateway/schema";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:7171/query",
  documents: ["src/**/*.vue", "src/**/*.ts"],
  generates: {
    "./src/__generated__/": {
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
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
