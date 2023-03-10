import { describe, it, expect, vi } from "vitest";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import EditEcosystem from "@/components/EditEcosystem.vue";
import { type Ecosystem, useEcosystemsStore } from "../../stores/ecosystems";
import { createTestingPinia } from "@pinia/testing";
import { createRandomEcosystem, elementValue } from "./utils";

installQuasar();

describe("EditEcosystem", () => {
  const mountComponent = (ecosystem: Ecosystem) => {
    return mount(EditEcosystem, {
      props: { ecosystem },
    });
  };

  it("renders new empty ecosystem", () => {
    const store = useEcosystemsStore(
      createTestingPinia({
        createSpy: vi.fn,
        stubActions: false,
      })
    );
    const wrapper = mountComponent(createRandomEcosystem(store, true));

    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders full ecosystem properly", () => {
    const store = useEcosystemsStore(
      createTestingPinia({
        createSpy: vi.fn,
        stubActions: false,
      })
    );
    const ecosystem = createRandomEcosystem(store);
    const wrapper = mountComponent(ecosystem);

    expect(elementValue(wrapper, "name")).toEqual(ecosystem.name);
    expect(elementValue(wrapper, "width")).toEqual(
      String(ecosystem.width.value)
    );
    expect(elementValue(wrapper, "height")).toEqual(
      String(ecosystem.height.value)
    );
    expect(elementValue(wrapper, "length")).toEqual(
      String(ecosystem.length.value)
    );
    expect(elementValue(wrapper, "volume")).toEqual("");
    expect(
      wrapper
        .get('[data-testid="edit-ecosystem-volume"]')
        .attributes("placeholder")
    ).toEqual(String(ecosystem.volume.value));
  });

  it("renders manual volume", () => {
    const store = useEcosystemsStore(
      createTestingPinia({
        createSpy: vi.fn,
        stubActions: false,
      })
    );
    const ecosystem = createRandomEcosystem(store);
    ecosystem.volumeManual.value = 123.45;
    const wrapper = mountComponent(ecosystem);

    expect(elementValue(wrapper, "volume")).toEqual(
      String(ecosystem.volume.value)
    );
  });

  it("change input changes global state manual volume", () => {
    const store = useEcosystemsStore(
      createTestingPinia({
        createSpy: vi.fn,
        stubActions: false,
      })
    );
    const ecosystem = createRandomEcosystem(store);
    ecosystem.volumeManual.value = 123.45;
    const wrapper = mountComponent(ecosystem);

    wrapper
      .get('[data-testid="edit-ecosystem-name"]')
      .setValue("Test changed name");
    wrapper.get('[data-testid="edit-ecosystem-width"]').setValue(77.77);
    wrapper.get('[data-testid="edit-ecosystem-height"]').setValue(88.88);
    wrapper.get('[data-testid="edit-ecosystem-length"]').setValue(99.99);
    wrapper.get('[data-testid="edit-ecosystem-volume"]').setValue(101.23);

    expect(ecosystem.name).toEqual("Test changed name");
    expect(ecosystem.width.value).toEqual(77.77);
    expect(ecosystem.height.value).toEqual(88.88);
    expect(ecosystem.length.value).toEqual(99.99);
    expect(ecosystem.volume.value).toEqual(101.23);
  });

  it("resetting manual volume restores original volume", () => {
    const store = useEcosystemsStore(
      createTestingPinia({
        createSpy: vi.fn,
        stubActions: false,
      })
    );
    const ecosystem = createRandomEcosystem(store);
    ecosystem.volumeManual.value = 123.45;
    const wrapper = mountComponent(ecosystem);

    wrapper.get('[data-testid="edit-ecosystem-volume"]').setValue("");

    expect(ecosystem.volumeManual.value).toEqual("");
    const volumeExpected =
      (ecosystem.width?.value || 0) *
      (ecosystem.height?.value || 0) *
      (ecosystem.length?.value || 0);

    expect(ecosystem.volume.value).toBeCloseTo(
      volumeExpected / 1000 // In liters
    );
  });
});
