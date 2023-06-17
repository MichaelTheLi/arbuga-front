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
      plant: {
        id: faker.datatype.uuid(),
        name: faker.random.words(2),
        count: faker.datatype.number({ min: 1, max: 100 }),
      },
      count: faker.datatype.number({ min: 1, max: 20 }),
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

    expect(list.length).not.eq(0);
    expect(wrapper.findAll('[data-testid="plant-list-item"]')).toHaveLength(
      list.length
    );
  });

  it("renders item correctly", () => {
    const stubPlant = buildStubPlant();
    const { wrapper } = buildComponent([stubPlant]);

    expect(wrapper.text()).toContain(stubPlant.plant.name);
    const data = wrapper.get('[data-testid="plant-count-input"]');
    // @ts-ignore
    const realValue = data.element.value;
    expect(realValue).toEqual(stubPlant.count.toString());
  });

  it("emits remove event with plant on remove click", async () => {
    const stubPlant = buildStubPlant();
    const { wrapper } = buildComponent([stubPlant]);

    await wrapper.get('[data-testid="plant-remove-button"]').trigger("click");

    expect(wrapper.emitted()).toHaveProperty("remove");
    const removeEvent = wrapper.emitted("remove");
    expect(removeEvent).toHaveLength(1);
    if (removeEvent) {
      expect(removeEvent[0]).toEqual([stubPlant]);
    }
  });

  it("emits update event with plant and count on update click", async () => {
    const stubPlant = buildStubPlant();
    const { wrapper } = buildComponent([stubPlant]);

    await wrapper.get('[data-testid="plant-count-input"]').setValue(312);

    expect(wrapper.emitted()).toHaveProperty("updateCount");
    const updateEvent = wrapper.emitted("updateCount");
    expect(updateEvent).toHaveLength(1);
    if (updateEvent) {
      expect(updateEvent[0]).toEqual([stubPlant, 312]);
    }
  });
});
