import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import EcosystemAnalysisInner from "../EcosystemAnalysis/EcosystemAnalysisInner.vue";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";

installQuasar();

describe("EcosystemAnalysis", () => {
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

  it("renders all categories", () => {
    const wrapper = mount(EcosystemAnalysisInner, {
      props: { analysis: list },
    });
    const categories = wrapper.findAll('[data-testid="analysis-category"]');
    expect(categories).toHaveLength(list.length);
  });

  it("renders progress properly", () => {
    const wrapper = mount(EcosystemAnalysisInner, {
      props: { analysis: list },
    });
    const progress = wrapper.find('[data-testid="analysis-progress"]');
    expect(progress.attributes("aria-valuenow")).toBeCloseTo(0.333333);
  });

  it("renders ok category properly", () => {
    const wrapper = mount(EcosystemAnalysisInner, {
      props: { analysis: list },
    });
    const firstCategory = wrapper.find('[data-testid="analysis-category"]');
    expect(firstCategory.text()).toContain(list[0].name);
    expect(
      firstCategory.find('[data-testid="analysis-category-status"]').html()
    ).toContain("text-teal-7");
  });

  it("renders bad category properly", () => {
    const wrapper = mount(EcosystemAnalysisInner, {
      props: { analysis: list },
    });
    const firstCategory = wrapper.findAll(
      '[data-testid="analysis-category"]'
    )[1];
    expect(firstCategory.text()).toContain(list[1].name);
    const statusEl = firstCategory.find(
      '[data-testid="analysis-category-status"]'
    );
    expect(statusEl.text()).toContain(list[1].status);
    expect(statusEl.html()).toContain("text-amber-7");
  });

  it("renders all messages", () => {
    const wrapper = mount(EcosystemAnalysisInner, {
      props: { analysis: list },
    });
    const firstCategory = wrapper.findAll('[data-testid="analysis-category"]');

    firstCategory.forEach((category, index) => {
      const expectedLength = list[index].messages.length;
      const messages = category.findAll('[data-testid="analysis-message"]');
      expect(messages).toHaveLength(expectedLength);
    });
  });

  it("renders ok message correctly", () => {
    const wrapper = mount(EcosystemAnalysisInner, {
      props: { analysis: list },
    });
    const category = wrapper.find('[data-testid="analysis-category"]');
    const okMessage = category.find('[data-testid="analysis-message"]');

    expect(okMessage.text()).toContain(list[0].messages[0].name);
    expect(okMessage.text()).toContain(list[0].messages[0].description);

    const icon = okMessage.find('[data-testid="message-icon"]');
    expect(icon.text()).toContain("check");
    expect(icon.html()).toContain("teal-7");
  });

  it("renders bad message correctly", () => {
    const wrapper = mount(EcosystemAnalysisInner, {
      props: { analysis: list },
    });
    const category = wrapper.findAll('[data-testid="analysis-category"]')[1];
    const warningMessage = category.find('[data-testid="analysis-message"]');

    expect(warningMessage.text()).toContain(list[1].messages[0].name);
    expect(warningMessage.text()).toContain(list[1].messages[0].description);

    const icon = warningMessage.find('[data-testid="message-icon"]');
    expect(icon.text()).toContain("warning");
  });
});
