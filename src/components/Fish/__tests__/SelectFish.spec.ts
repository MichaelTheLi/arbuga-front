import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import _ from "lodash";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import SelectFish from "../SelectFish.vue";
import type { FishOption } from "../../../stores/ecosystems";

installQuasar();

describe("SelectFish", () => {
  function buildComponent(
    fishFinder?: (input: string) => Promise<FishOption[]>
  ) {
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
    const defaultFishFinder = async (input: string): Promise<FishOption[]> => {
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

    const wrapper = mount(SelectFish, {
      props: { fishFinder, debounceTimeout: 0 },
    });
    return { wrapper, fishFinder };
  }

  it("renders input", () => {
    const { wrapper } = buildComponent();
    expect(wrapper.find('[data-testid="fish-selector"]')).not.toBeNull();
  });

  it("fish selector options rendered", async () => {
    const { wrapper, fishFinder } = buildComponent();

    await wrapper.get('[data-testid="fish-selector"]').setValue("Option");

    const options = await fishFinder("Option");
    expect(wrapper.findAll('[data-testid="fish-option"]')).length(
      options.length
    );
  });

  it("trigger add", async () => {
    const { wrapper, fishFinder } = buildComponent();

    const options = await fishFinder("Option 1");
    await wrapper.get('[data-testid="fish-selector"]').setValue("Option 1");
    await wrapper.get('[data-testid="add-fish"]').trigger("click");

    const addEvent = wrapper.emitted("add");
    expect(addEvent).toHaveLength(1);
    if (addEvent) {
      // @ts-ignore
      expect(addEvent[0][0].id).toEqual(options[0].fish.id);
    }

    expect(wrapper.findAll('[data-testid="fish-option"]')).length(
      0,
      "Options cleared"
    );
  });
});
