const typeDefs = `
extend type Ecosystem {
  id: ID!
  name: String!
  aquarium: AquariumGlass!
  analysis: [EcosystemAnalysisCategory!]
}

extend type EcosystemAnalysisCategory {
  id: ID!
  name: String!
  description: String!
  status: AnalysisStatus!
  messages: [EcosystemAnalysisMessage!]!
}

enum AnalysisStatus {
  ok
  moderate
  bad
}

extend type EcosystemAnalysisMessage {
  id: ID!
  name: String!
  description: String!
  status: AnalysisStatus!
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
