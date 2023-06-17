// @ts-ignore
import { type Ecosystem, useEcosystemsStore } from "@/stores/ecosystems";
import { faker } from "@faker-js/faker";
import type { VueWrapper } from "@vue/test-utils";

export const createRandomEcosystem = (
  store: ReturnType<typeof useEcosystemsStore>,
  empty: boolean = false
): Ecosystem => {
  const item = store.createNew();

  if (!empty) {
    item.name = faker.random.words(2);
    item.width = faker.datatype.number({ min: 20, max: 100 });
    item.height = faker.datatype.number({ min: 20, max: 100 });
    item.length = faker.datatype.number({ min: 20, max: 100 });
    item.waterReplacement = {
      waterParameters: {
        ph: faker.datatype.number({ min: 1, max: 10 }),
        gh: faker.datatype.number({ min: 1, max: 10 }),
        kh: faker.datatype.number({ min: 1, max: 10 }),
        temperature: faker.datatype.number({ min: 10, max: 30 }),
      },
    };
    item.equipment = {
      filtersFlow: faker.datatype.number({ min: 100, max: 5000 }),
      heatersPower: faker.datatype.number({ min: 10, max: 1000 }),
      lightingLux: faker.datatype.number({ min: 100, max: 50000 }),
    };
  }

  return item;
};

export const elementValue = (wrapper: VueWrapper<any>, name: string) => {
  // @ts-ignore
  return wrapper.get(`[data-testid="edit-ecosystem-${name}"]`).element.value;
};
