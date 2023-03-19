import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { faker } from "@faker-js/faker";
import type { AquariumFish } from "../../../stores/ecosystems";
import FishList from "../FishList.vue";

installQuasar();

describe("FishList", () => {
  function buildStubFish() {
    return {
      fish: {
        id: faker.datatype.uuid(),
        name: faker.random.words(2),
        description: faker.random.words(10),
      },
      count: faker.datatype.number({ min: 1, max: 100 }),
    };
  }

  function buildDefaultList(): AquariumFish[] {
    return [buildStubFish(), buildStubFish(), buildStubFish(), buildStubFish()];
  }
  function buildComponent(list?: AquariumFish[]) {
    list = list || buildDefaultList();

    const wrapper = mount(FishList, {
      props: { list },
    });
    return { wrapper, list };
  }

  it("renders correct count", () => {
    const { list, wrapper } = buildComponent();

    expect(wrapper.findAll('[data-testid="fish-list-item"]')).toHaveLength(
      list.length
    );
  });

  it("renders item correctly", () => {
    const stubFish = buildStubFish();
    const { wrapper } = buildComponent([stubFish]);

    expect(wrapper.text()).toContain(stubFish.fish.name);
    expect(wrapper.text()).toContain(stubFish.count);
  });
});
