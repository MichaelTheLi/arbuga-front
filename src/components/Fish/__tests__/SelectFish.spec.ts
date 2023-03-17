import { describe, it, vi, expect } from "vitest";
import { mount } from "@vue/test-utils";

import _ from "lodash";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
// @ts-ignore
import SelectFish from "../SelectFish.vue";
import type { FishOption } from "../../../stores/ecosystems";
import { computed, nextTick, ref, type Ref, unref } from "vue";

installQuasar();

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

vi.mock("@/gateway/gateway", () => {
  // noinspection JSUnusedGlobalSymbols
  return {
    useFishSearch: (inputSubstring: Ref<string>) => {
      const localInput = ref("");

      return {
        options: computed(() => {
          return defaultFishFinder(unref(localInput));
        }),
        load: () => {
          localInput.value = inputSubstring.value;
        },
      };
    },
  };
});

describe("SelectFish", () => {
  function buildComponent() {
    const wrapper = mount(SelectFish, {
      props: { debounceTimeout: 0 },
    });
    return { wrapper, fishFinder: defaultFishFinder };
  }

  it("renders input", () => {
    const { wrapper } = buildComponent();
    expect(wrapper.find('[data-testid="fish-selector"]')).not.toBeNull();
  });

  it("fish selector options rendered", async () => {
    const { wrapper, fishFinder } = buildComponent();

    await wrapper.get('[data-testid="fish-selector"]').setValue("Option");
    await nextTick();

    const options = fishFinder("Option");
    expect(wrapper.findAll('[data-testid="fish-option"]')).length(
      options.length
    );
  });

  it("trigger add", async () => {
    const { wrapper, fishFinder } = buildComponent();

    const options = fishFinder("Option 1");
    await wrapper.get('[data-testid="fish-selector"]').setValue("Option 1");
    await wrapper.get('[data-testid="add-fish"]').trigger("click");

    const addEvent = wrapper.emitted("add");
    expect(addEvent).toHaveLength(1);
    if (addEvent) {
      // @ts-ignore
      expect(addEvent[0][0].id).toEqual(options[0].fish.id);
    }
  });

  it("reset to empty not searching for everything", async () => {
    const { wrapper } = buildComponent();

    await wrapper.get('[data-testid="fish-selector"]').setValue("Option 1");

    expect(wrapper.findAll('[data-testid="fish-option"]')).length(1);

    await wrapper.get('[data-testid="fish-selector"]').setValue("");

    expect(wrapper.findAll('[data-testid="fish-option"]')).length(
      0,
      "Options cleared"
    );
  });
});
