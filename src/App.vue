<template>
  <RouterView />
  <modal-factory />
</template>

<script setup>
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import ModalFactory from "./components/ModalFactory.vue";
import services from "./services";
import { setCurrentUser } from "./store/user";

const router = useRouter();
const route = useRoute();

watch(
  () => route.path,
  async () => {
    if (route.meta.hasAuth) {
      const token = window.localStorage.getItem("token");
      if (!token) {
        router.push({ name: "Home" });
        return;
      }

      const { data } = await services.users.getMe();
      setCurrentUser(data);
    }
  }
);
</script>
