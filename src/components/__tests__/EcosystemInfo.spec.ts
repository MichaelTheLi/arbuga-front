import { describe, it, expect, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";

import EcosystemInfo from "../EcosystemInfo.vue";
import { type Ecosystem, useEcosystemsStore } from "../../stores/ecosystems";

describe("EcosystemInfo", () => {
  const buildEcosystem = (): Ecosystem => {
    const store = useEcosystemsStore(
      createTestingPinia({
        createSpy: vi.fn,
        stubActions: false,
      })
    );

    const ecosystem = store.createNew("Test name");
    ecosystem.width.value = 11;
    ecosystem.height.value = 12;
    ecosystem.length.value = 13;
    return ecosystem;
  };

  function buildComponent(ecosystem?: Ecosystem) {
    ecosystem = ecosystem || buildEcosystem();
    const wrapper = mount(EcosystemInfo, {
      props: { ecosystem: ecosystem },
    });
    return { ecosystem, wrapper };
  }

  it("renders volume", () => {
    const { ecosystem, wrapper } = buildComponent();
    expect(wrapper.text()).toContain(
      `Actual volume: ${ecosystem.volume.value}l`
    );
  });

  it("renders fish list", () => {
    const ecosystem = buildEcosystem();
    ecosystem.fish.value = [
      {
        name: "Harlequin rasbora",
        count: 85812,
      },
      {
        name: "July corydoras",
        count: 51233,
      },
    ];

    const { wrapper } = buildComponent(ecosystem);

    const list = wrapper.findAll('[data-testid="fish-item"]');
    expect(list).length(ecosystem.fish.value.length);

    ecosystem.fish.value.forEach((fish, index) => {
      expect(list[index].text()).contains(fish.name);
      expect(list[index].text()).contains(fish.count);
    });
  });

  it("renders plants list", () => {
    const ecosystem = buildEcosystem();
    ecosystem.plants.value = [
      {
        name: "Anubias",
        count: 16612621,
      },
      {
        name: "Valisneria",
        count: 96126091824,
      },
    ];

    const { wrapper } = buildComponent(ecosystem);

    const list = wrapper.findAll('[data-testid="plant-item"]');
    expect(list).length(ecosystem.plants.value.length);

    ecosystem.fish.value.forEach((plant, index) => {
      expect(list[index].text()).contains(plant.name);
      expect(list[index].text()).contains(plant.count);
    });
  });
});
