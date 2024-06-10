import Home from "./index";
import { routes } from "@/router";
import { mount, shallowMount } from "@vue/test-utils";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory("/"),
  routes,
});

describe("<Home/>", () => {
  it.skip("should render home correctly", async () => {
    router.push("/");
    await router.isReady();
    const wrapper = shallowMount(Home, {
      global: {
        plugin: [router],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
