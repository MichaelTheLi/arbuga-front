import { describe, it, expect } from "vitest";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import LoginButtonInner from "../Account/LoginButtonInner.vue";

installQuasar();

describe("LoginButtonInner", () => {
  const mountComponent = () => {
    return mount(LoginButtonInner, {
      global: {
        stubs: {
          teleport: true,
          LoginForm: {
            template:
              "<span data-testid='test-login-form' @testlogin='$emit(\"login\")' @testsignon='$emit(\"signon\")' />",
          },
        },
      },
    });
  };

  it("renders initial properly", () => {
    const wrapper = mountComponent();

    expect(
      wrapper.get('[data-testid="login-button"]').isVisible()
    ).toBeTruthy();

    expect(
      wrapper.find('[data-testid="test-login-form"]').exists()
    ).toBeFalsy();
  });

  it("renders popup properly", async () => {
    const wrapper = mountComponent();

    await wrapper.get('[data-testid="login-button"]').trigger("click");

    expect(
      wrapper.get('[data-testid="test-login-form"]').isVisible()
    ).toBeTruthy();
  });

  it("closes popup on login", async () => {
    const wrapper = mountComponent();
    await wrapper.get('[data-testid="login-button"]').trigger("click");

    expect(
      wrapper.get('[data-testid="test-login-form"]').isVisible()
    ).toBeTruthy();
    await wrapper.get('[data-testid="test-login-form"]').trigger("testlogin");

    expect(
      wrapper.find('[data-testid="test-login-form"]').exists()
    ).toBeFalsy();
  });

  it("closes popup on signon", async () => {
    const wrapper = mountComponent();
    await wrapper.get('[data-testid="login-button"]').trigger("click");

    expect(
      wrapper.get('[data-testid="test-login-form"]').isVisible()
    ).toBeTruthy();
    await wrapper.get('[data-testid="test-login-form"]').trigger("signon");

    expect(
      wrapper.find('[data-testid="test-login-form"]').exists()
    ).toBeFalsy();
  });
});
