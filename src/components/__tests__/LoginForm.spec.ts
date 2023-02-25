import { describe, it, expect } from "vitest";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import LoginForm from "../Account/LoginForm.vue";
// @ts-ignore
import type { UserCredentials } from "../Account/LoginForm.vue";

installQuasar();

describe("LoginButtonInner", () => {
  const mountComponent = () => {
    return mount(LoginForm);
  };

  async function setCredentialsInputs(
    wrapper: ReturnType<typeof mountComponent>,
    testCredentials: UserCredentials
  ) {
    await wrapper
      .get('[data-testid="login-login-input"]')
      .setValue(testCredentials.login);
    await wrapper
      .get('[data-testid="login-password-input"]')
      .setValue(testCredentials.password);
  }

  it("renders initial properly", () => {
    const wrapper = mountComponent();

    expect(
      wrapper.get('[data-testid="login-login-input"]').isVisible()
    ).toBeTruthy();
    expect(
      wrapper.get('[data-testid="login-password-input"]').isVisible()
    ).toBeTruthy();

    expect(
      wrapper.get('[data-testid="login-actual-button"]').isVisible()
    ).toBeTruthy();
    expect(
      wrapper.get('[data-testid="signon-actual-button"]').isVisible()
    ).toBeTruthy();
  });

  it("emits valid credentials on login", async () => {
    const wrapper = mountComponent();

    const testCredentials = {
      login: "testLogin",
      password: "testPassword",
    } as UserCredentials;

    await setCredentialsInputs(wrapper, testCredentials);
    await wrapper.get('[data-testid="login-actual-button"]').trigger("click");

    expect(wrapper.emitted()).toHaveProperty("login");
    const loginEvent = wrapper.emitted("login");
    expect(loginEvent).toHaveLength(1);
    if (loginEvent) {
      expect(loginEvent[0]).toEqual([testCredentials]);
    }
  });

  it("emits valid credentials on signon", async () => {
    const wrapper = mountComponent();

    const testCredentials = {
      login: "testLogin",
      password: "testPassword",
    } as UserCredentials;

    await setCredentialsInputs(wrapper, testCredentials);

    await wrapper.get('[data-testid="signon-actual-button"]').trigger("click");

    expect(wrapper.emitted()).toHaveProperty("signon");
    const loginEvent = wrapper.emitted("signon");
    expect(loginEvent).toHaveLength(1);
    if (loginEvent) {
      expect(loginEvent[0]).toEqual([testCredentials]);
    }
  });

  it("does not emits incomplete credentials", async () => {
    const wrapper = mountComponent();

    await setCredentialsInputs(wrapper, { login: "TestLogin", password: "" });
    await wrapper.get('[data-testid="signon-actual-button"]').trigger("click");
    await wrapper.get('[data-testid="login-actual-button"]').trigger("click");

    await setCredentialsInputs(wrapper, { login: "", password: "TestPass" });
    await wrapper.get('[data-testid="signon-actual-button"]').trigger("click");
    await wrapper.get('[data-testid="login-actual-button"]').trigger("click");

    await setCredentialsInputs(wrapper, { login: "", password: "" });
    await wrapper.get('[data-testid="signon-actual-button"]').trigger("click");
    await wrapper.get('[data-testid="login-actual-button"]').trigger("click");

    expect(wrapper.emitted()).not.toHaveProperty("login");
    expect(wrapper.emitted()).not.toHaveProperty("signon");
  });
});
