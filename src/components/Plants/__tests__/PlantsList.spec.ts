import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { faker } from "@faker-js/faker";
import type { AquariumPlant } from "../../../stores/ecosystems";
import PlantsList from "../PlantsList.vue";

installQuasar();

describe("PlantsList", () => {
  function buildStubPlant() {
    return {
      id: faker.datatype.uuid(),
      name: faker.random.words(2),
      count: faker.datatype.number({ min: 1, max: 100 }),
    };
  }

  function buildDefaultList(): AquariumPlant[] {
    return [
      buildStubPlant(),
      buildStubPlant(),
      buildStubPlant(),
      buildStubPlant(),
    ];
  }
  function buildComponent(list?: AquariumPlant[]) {
    list = list || buildDefaultList();

    const wrapper = mount(PlantsList, {
      props: { list },
    });
    return { wrapper, list };
  }

  it("renders correct count", () => {
    const { list, wrapper } = buildComponent();

    expect(wrapper.findAll('[data-testid="plant-list-item"]')).toHaveLength(
      list.length
    );
  });

  it("renders item correctly", () => {
    const stubPlant = buildStubPlant();
    const { wrapper } = buildComponent([stubPlant]);

    expect(wrapper.text()).toContain(stubPlant.name);
    expect(wrapper.text()).toContain(stubPlant.count);
  });
});
