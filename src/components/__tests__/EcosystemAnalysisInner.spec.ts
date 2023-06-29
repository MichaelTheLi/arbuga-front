import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import EcosystemAnalysisInner from "../EcosystemAnalysis/EcosystemAnalysisInner.vue";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";

installQuasar();

describe("EcosystemAnalysis", () => {
  const list = [
    {
      serviceName: "temperature",
      status: "ok",
      messages: [
        {
          serviceName: "temperature",
          parameters: [
            {
              name: "min",
              value: "11.11",
              type: "float",
            },
            {
              name: "max",
              value: "99.99",
              type: "float",
            },
            {
              name: "current_value",
              value: "55.55",
              type: "float",
            },
          ],
          status: "ok",
        },
      ],
    },
    {
      serviceName: "equipment",
      status: "moderate",
      messages: [
        {
          serviceName: "filtration_suboptimal",
          parameters: [
            {
              name: "ideal_power",
              value: "123",
              type: "int",
            },
          ],
          status: "moderate",
        },
        {
          serviceName: "heating_low",
          parameters: [
            {
              name: "ideal_power",
              value: "123",
              type: "int",
            },
          ],
          status: "bad",
        },
      ],
    },
    {
      serviceName: "fish_count",
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
    expect(firstCategory.text()).toContain("temperature");
    expect(
      firstCategory.find('[data-testid="analysis-category-status"]').html()
    ).toContain("text-teal-7");
  });

  it("renders moderate category properly", () => {
    const wrapper = mount(EcosystemAnalysisInner, {
      props: { analysis: list },
    });
    const category = wrapper.findAll('[data-testid="analysis-category"]')[1];
    expect(category.text()).toContain("Equipment");
    const statusEl = category.find('[data-testid="analysis-category-status"]');
    expect(statusEl.text()).toContain("moderate");
    expect(statusEl.html()).toContain("text-amber-7");
  });

  it("renders bad category properly", () => {
    const wrapper = mount(EcosystemAnalysisInner, {
      props: { analysis: list },
    });
    const category = wrapper.findAll('[data-testid="analysis-category"]')[2];
    expect(category.text()).toContain("Fish count");
    const statusEl = category.find('[data-testid="analysis-category-status"]');
    expect(statusEl.text()).toContain("bad");
    expect(statusEl.html()).toContain("text-red-7");
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

    expect(okMessage.text()).toContain("temperature");
    expect(okMessage.text()).toContain("55.55");
    expect(okMessage.text()).toContain("11.11");
    expect(okMessage.text()).toContain("99.99");

    const icon = okMessage.find('[data-testid="message-icon"]');
    expect(icon.text()).toContain("check");
    expect(icon.html()).toContain("teal-7");
  });

  it("renders moderate message correctly", () => {
    const wrapper = mount(EcosystemAnalysisInner, {
      props: { analysis: list },
    });
    const category = wrapper.findAll('[data-testid="analysis-category"]')[1];
    const warningMessage = category.find('[data-testid="analysis-message"]');

    expect(warningMessage.text()).toContain("Filtration");
    expect(warningMessage.text()).toContain("123");

    const icon = warningMessage.find('[data-testid="message-icon"]');
    expect(icon.text()).toContain("warning");
    expect(icon.html()).toContain("amber-7");
  });

  it("renders bad message correctly", () => {
    const wrapper = mount(EcosystemAnalysisInner, {
      props: { analysis: list },
    });
    const category = wrapper.findAll('[data-testid="analysis-category"]')[1];
    const badMessage = category.findAll('[data-testid="analysis-message"]')[1];

    expect(badMessage.text()).toContain("Heating");
    expect(badMessage.text()).toContain("123");

    const icon = badMessage.find('[data-testid="message-icon"]');
    expect(icon.text()).toContain("error");
    expect(icon.html()).toContain("red-7");
  });
});
