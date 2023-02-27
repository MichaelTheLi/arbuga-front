import { describe, it, expect } from "vitest";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import LoginButtonInner from "../Account/LoginButtonInner.vue";
import { QDialog } from "quasar";
import LoginButton from "../Account/LoginButton.vue";

installQuasar();

describe("LoginButton", () => {
  const mountComponent = () => {
    return mount(LoginButton, {
      stubs: {
        LoginButtonInner: {
          template:
            "<span data-testid='test-login-form' @testlogin='$emit(\"login\")' @testsignon='$emit(\"signon\")' />",
        },
      },
    });
  };

  it.todo("renders initial properly. TODO Apollo client issues", () => {
    const wrapper = mountComponent();

    expect(
      wrapper.get('[data-testid="login-button"]').isVisible()
    ).toBeTruthy();

    expect(wrapper.getComponent(QDialog).isVisible()).toBeFalsy();
  });
});
