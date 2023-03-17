import { describe, it, expect, vi, beforeEach } from "vitest";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import LoginButton from "../Account/LoginButton.vue";

installQuasar();

const executeMock = vi.fn();
vi.mock("@/gateway/gateway", () => {
  // noinspection JSUnusedGlobalSymbols
  return {
    useLoginUser: () => ({ execute: executeMock }),
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

    expect(executeMock).toBeCalledTimes(1);
    expect(executeMock).toBeCalledWith({ test: 2 });
  });

  it("signon event routed", async () => {
    const { wrapper } = mountComponent();

    await wrapper.get('[data-testid="test-login-inner"]').trigger("testsignon");

    expect(executeMock).toBeCalledTimes(1);
    expect(executeMock).toBeCalledWith({ test: 3 });
  });
});
