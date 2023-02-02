import type { CodegenConfig } from "@graphql-codegen/cli";
// @ts-ignore
import typeDefs from "./src/gateway/schema";

const config: CodegenConfig = {
  schema: typeDefs,
  documents: ["src/**/*.ts"],
  generates: {
    "./src/__generated__/": {
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
  },
  ignoreNoDocuments: true,
};

export default config;
