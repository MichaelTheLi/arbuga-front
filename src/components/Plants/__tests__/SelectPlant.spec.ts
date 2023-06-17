import { describe, it, vi, expect } from "vitest";
import { mount } from "@vue/test-utils";

import _ from "lodash";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
// @ts-ignore
import SelectPlant from "../SelectPlant.vue";
import type { PlantOption } from "../../../stores/ecosystems";
import { computed, nextTick, ref, type Ref, unref } from "vue";

installQuasar();

const options = [
  {
    plant: {
      id: "test1",
      name: "Option 1",
      description: "Desc 1",
      scientific: {
        species: "Species 1",
      },
    },
  },
  {
    plant: {
      id: "test2",
      name: "Option 2",
      description: "Desc 2",
      scientific: {
        species: "Species 2",
      },
    },
  },
  {
    plant: {
      id: "test3",
      name: "Option 3",
      description: "Desc 3",
      scientific: {
        species: "Species 3",
      },
    },
  },
];

const defaultPlantFinder = (input: string): PlantOption[] => {
  if (!input) {
    return [];
  }

  const strRegExPattern = `.*?${input}.*?`;
  const regex = new RegExp(strRegExPattern, "g");
  return _.filter(options, (option) => {
    return !!option.plant.name.match(regex);
  });
};

vi.mock("@/gateway/gateway", () => {
  // noinspection JSUnusedGlobalSymbols
  return {
    usePlantSearch: (inputSubstring: Ref<string>) => {
      const localInput = ref("");

      return {
        options: computed(() => {
          return defaultPlantFinder(unref(localInput));
        }),
        load: () => {
          localInput.value = inputSubstring.value;
        },
      };
    },
  };
});

describe("SelectPlant", () => {
  function buildComponent() {
    const wrapper = mount(SelectPlant, {
      props: { debounceTimeout: 0 },
    });
    return { wrapper, plantFinder: defaultPlantFinder };
  }

  it("renders input", () => {
    const { wrapper } = buildComponent();
    expect(wrapper.find('[data-testid="plant-selector"]')).not.toBeNull();
  });

  it("plant selector options rendered", async () => {
    const { wrapper, plantFinder } = buildComponent();

    await wrapper.get('[data-testid="plant-selector"]').setValue("Option");
    await nextTick();

    const options = plantFinder("Option");
    expect(wrapper.findAll('[data-testid="plant-option"]')).length(
      options.length
    );
  });

  it("trigger add", async () => {
    const { wrapper, plantFinder } = buildComponent();

    const options = plantFinder("Option 1");
    await wrapper.get('[data-testid="plant-selector"]').setValue("Option 1");
    await wrapper.get('[data-testid="add-plant"]').trigger("click");

    const addEvent = wrapper.emitted("add");
    expect(addEvent).toHaveLength(1);
    if (addEvent) {
      // @ts-ignore
      expect(addEvent[0][0].id).toEqual(options[0].plant.id);
    }
  });

  it("reset to empty not searching for everything", async () => {
    const { wrapper } = buildComponent();

    await wrapper.get('[data-testid="plant-selector"]').setValue("Option 1");

    expect(wrapper.findAll('[data-testid="plant-option"]')).length(1);

    await wrapper.get('[data-testid="plant-selector"]').setValue("");

    expect(wrapper.findAll('[data-testid="plant-option"]')).length(
      0,
      "Options cleared"
    );
  });
});
