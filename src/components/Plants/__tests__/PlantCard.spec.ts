import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { faker } from "@faker-js/faker";
// @ts-ignore
import PlantCard, { type PlantCardData } from "../PlantCard.vue";

installQuasar();

describe("PlantCard", () => {
  const buildPlantCardData = (): PlantCardData => {
    return {
      id: faker.datatype.uuid(),
      title: faker.random.words(2),
      status: faker.random.word(),
      shortDescription: faker.lorem.words(20),
      description: faker.lorem.words(200),
    };
  };

  function buildComponent(plantData?: PlantCardData) {
    plantData = plantData || buildPlantCardData();

    const wrapper = mount(PlantCard, {
      props: { plant: plantData },
    });
    return { wrapper, plantData };
  }

  it("renders properly", () => {
    const { plantData, wrapper } = buildComponent();
    expect(wrapper.text()).toContain(plantData.title);
    expect(wrapper.text()).toContain(plantData.status);
    expect(wrapper.text()).toContain(plantData.shortDescription);
    expect(wrapper.text()).toContain(plantData.description);

    expect(
      wrapper.get('[data-testid="plant-description"]').isVisible()
    ).toBeFalsy();
  });

  it("renders description on click", async () => {
    const { wrapper } = buildComponent();
    await wrapper.get('[data-testid="show-more-info"]').trigger("click");
    expect(
      wrapper.get('[data-testid="plant-description"]').isVisible()
    ).toBeTruthy();
  });

  it("emits add on click", async () => {
    const { wrapper } = buildComponent();
    await wrapper.get('[data-testid="add-plant"]').trigger("click");

    expect(wrapper.emitted()).toHaveProperty("add");
    expect(wrapper.emitted).toHaveLength(1);
  });
});
