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
import SelectFish from "../Fish/SelectFish.vue";
import FishList from "../Fish/FishList.vue";
import PlantsList from "../Plants/PlantsList.vue";

installQuasar();

describe("EcosystemInfo", () => {
  const stubFishList = [
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
  const stubPlantsList = [
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
      shallow: true,
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
    ecosystem.fish.value = stubFishList;

    const { wrapper } = buildComponent(ecosystem);

    expect(wrapper.getComponent(FishList).props("list")).toHaveLength(
      ecosystem.fish.value.length
    );
  });

  it("renders plants list", () => {
    const ecosystem = buildEcosystem();
    ecosystem.plants.value = stubPlantsList;

    const { wrapper } = buildComponent(ecosystem);

    expect(wrapper.getComponent(PlantsList).props("list")).toHaveLength(
      ecosystem.plants.value.length
    );
  });

  it("trigger add fish", async () => {
    const { wrapper, fishFinder } = buildComponent();

    await wrapper.getComponent(SelectFish).trigger("add", {
      id: "test1",
    });

    const loginEvent = wrapper.emitted("fishAdd");
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
});
