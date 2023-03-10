import { describe, beforeEach, it, expect, vi } from "vitest";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import EcosystemsManagement from "../EcosystemsManagement/EcosystemsManagement.vue";

import { createTestingPinia } from "@pinia/testing";
import { useEcosystemsStore } from "@/stores/ecosystems";
import { createRandomEcosystem } from "./utils";

const pushMock = vi.fn();
vi.mock("vue-router", () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    push: pushMock,
  })),
}));

installQuasar();

describe("EcosystemList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  it("renders empty", () => {
    const wrapper = mountComponent();
    expect(wrapper.exists()).toBeTruthy();
    expect(
      wrapper.get('[data-testid="create-ecosystem-button"]').isVisible()
    ).toBeTruthy();

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

    expect(pushMock).toBeCalledTimes(1);
    expect(pushMock).toBeCalledWith("/");
  });

  it("select one works", async () => {
    const store = useEcosystemsStore();
    const list = [createRandomEcosystem(store)];
    const wrapper = mountComponent({
      ecosystems: { list },
    });

    await wrapper.get('[data-testid="ecosystems-list-item"]').trigger("click");

    expect(pushMock).toBeCalledTimes(1);
    expect(pushMock).toBeCalledWith("/");
  });
});
