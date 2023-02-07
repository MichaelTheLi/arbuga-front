import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import EcosystemInfo from "../EcosystemInfo.vue";

describe("EcosystemInfo", () => {
  it("renders properly", () => {
    const wrapper = mount(EcosystemInfo, {
      props: { ecosystem: { volume: 123 } },
    });
    expect(wrapper.text()).toContain("Actual volume: 123l");
  });
});
