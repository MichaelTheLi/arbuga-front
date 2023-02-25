import { describe, it, expect, vi } from "vitest";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import EcosystemsManagement from "../EcosystemsManagement/EcosystemsManagement.vue";

import { createTestingPinia } from "@pinia/testing";
import { useEcosystemsStore } from "@/stores/ecosystems";
import type { Ecosystem } from "../../stores/ecosystems";
import { faker } from "@faker-js/faker";

vi.mock("vue-router", () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    push: () => {},
  })),
}));

installQuasar();

describe("EcosystemList", () => {
  const mountComponent = (initialState = {}) => {
    const testingPinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
      initialState,
    });
    return mount(EcosystemsManagement, {
      global: {
        plugins: [testingPinia],
        stubs: ["router-link", "router-view"],
      },
    });
  };
  const createRandomEcosystem = (
    store: ReturnType<typeof useEcosystemsStore>
  ): Ecosystem => {
    const item = store.createNew();

    item.name = faker.random.words(2);
    item.width.value = faker.datatype.number({ min: 20, max: 100 });
    item.height.value = faker.datatype.number({ min: 20, max: 100 });
    item.length.value = faker.datatype.number({ min: 20, max: 100 });

    return item;
  };

  it("renders empty", () => {
    const wrapper = mountComponent();
    expect(
      wrapper.find('[data-testid="create-ecosystem-button"]')
    ).not.toBeNull();

    expect(wrapper.text()).toContain("Create new");
  });

  it("renders list", () => {
    const store = useEcosystemsStore();
    const list = [createRandomEcosystem(store), createRandomEcosystem(store)];
    const wrapper = mountComponent({
      ecosystems: { list },
    });

    expect(
      wrapper.findAll('[data-testid="ecosystems-list-item"]')
    ).toHaveLength(2);

    expect(wrapper.text()).toContain(list[0].name);
    expect(wrapper.text()).toContain(list[1].name);
  });

  it("renders item properly", () => {
    const store = useEcosystemsStore();
    const list = [createRandomEcosystem(store)];
    const wrapper = mountComponent({
      ecosystems: { list },
    });

    useEcosystemsStore();

    const elements = wrapper.findAll('[data-testid="ecosystems-list-item"]');

    expect(elements[0].text()).toContain(list[0].name);
    const expectedFirstDimensions = `${list[0].length.value}x${list[0].width.value}x${list[0].height.value}`;
    expect(elements[0].text()).toContain(expectedFirstDimensions);
    const expectedFirstVolume = `${list[0].volume.value} L`;
    expect(elements[0].text()).toContain(expectedFirstVolume);
  });

  it("create new works", async () => {
    const wrapper = mountComponent({
      ecosystems: { list: [] },
    });
    const store = useEcosystemsStore();

    expect(
      wrapper.findAll('[data-testid="ecosystems-list-item"]')
    ).toHaveLength(0);

    await wrapper
      .find('[data-testid="create-ecosystem-button"]')
      .trigger("click");

    expect(store.list).toHaveLength(1);
    expect(
      wrapper.findAll('[data-testid="ecosystems-list-item"]')
    ).toHaveLength(1);
  });
});
