import { describe, it, expect, vi } from "vitest";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import AccountMenu from "@/components/Account/AccountMenu.vue";

installQuasar();

describe("AccountMenu", () => {
  const mountComponent = (initialState = {}) => {
    const testingPinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
      initialState,
    });
    return mount(AccountMenu, {
      global: {
        plugins: [testingPinia],
        stubs: {
          LoginButton: {
            template: '<span data-testid="login-button" />',
          },
        },
      },
    });
  };

  it("renders anonymous properly", () => {
    const wrapper = mountComponent({
      user: {
        user: null,
      },
    });

    expect(wrapper.exists()).toBeTruthy();
    expect(
      wrapper.get('[data-testid="login-button"]').isVisible()
    ).toBeTruthy();
  });

  it("renders logged properly", () => {
    const wrapper = mountComponent({
      user: {
        user: {
          id: "testid1",
          name: "Test Name",
          login: "testLogin",
        },
      },
    });

    expect(wrapper.text()).toContain("Hello, Test Name");
    expect(wrapper.find('[data-testid="login-button"]').exists()).toBeFalsy();
  });
});
