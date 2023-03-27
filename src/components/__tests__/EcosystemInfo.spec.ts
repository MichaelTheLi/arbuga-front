import { describe, it, expect, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";

import EcosystemInfo from "../EcosystemInfo.vue";
import {
  type AquariumFish,
  type Ecosystem,
  useEcosystemDynamicVolume,
  useEcosystemsStore,
} from "../../stores/ecosystems";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import FishList from "../Fish/FishList.vue";
import PlantsList from "../Plants/PlantsList.vue";
import { faker } from "@faker-js/faker";

installQuasar();

describe("EcosystemInfo", () => {
  const stubFishList = [
    {
      fish: {
        id: "test1",
        name: "Harlequin rasbora",
        description: "something",
      },
      count: 85812,
    },
    {
      fish: {
        id: "test2",
        name: "July corydoras",
        description: "To the bottom we go",
      },
      count: 51233,
    },
  ] as AquariumFish[];
  const stubPlantsList = [
    {
      plant: {
        id: "test1",
        name: "Anubias",
      },
      count: 16612621,
    },
    {
      plant: {
        id: "test2",
        name: "Valisneria",
      },
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
    ecosystem.width = faker.datatype.number({ min: 10, max: 100 });
    ecosystem.height = faker.datatype.number({ min: 10, max: 100 });
    ecosystem.length = faker.datatype.number({ min: 10, max: 100 });
    return ecosystem;
  };

  function buildComponent(ecosystem?: Ecosystem) {
    ecosystem = ecosystem || buildEcosystem();
    const wrapper = mount(EcosystemInfo, {
      props: { ecosystem: ecosystem },
      shallow: true,
    });
    return { ecosystem, wrapper };
  }

  it("renders volume", () => {
    const { ecosystem, wrapper } = buildComponent();

    const { volume } = useEcosystemDynamicVolume(ecosystem);
    expect(wrapper.text()).toContain(`Actual volume: ${volume.value}l`);
  });

  it("renders volume after props change", async () => {
    const { wrapper, ecosystem: originalEcosystem } = buildComponent();

    const { volume: origVolume } = useEcosystemDynamicVolume(originalEcosystem);
    expect(wrapper.text()).toContain(`Actual volume: ${origVolume.value}l`);

    const ecosystem = buildEcosystem();
    await wrapper.setProps({ ecosystem });
    const { volume } = useEcosystemDynamicVolume(ecosystem);
    expect(wrapper.text()).toContain(`Actual volume: ${volume.value}l`);
    expect(volume.value).not.eq(origVolume.value);
  });

  it("renders fish list", () => {
    const ecosystem = buildEcosystem();
    ecosystem.fish = stubFishList;

    const { wrapper } = buildComponent(ecosystem);

    expect(wrapper.getComponent(FishList).props("list")).toHaveLength(
      ecosystem.fish.length
    );
  });

  it("renders plants list", () => {
    const ecosystem = buildEcosystem();
    ecosystem.plants = stubPlantsList;

    const { wrapper } = buildComponent(ecosystem);

    expect(wrapper.getComponent(PlantsList).props("list")).toHaveLength(
      ecosystem.plants.length
    );
  });
});
