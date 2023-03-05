import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { faker } from "@faker-js/faker";
// @ts-ignore
import { type FishCardData } from "../FishCard.vue";
import FishOptionsList from "../FishOptionsList.vue";

installQuasar();

describe("FishOptionList", () => {
  const buildFishCardData = (): FishCardData => {
    return {
      id: faker.datatype.uuid(),
      title: faker.random.words(2),
      status: faker.random.word(),
      shortDescription: faker.lorem.words(20),
      description: faker.lorem.words(200),
    };
  };

  function buildComponent(list?: FishCardData[]) {
    list = list || [
      buildFishCardData(),
      buildFishCardData(),
      buildFishCardData(),
      buildFishCardData(),
    ];

    const wrapper = mount(FishOptionsList, {
      props: { list: list },
    });
    return { wrapper, list };
  }

  it("renders properly", () => {
    const { list, wrapper } = buildComponent();
    expect(wrapper.findAll('[data-testid="fish-description"]')).toHaveLength(
      list.length
    );
  });

  it("emits add on click", async () => {
    const { list, wrapper } = buildComponent();
    await wrapper.get('[data-testid="add-fish"]').trigger("click");

    expect(wrapper.emitted).toHaveLength(1);
    const addEvent = wrapper.emitted("add");
    expect(addEvent).not.toBeNull();
    if (addEvent) {
      expect(addEvent[0][0]).toEqual(list[0]);
    }
  });

  it("emits add with proper data", async () => {
    const { list, wrapper } = buildComponent();
    await wrapper.get('[data-testid="add-fish"]').trigger("click");

    const addEvent = wrapper.emitted("add");
    expect(addEvent).not.toBeNull();
    if (addEvent) {
      expect(addEvent[0][0]).toEqual(list[0]);
    }
  });
});
