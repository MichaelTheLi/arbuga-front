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
        scientific: {
          species: faker.random.words(2),
        },
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
    const data = wrapper.get('[data-testid="fish-count-input"]');
    // @ts-ignore
    const realValue = data.element.value;
    expect(realValue).toEqual(stubFish.count.toString());
  });

  it("emits remove event with fish on remove click", async () => {
    const stubFish = buildStubFish();
    const { wrapper } = buildComponent([stubFish]);

    await wrapper.get('[data-testid="fish-remove-button"]').trigger("click");

    expect(wrapper.emitted()).toHaveProperty("remove");
    const removeEvent = wrapper.emitted("remove");
    expect(removeEvent).toHaveLength(1);
    if (removeEvent) {
      expect(removeEvent[0]).toEqual([stubFish]);
    }
  });

  it("emits update event with fish and count on update click", async () => {
    const stubFish = buildStubFish();
    const { wrapper } = buildComponent([stubFish]);

    await wrapper.get('[data-testid="fish-count-input"]').setValue(312);

    expect(wrapper.emitted()).toHaveProperty("updateCount");
    const updateEvent = wrapper.emitted("updateCount");
    expect(updateEvent).toHaveLength(1);
    if (updateEvent) {
      expect(updateEvent[0]).toEqual([stubFish, 312]);
    }
  });
});
