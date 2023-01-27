import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { graphql } from "graphql/graphql";
import { faker } from "@faker-js/faker";
import type { ExecutionResult } from "graphql/execution";

// Fill this in with the schema string
const schemaString = `
type Ecosystem {
  id: ID!
  name: String!
  aquarium: AquariumGlass
  info: EcosystemInfo!
}

type EcosystemInfo {
  heuristics: [EcosystemHeuristic]
}

type EcosystemHeuristic {
  id: ID!
  name: String!
  description: String!
}

type AquariumGlass {
  dimensions: Dimensions
  glassThickness: Int
  substrateThickness: Int
  decorationsVolume: Int
}

type Dimensions {
  width: Int
  height: Int
  length: Int
}

type Query {
  ecosystems: [Ecosystem]
  ecosystem(id: ID!): Ecosystem
}
`;

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: schemaString });

const mocks = {
  Ecosystem: () => ({
    name: faker.word.adjective() + " " + faker.word.noun(),
  }),
  Dimensions: () => ({
    width: faker.datatype.number({ min: 20, max: 100 }),
    height: faker.datatype.number({ min: 20, max: 100 }),
    length: faker.datatype.number({ min: 20, max: 100 }),
  }),
};
// Create a new schema with mocks
const schemaWithMocks = addMocksToSchema({ schema, mocks });

const ecosystemsQuery = /* GraphQL */ `
query ecosystems {
    ecosystems {
        id
        name
        aquarium {
            dimensions {
                width
                height
                length
            }
        }
    }
}
`;

export const loadEcosystems = () => {
  return graphql({
    schema: schemaWithMocks,
    source: ecosystemsQuery,
  }).then(result => result.data.ecosystems);
};
