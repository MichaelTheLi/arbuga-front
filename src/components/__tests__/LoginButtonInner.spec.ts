import { describe, it, expect } from "vitest";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import LoginButtonInner from "../Account/LoginButtonInner.vue";
import { QDialog } from "quasar";

installQuasar();

describe("LoginButtonInner", () => {
  const mountComponent = () => {
    return mount(LoginButtonInner, {
      stubs: {
        LoginForm: {
          template:
            "<span data-testid='test-login-form' @testlogin='$emit(\"login\")' @testsignon='$emit(\"signon\")' />",
        },
      },
    });
  };

  it("renders initial properly", () => {
    const wrapper = mountComponent();

    expect(
      wrapper.get('[data-testid="login-button"]').isVisible()
    ).toBeTruthy();

    expect(wrapper.getComponent(QDialog).isVisible()).toBeFalsy();
  });

  it("renders popup properly", async () => {
    const wrapper = mountComponent();

    await wrapper.get('[data-testid="login-button"]').trigger("click");

    expect(wrapper.getComponent(QDialog).isVisible()).toBeTruthy();
  });

  it.skip("closes popup properly", async () => {
    const wrapper = mountComponent();
    await wrapper.get('[data-testid="login-button"]').trigger("click");
    expect(wrapper.getComponent(QDialog).isVisible()).toBeTruthy();

    // Do something with the teleported form
    expect(wrapper.getComponent(QDialog).isVisible()).toBeFalsy();
  });
});
