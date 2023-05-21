import { describe, it, expect, vi, beforeEach } from "vitest";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import LoginButton from "../Account/LoginButton.vue";

installQuasar();

const loginMock = vi.fn();
const registerMock = vi.fn();
vi.mock("@/gateway/gateway", () => {
  // noinspection JSUnusedGlobalSymbols
  return {
    useLoginUser: () => ({ execute: loginMock }),
    useRegisterUser: () => ({ execute: registerMock }),
  };
});

describe("LoginButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mountComponent = () => {
    const wrapper = mount(LoginButton, {
      global: {
        stubs: {
          LoginButtonInner: {
            template:
              '<span data-testid=\'test-login-inner\' @testlogin=\'$emit("login", {"test":2})\' @testsignon=\'$emit("signon", {"test":3})\' />',
          },
        },
      },
    });
    return { wrapper };
  };

  it("renders initial properly", () => {
    const { wrapper } = mountComponent();

    expect(
      wrapper.get('[data-testid="test-login-inner"]').isVisible()
    ).toBeTruthy();
  });

  it("login event routed", async () => {
    const { wrapper } = mountComponent();

    await wrapper.get('[data-testid="test-login-inner"]').trigger("testlogin");

    expect(loginMock).toBeCalledTimes(1);
    expect(loginMock).toBeCalledWith({ test: 2 });
  });

  it("signon event routed", async () => {
    const { wrapper } = mountComponent();

    await wrapper.get('[data-testid="test-login-inner"]').trigger("testsignon");

    expect(registerMock).toBeCalledTimes(1);
    expect(registerMock).toBeCalledWith({ name: "New user", test: 3 });
  });
});
