// noinspection JSUnusedGlobalSymbols

import {
  AnalysisStatus,
  type Ecosystem,
  type UserQueryQuery,
} from "@/__generated__/graphql";
import { faker } from "@faker-js/faker";

export const seedEcosystems: Ecosystem[] = [
  {
    id: faker.datatype.uuid(),
    name: faker.word.adjective() + " " + faker.word.noun(),
    aquarium: {
      dimensions: {
        width: faker.datatype.number({ min: 20, max: 100 }),
        height: faker.datatype.number({ min: 20, max: 100 }),
        length: faker.datatype.number({ min: 20, max: 100 }),
      },
      glassThickness: 6,
    },
    waterReplacement: {
      water: {
        chemical: {
          ph: faker.datatype.number(),
          gh: faker.datatype.number(),
          kh: faker.datatype.number(),
          ammonia: faker.datatype.number(),
          nitrate: faker.datatype.number(),
          nitrite: faker.datatype.number(),
        },
        temperature: faker.datatype.number(),
      },
    },
    equipment: {
      filters: [{ flow: 100 }],
      heaters: [{ power: 100 }],
      lightingItems: [{ lux: 100 }],
    },
    analysis: [
      {
        id: faker.datatype.uuid(),
        name: "Filtration",
        description: "Filtration params",
        status: AnalysisStatus["Ok"],
        messages: [
          {
            id: faker.datatype.uuid(),
            name: "These params are ok",
            description: "Kinda ok",
            status: AnalysisStatus["Ok"],
          },
          {
            id: faker.datatype.uuid(),
            name: "You have 20% overkill",
            description: "Nice",
            status: AnalysisStatus["Ok"],
          },
        ],
      },
      {
        id: faker.datatype.uuid(),
        name: "Temperature",
        description: "Temperature params",
        status: AnalysisStatus["Moderate"],
        messages: [],
      },
      {
        id: faker.datatype.uuid(),
        name: "Compatibility",
        description: "Compatibility params",
        status: AnalysisStatus["Moderate"],
        messages: [
          {
            id: faker.datatype.uuid(),
            name: "These guys are kinda compatible",
            description: "But not really",
            status: AnalysisStatus["Moderate"],
          },
          {
            id: faker.datatype.uuid(),
            name: "These guys are compatible",
            description: "Ok",
            status: AnalysisStatus["Ok"],
          },
        ],
      },
    ],
  },
];

export const seedEcosystemsAnother: Ecosystem[] = [
  {
    id: faker.datatype.uuid(),
    name: faker.word.adjective() + " " + faker.word.noun(),
    aquarium: {
      dimensions: {
        width: faker.datatype.number({ min: 20, max: 100 }),
        height: faker.datatype.number({ min: 20, max: 100 }),
        length: faker.datatype.number({ min: 20, max: 100 }),
      },
      glassThickness: 6,
    },
    waterReplacement: {
      water: {
        chemical: {
          ph: faker.datatype.number(),
          gh: faker.datatype.number(),
          kh: faker.datatype.number(),
          ammonia: faker.datatype.number(),
          nitrate: faker.datatype.number(),
          nitrite: faker.datatype.number(),
        },
        temperature: faker.datatype.number(),
      },
    },
    equipment: {
      filters: [{ flow: 100 }],
      heaters: [{ power: 100 }],
      lightingItems: [{ lux: 100 }],
    },
    analysis: [
      {
        id: faker.datatype.uuid(),
        name: "Filtration",
        description: "Filtration params",
        status: AnalysisStatus["Ok"],
        messages: [],
      },
      {
        id: faker.datatype.uuid(),
        name: "Temperature",
        description: "Temperature params",
        status: AnalysisStatus["Moderate"],
        messages: [
          {
            id: faker.datatype.uuid(),
            name: "Too low for some",
            description: "These guys",
            status: AnalysisStatus["Moderate"],
          },
        ],
      },
      {
        id: faker.datatype.uuid(),
        name: "Compatibility",
        description: "Compatibility params",
        status: AnalysisStatus["Bad"],
        messages: [
          {
            id: faker.datatype.uuid(),
            name: "These guys are incompatible",
            description: "This and this - will fight",
            status: AnalysisStatus["Bad"],
          },
        ],
      },
    ],
  },
  {
    id: faker.datatype.uuid(),
    name: faker.word.adjective() + " " + faker.word.noun(),
    aquarium: {
      dimensions: {
        width: faker.datatype.number({ min: 20, max: 100 }),
        height: faker.datatype.number({ min: 20, max: 100 }),
        length: faker.datatype.number({ min: 20, max: 100 }),
      },
      glassThickness: 8,
    },
    waterReplacement: {
      water: {
        chemical: {
          ph: faker.datatype.number(),
          gh: faker.datatype.number(),
          kh: faker.datatype.number(),
          ammonia: faker.datatype.number(),
          nitrate: faker.datatype.number(),
          nitrite: faker.datatype.number(),
        },
        temperature: faker.datatype.number(),
      },
    },
    equipment: {
      filters: [{ flow: 100 }],
      heaters: [{ power: 100 }],
      lightingItems: [{ lux: 100 }],
    },
    analysis: [
      {
        id: faker.datatype.uuid(),
        name: "Filtration",
        description: "Filtration params",
        status: AnalysisStatus["Ok"],
        messages: [],
      },
      {
        id: faker.datatype.uuid(),
        name: "Temperature",
        description: "Temperature params",
        status: AnalysisStatus["Ok"],
        messages: [],
      },
      {
        id: faker.datatype.uuid(),
        name: "Compatibility",
        description: "Compatibility params",
        status: AnalysisStatus["Moderate"],
        messages: [
          {
            id: faker.datatype.uuid(),
            name: "These guys are incompatible",
            description: "This and this - will fight",
            status: AnalysisStatus["Moderate"],
          },
        ],
      },
    ],
  },
];

export const anonymousUser: UserQueryQuery["me"] = {
  id: faker.datatype.uuid(),
  login: null,
  name: "Mario",
  // ecosystems: useFragment(EcosystemFragment, seedEcosystems),
};

export const loggedUser: UserQueryQuery["me"] = {
  id: faker.datatype.uuid(),
  login: "alive",
  name: "MichaelAlive",
  // ecosystems: seedEcosystemsAnother,
};
