import { faker } from "@faker-js/faker";

export const seedEcosystems = [
  {
    id: faker.datatype.uuid(),
    name: faker.word.adjective() + " " + faker.word.noun(),
    aquarium: {
      dimensions: {
        width: faker.datatype.number({ min: 20, max: 100 }),
        height: faker.datatype.number({ min: 20, max: 100 }),
        length: faker.datatype.number({ min: 20, max: 100 }),
      },
    },
    analysis: [
      {
        id: faker.datatype.uuid(),
        name: "Filtration",
        description: "Filtration params",
        status: "ok",
        messages: [],
      },
      {
        id: faker.datatype.uuid(),
        name: "Temperature",
        description: "Temperature params",
        status: "moderate",
        messages: [
          {
            id: faker.datatype.uuid(),
            name: "Too low for some",
            description: "These guys",
            status: "moderate",
          },
        ],
      },
      {
        id: faker.datatype.uuid(),
        name: "Compatibility",
        description: "Compatibility params",
        status: "bad",
        messages: [
          {
            id: faker.datatype.uuid(),
            name: "These guys are incompatible",
            description: "This and this - will fight",
            status: "bad",
          },
        ],
      },
    ],
  },
  {
    id: "qwe",
    name: faker.word.adjective() + " " + faker.word.noun(),
    aquarium: {
      dimensions: {
        width: faker.datatype.number({ min: 20, max: 100 }),
        height: faker.datatype.number({ min: 20, max: 100 }),
        length: faker.datatype.number({ min: 20, max: 100 }),
      },
    },
    analysis: [
      {
        id: faker.datatype.uuid(),
        name: "Filtration",
        description: "Filtration params",
        status: "ok",
        messages: [],
      },
      {
        id: faker.datatype.uuid(),
        name: "Temperature",
        description: "Temperature params",
        status: "ok",
        messages: [],
      },
      {
        id: faker.datatype.uuid(),
        name: "Compatibility",
        description: "Compatibility params",
        status: "moderate",
        messages: [
          {
            id: faker.datatype.uuid(),
            name: "These guys are incompatible",
            description: "This and this - will fight",
            status: "moderate",
          },
        ],
      },
    ],
  },
];

export const seedUser = {
  id: faker.datatype.uuid(),
  login: null,
  name: "It's a me, Mario",
  ecosystems: seedEcosystems,
};
