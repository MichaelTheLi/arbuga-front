import { describe, it, expect, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";

import EcosystemInfo from "../EcosystemInfo.vue";
import {
  type Ecosystem,
  type FishOption,
  useEcosystemsStore,
} from "../../stores/ecosystems";
import _ from "lodash";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";

installQuasar();

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

  // TODO move to component

  function buildComponent(
    ecosystem?: Ecosystem,
    fishFinder?: (input: string) => FishOption[]
  ) {
    ecosystem = ecosystem || buildEcosystem();
    const options = [
      {
        fish: {
          id: "test1",
          name: "Option 1",
        },
      },
      {
        fish: {
          id: "test2",
          name: "Option 2",
        },
      },
      {
        fish: {
          id: "test3",
          name: "Option 3",
        },
      },
    ];
    const defaultFishFinder = (input: string): FishOption[] => {
      if (!input) {
        return [];
      }

      const strRegExPattern = `.*?${input}.*?`;
      const regex = new RegExp(strRegExPattern, "g");
      return _.filter(options, (option) => {
        return !!option.fish.name.match(regex);
      });
    };
    fishFinder = fishFinder || defaultFishFinder;

    const wrapper = mount(EcosystemInfo, {
      props: { ecosystem: ecosystem, fishFinder: fishFinder },
    });
    return { ecosystem, wrapper, fishFinder };
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
        id: "test1",
        name: "Harlequin rasbora",
        count: 85812,
      },
      {
        id: "test2",
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
        id: "test1",
        name: "Anubias",
        count: 16612621,
      },
      {
        id: "test2",
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

  it("renders empty fish", () => {
    const { wrapper } = buildComponent();

    const list = wrapper.findAll('[data-testid="fish-option"]');
    expect(list).length(0);
  });

  it("renders empty plants", () => {
    const { wrapper } = buildComponent();

    const list = wrapper.findAll('[data-testid="plant-item"]');
    expect(list).length(0);
  });

  it("fish selector options rendered", async () => {
    const { wrapper, fishFinder } = buildComponent();

    await wrapper.get('[data-testid="fish-selector"]').setValue("Option");

    expect(wrapper.findAll('[data-testid="fish-option"]')).length(
      fishFinder("Option").length
    );
  });

  it("can add fish", async () => {
    const { wrapper, fishFinder } = buildComponent();

    await wrapper.get('[data-testid="fish-selector"]').setValue("Option");
    const addFishButton = wrapper.get('[data-testid="add-fish"]');
    await addFishButton.trigger("click");

    const loginEvent = wrapper.emitted("add");
    expect(loginEvent).toHaveLength(1);
    if (loginEvent) {
      const optionId = fishFinder("Option")[0].fish.id;
      expect(loginEvent[0]).toEqual([optionId]);
    }

    expect(wrapper.findAll('[data-testid="fish-option"]')).length(
      0,
      "Options cleared"
    );
  });

  it.todo("can't add fish in invalid selector", () => {});
});
