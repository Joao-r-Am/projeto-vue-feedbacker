import { shallowMount } from "@vue/test-utils";
import { routes } from "@/router";
import HeaderLogged from "./HeaderLogged.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

const mockStore = { currentUser: {} };
jest.mock("../../hooks/useStore", () => {
  return () => {
    return mockStore;
  };
});

describe("<HeaderLogged />", () => {
  it("should render header logged correctly", async () => {
    router.push("/");
    await router.isReady();
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render 3 dots when there is no user logged", async () => {
    router.push("/");
    await router.isReady();
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router],
      },
    });

    const buttonLogout = wrapper.find("#logout-button");
    expect(buttonLogout.text()).toBe("...");
  });

  it("should render user name there is a user logged", async () => {
    router.push("/");
    await router.isReady();
    mockStore.currentUser.name = "João";
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router],
      },
    });

    const buttonLogout = wrapper.find("#logout-button");
    expect(buttonLogout.text()).toBe("João (sair)");
  });
});
