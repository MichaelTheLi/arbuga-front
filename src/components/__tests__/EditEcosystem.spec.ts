import { describe, it, expect, vi } from "vitest";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import EditEcosystem from "@/components/EditEcosystem.vue";
import {
  type Ecosystem,
  useEcosystemDynamicVolume,
  useEcosystemsStore,
} from "../../stores/ecosystems";
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
    expect(elementValue(wrapper, "width")).toEqual(String(ecosystem.width));
    expect(elementValue(wrapper, "height")).toEqual(String(ecosystem.height));
    expect(elementValue(wrapper, "length")).toEqual(String(ecosystem.length));
    expect(elementValue(wrapper, "volume")).toEqual("");

    expect(elementValue(wrapper, "ph")).toEqual(
      String(ecosystem.waterReplacement.waterParameters.ph)
    );
    expect(elementValue(wrapper, "gh")).toEqual(
      String(ecosystem.waterReplacement.waterParameters.gh)
    );
    expect(elementValue(wrapper, "kh")).toEqual(
      String(ecosystem.waterReplacement.waterParameters.kh)
    );
    expect(elementValue(wrapper, "temperature")).toEqual(
      String(ecosystem.waterReplacement.waterParameters.temperature)
    );

    expect(elementValue(wrapper, "filters-flow")).toEqual(
      String(ecosystem.equipment.filtersFlow)
    );
    expect(elementValue(wrapper, "heaters-power")).toEqual(
      String(ecosystem.equipment.heatersPower)
    );
    expect(elementValue(wrapper, "lighting-lux")).toEqual(
      String(ecosystem.equipment.lightingLux)
    );

    const { volume } = useEcosystemDynamicVolume(ecosystem);
    expect(
      wrapper
        .get('[data-testid="edit-ecosystem-volume"]')
        .attributes("placeholder")
    ).toEqual(String(volume.value));
  });

  it("change input changes global state manual volume", () => {
    const store = useEcosystemsStore(
      createTestingPinia({
        createSpy: vi.fn,
        stubActions: false,
      })
    );
    const ecosystem = createRandomEcosystem(store);
    ecosystem.volumeManual = 123.45;
    const wrapper = mountComponent(ecosystem);

    wrapper
      .get('[data-testid="edit-ecosystem-name"]')
      .setValue("Test changed name");
    wrapper.get('[data-testid="edit-ecosystem-width"]').setValue(77.77);
    wrapper.get('[data-testid="edit-ecosystem-height"]').setValue(88.88);
    wrapper.get('[data-testid="edit-ecosystem-length"]').setValue(99.99);
    wrapper.get('[data-testid="edit-ecosystem-volume"]').setValue(101.23);

    wrapper.get('[data-testid="edit-ecosystem-ph"]').setValue(11.23);
    wrapper.get('[data-testid="edit-ecosystem-gh"]').setValue(11.24);
    wrapper.get('[data-testid="edit-ecosystem-kh"]').setValue(11.25);
    wrapper.get('[data-testid="edit-ecosystem-temperature"]').setValue(26.78);

    wrapper.get('[data-testid="edit-ecosystem-filters-flow"]').setValue(1.23);
    wrapper.get('[data-testid="edit-ecosystem-heaters-power"]').setValue(1.24);
    wrapper.get('[data-testid="edit-ecosystem-lighting-lux"]').setValue(1.25);

    expect(ecosystem.name).toEqual("Test changed name");
    expect(ecosystem.width).toEqual(77.77);
    expect(ecosystem.height).toEqual(88.88);
    expect(ecosystem.length).toEqual(99.99);

    expect(ecosystem.waterReplacement.waterParameters.ph).toEqual(11.23);
    expect(ecosystem.waterReplacement.waterParameters.gh).toEqual(11.24);
    expect(ecosystem.waterReplacement.waterParameters.kh).toEqual(11.25);
    expect(ecosystem.waterReplacement.waterParameters.temperature).toEqual(
      26.78
    );

    expect(ecosystem.equipment.filtersFlow).toEqual(1.23);
    expect(ecosystem.equipment.heatersPower).toEqual(1.24);
    expect(ecosystem.equipment.lightingLux).toEqual(1.25);

    const { volume } = useEcosystemDynamicVolume(ecosystem);
    expect(volume.value).toEqual(101.23);
  });

  it("renders manual volume", () => {
    const store = useEcosystemsStore(
      createTestingPinia({
        createSpy: vi.fn,
        stubActions: false,
      })
    );
    const ecosystem = createRandomEcosystem(store);
    ecosystem.volumeManual = 123.45;
    const wrapper = mountComponent(ecosystem);

    const { volume } = useEcosystemDynamicVolume(ecosystem);
    expect(elementValue(wrapper, "volume")).toEqual(String(volume.value));
  });

  it("resetting manual volume restores original volume", () => {
    const store = useEcosystemsStore(
      createTestingPinia({
        createSpy: vi.fn,
        stubActions: false,
      })
    );
    const ecosystem = createRandomEcosystem(store);
    ecosystem.volumeManual = 123.45;
    const wrapper = mountComponent(ecosystem);

    wrapper.get('[data-testid="edit-ecosystem-volume"]').setValue("");

    expect(ecosystem.volumeManual).toEqual("");
    const volumeExpected =
      (ecosystem.width || 0) *
      (ecosystem.height || 0) *
      (ecosystem.length || 0);

    const { volume } = useEcosystemDynamicVolume(ecosystem);
    expect(volume.value).toBeCloseTo(
      volumeExpected / 1000 // In liters
    );
  });
});
