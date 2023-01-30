const typeDefs = `
extend type Ecosystem {
  id: ID!
  name: String!
  aquarium: AquariumGlass!
  info: EcosystemInfo!
}

extend type EcosystemInfo {
  heuristics: [EcosystemHeuristic]
}

extend type EcosystemHeuristic {
  id: ID!
  name: String!
  description: String!
}

extend type AquariumGlass {
  dimensions: Dimensions!
  glassThickness: Int!
  substrateThickness: Int
  decorationsVolume: Int
}

extend type Dimensions {
  width: Int!
  height: Int!
  length: Int!
}

extend type Query {
  ecosystems: [Ecosystem!]
  ecosystem(id: ID!): Ecosystem
}
`;

export default typeDefs;
