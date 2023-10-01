import { describe, beforeEach, it, expect, vi } from "vitest";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import EcosystemsManagement from "../EcosystemsManagement/EcosystemsManagement.vue";

import { createTestingPinia } from "@pinia/testing";
import { useEcosystemsStore } from "@/stores/ecosystems";
import { createRandomEcosystem } from "./utils";
import { useEcosystemDynamicVolume } from "../../stores/ecosystems";

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

    expect(wrapper.html()).toContain("add");
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
    const expectedFirstDimensions = `${list[0].length}x${list[0].width}x${list[0].height}`;
    expect(elements[0].text()).toContain(expectedFirstDimensions);
    const { volume } = useEcosystemDynamicVolume(list[0]);
    const expectedFirstVolume = `${volume.value} L`;
    expect(elements[0].text()).toContain(expectedFirstVolume);
  });

  it("renders all items properly", () => {
    const store = useEcosystemsStore();
    const list = [
      createRandomEcosystem(store),
      createRandomEcosystem(store),
      createRandomEcosystem(store),
    ];
    const wrapper = mountComponent({
      ecosystems: { list },
    });

    useEcosystemsStore();

    const elements = wrapper.findAll('[data-testid="ecosystems-list-item"]');

    elements.forEach((element, index) => {
      const item = list[index];
      expect(element.text()).toContain(item.name);
      const expectedFirstDimensions = `${item.length}x${item.width}x${item.height}`;
      expect(element.text()).toContain(expectedFirstDimensions);
      const { volume } = useEcosystemDynamicVolume(item);
      const expectedFirstVolume = `${volume.value} L`;
      expect(element.text()).toContain(expectedFirstVolume);
    });
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
    expect(pushMock).toBeCalledWith("/ecosystem/");
  });

  it("select one works", async () => {
    const store = useEcosystemsStore();
    const list = [createRandomEcosystem(store)];
    const wrapper = mountComponent({
      ecosystems: { list },
    });

    await wrapper.get('[data-testid="ecosystems-list-item"]').trigger("click");

    expect(pushMock).toBeCalledTimes(1);
    expect(pushMock).toBeCalledWith("/ecosystem/");
  });
});
