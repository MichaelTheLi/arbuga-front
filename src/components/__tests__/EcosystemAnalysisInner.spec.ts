import { describe, expect, it } from "vitest";

import { mount } from "@vue/test-utils";
import EcosystemAnalysisInner from "../EcosystemAnalysis/EcosystemAnalysisInner.vue";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import type { EcosystemConvertedAnalysis } from "../../stores/ecosystems";

installQuasar();

describe("EcosystemAnalysis", () => {
  const okMessageObj = {
    name: "Temperature",
    serviceName: "Temperature",
    description: "12.12 - 13.13",
    status: "ok",
    statusName: "Ok",
  };
  const moderateMessageObj = {
    name: "Bad filtration",
    serviceName: "filtration_suboptimal",
    description: "12.12 - 13.13",
    status: "moderate",
    statusName: "Moderate",
  };
  const badMessageObj = {
    name: "Bad heating",
    serviceName: "heating_suboptimal",
    description: "12.12 - 13.13",
    status: "bad",
    statusName: "Bad",
  };
  const list: EcosystemConvertedAnalysis[] = [
    {
      name: "Temperature",
      serviceName: "temperature",
      description: "Test description 1",
      status: "ok",
      statusName: "Ok",
      messages: [okMessageObj],
    },
    {
      name: "Equipment",
      serviceName: "equipment",
      description: "Test description 2",
      status: "moderate",
      statusName: "Moderate",
      messages: [moderateMessageObj, badMessageObj],
    },
    {
      name: "Fish count",
      serviceName: "fish_count",
      description: "Test description 3",
      status: "bad",
      statusName: "Bad",
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
    expect(firstCategory.text()).toContain("Temperature");
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
    expect(statusEl.text()).toContain("Moderate");
    expect(statusEl.html()).toContain("text-amber-7");
  });

  it("renders bad category properly", () => {
    const wrapper = mount(EcosystemAnalysisInner, {
      props: { analysis: list },
    });
    const category = wrapper.findAll('[data-testid="analysis-category"]')[2];
    expect(category.text()).toContain("Fish count");
    const statusEl = category.find('[data-testid="analysis-category-status"]');
    expect(statusEl.text()).toContain("Bad");
    expect(statusEl.html()).toContain("text-red-7");
  });

  it("renders all messages", () => {
    const wrapper = mount(EcosystemAnalysisInner, {
      props: { analysis: list },
    });
    const firstCategory = wrapper.findAll('[data-testid="analysis-category"]');

    firstCategory.forEach((category, index) => {
      // @ts-ignore
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

    expect(okMessage.text()).toContain(okMessageObj.name);
    expect(okMessage.text()).toContain(okMessageObj.description);

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

    expect(warningMessage.text()).toContain(moderateMessageObj.name);
    expect(warningMessage.text()).toContain(moderateMessageObj.description);

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

    expect(badMessage.text()).toContain(badMessageObj.name);
    expect(badMessage.text()).toContain(badMessageObj.description);

    const icon = badMessage.find('[data-testid="message-icon"]');
    expect(icon.text()).toContain("error");
    expect(icon.html()).toContain("red-7");
  });
});
