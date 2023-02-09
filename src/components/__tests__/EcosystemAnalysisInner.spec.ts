import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import EcosystemAnalysisInner from "../EcosystemAnalysis/EcosystemAnalysisInner.vue";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";

installQuasar();

describe("EcosystemInfo", () => {
  it("renders properly", () => {
    const list = [
      {
        id: "test1",
        name: "First name",
        description: "First description",
        status: "ok",
        messages: [
          {
            id: "test11",
            name: "First message",
            description: "First message description",
            status: "ok",
          },
        ],
      },
      {
        id: "test2",
        name: "Another name",
        description: "Another description",
        status: "moderate",
        messages: [
          {
            id: "test21",
            name: "Another message",
            description: "Another message description",
            status: "moderate",
          },
          {
            id: "test22",
            name: "Yet another name",
            description: "Yet another description",
            status: "bad",
          },
        ],
      },
      {
        id: "test3",
        name: "Is it even a name",
        description: "Not really",
        status: "bad",
        messages: [],
      },
    ];
    const wrapper = mount(EcosystemAnalysisInner, {
      props: { analysis: list },
    });
    expect(wrapper.text()).toContain("First name");
    expect(wrapper.text()).toContain("Another name");
    expect(wrapper.text()).toContain("Is it even a name");
  });
});
