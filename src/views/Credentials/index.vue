<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>
  <div class="flex flex-col justify-center items-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800 mb-2">
      Credenciais
    </h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-brand-darkgray">
        Instalação e configuração
      </h1>

      <p class="mt-10 text-lg text-gray-800 font-regular">
        Este aqui é a sua chave de api
      </p>

      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div
        v-else
        class="flex py-3 pl-5 mt-2 rounded justify-between bg-brand-gray w-1/2"
      >
        <span v-if="state.hasErrors">Erro ai carregar a api key</span>

        <span v-else id="apikey"> {{ store.User.currentUser.apiKey }} </span>
        <div class="flex ml-20 mr-5" v-if="!state.hasErrors">
          <icon
            name="copy"
            color="#C0BCB0"
            size="24"
            class="cursor-pointer"
            @click="handleCopy"
          />
          <icon
            id="generate-apikey"
            @click="handleGenerateApiKey"
            name="loading"
            color="#C0BCB0"
            size="24"
            class="ml-3 cursor-pointer"
          />
        </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>

      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div
        v-else
        class="py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray w-1/2 overflow-x-scroll"
      >
        <span v-if="state.hasErrors">Erro ai carregar o script</span>
        <pre v-else>
&lt;script src="http://Joao-r-Am-feedbacker-widget.netlify.app?apiKey={{
            store.User.currentUser.apiKey
          }}"&gt;&lt;/script&gt;</pre
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import HeaderLogged from "../../components/HeaderLogged.vue";
import useStore from "@/hooks/useStore";
import Icon from "@/components/Icon.vue";
import ContentLoader from "@/components/ContentLoader.vue";
import { reactive, watch } from "vue";
import services from "@/services";
import { setApiKey } from "@/store/user";
import { useToast } from "vue-toastification";

const store = useStore();
const toast = useToast();
const state = reactive({ isLoading: false, hasErrors: false });

watch(
  () => store.User.currentUser,
  () => {
    if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
      handleError(true);
    }
  }
);

async function handleError(err) {
  state.isLoading = false;
  state.hasErrors = !!err;
}

async function handleGenerateApiKey() {
  try {
    state.isLoading = true;

    const { data } = await services.users.generateApiKey();
    setApiKey(data.apiKey);

    state.isLoading = false;
  } catch (err) {
    handleError(err);
  }
}

async function handleCopy() {
  toast.clear();
  try {
    await navigator.clipboard.writeText(store.User.currentUser.apiKey);
    toast.success("Copiado!");
  } catch (err) {
    handleError(err);
  }
}
</script>
<style></style>
