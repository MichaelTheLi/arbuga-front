import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import EcosystemInfo from "../EcosystemInfo.vue";

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = mount(EcosystemInfo, { props: { ecosystem: {name: "Test name"} } });
    expect(wrapper.text()).toContain("Name: Test name");
  });
});
