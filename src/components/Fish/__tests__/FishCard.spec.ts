import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { faker } from "@faker-js/faker";
// @ts-ignore
import FishCard, { type FishCardData } from "../FishCard.vue";

installQuasar();

describe("FishCard", () => {
  const buildFishCardData = (): FishCardData => {
    return {
      id: faker.datatype.uuid(),
      title: faker.random.words(2),
      status: faker.random.word(),
      shortDescription: faker.lorem.words(20),
      description: faker.lorem.words(200),
    };
  };

  function buildComponent(fishData?: FishCardData) {
    fishData = fishData || buildFishCardData();

    const wrapper = mount(FishCard, {
      props: { fish: fishData },
    });
    return { wrapper, fishData };
  }

  it("renders properly", () => {
    const { fishData, wrapper } = buildComponent();
    expect(wrapper.text()).toContain(fishData.title);
    expect(wrapper.text()).toContain(fishData.status);
    expect(wrapper.text()).toContain(fishData.shortDescription);
    expect(wrapper.text()).toContain(fishData.description);

    expect(
      wrapper.get('[data-testid="fish-description"]').isVisible()
    ).toBeFalsy();
  });

  it("renders description on click", async () => {
    const { wrapper } = buildComponent();
    await wrapper.get('[data-testid="show-more-info"]').trigger("click");
    expect(
      wrapper.get('[data-testid="fish-description"]').isVisible()
    ).toBeTruthy();
  });

  it("emits add on click", async () => {
    const { wrapper } = buildComponent();
    await wrapper.get('[data-testid="add-fish"]').trigger("click");

    expect(wrapper.emitted()).toHaveProperty("add");
    expect(wrapper.emitted).toHaveLength(1);
  });
});
