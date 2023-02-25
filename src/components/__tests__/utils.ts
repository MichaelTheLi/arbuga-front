// @ts-ignore
import { type Ecosystem, useEcosystemsStore } from "@/stores/ecosystems";
import { faker } from "@faker-js/faker";

export const createRandomEcosystem = (
  store: ReturnType<typeof useEcosystemsStore>,
  empty: boolean = false
): Ecosystem => {
  const item = store.createNew();

  if (!empty) {
    item.name = faker.random.words(2);
    item.width.value = faker.datatype.number({ min: 20, max: 100 });
    item.height.value = faker.datatype.number({ min: 20, max: 100 });
    item.length.value = faker.datatype.number({ min: 20, max: 100 });
  }

  return item;
};
