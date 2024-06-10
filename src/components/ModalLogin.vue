<template>
  <div class="flex justify-between" id="modal-login">
    <h1 class="text-4xl font-black text-gray-800">Entre na sua conta</h1>

    <button class="text-4xl text-gray-600" @click="modal.close">&times;</button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label for="" class="block">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          id="email-field"
          type="email"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{ 'border-brand-errors': !!state.email.errorMessage }"
          placeholder="joao.silva@gmail.com"
          v-model="state.email.value"
        />
        <span
          id="email-error"
          class="block font-medium text-brand-errors"
          v-if="!!state.email.errorMessage"
        >
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label for="" class="block pt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          id="password-field"
          type="password"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{ 'border-brand-errors': !!state.password.errorMessage }"
          placeholder="*********"
          v-model="state.password.value"
        />
        <span
          class="block font-medium text-brand-errors"
          v-if="!!state.password.errorMessage"
        >
          {{ state.password.errorMessage }}
        </span>
      </label>

      <button
        id="submit-button"
        :disabled="state.isLoading"
        type="submit"
        :class="{ 'opacity-50': state.isLoading }"
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
      >
        <icon v-if="state.isLoading" name="loading" class="animate-spin" />
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>
<script setup>
import useModal from "@/hooks/useModal";
import { useField } from "vee-validate";
import { reactive } from "vue";
import {
  validateEmptyAndLength3,
  validateEmptyAndEmail,
} from "../utils/validators";
import services from "@/services";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import Icon from "./Icon.vue";

const router = useRouter();
const modal = useModal();
const toast = useToast();

const { value: emailValue, errorMessage: emailErrorMessage } = useField(
  "email",
  validateEmptyAndEmail
);

const { value: passwordValue, errorMessage: passwordErrorMessage } = useField(
  "password",
  validateEmptyAndLength3
);

const state = reactive({
  hasErrors: false,
  isLoading: false,
  email: {
    value: emailValue,
    errorMessage: emailErrorMessage,
  },
  password: {
    value: passwordValue,
    errorMessage: passwordErrorMessage,
  },
});

async function handleSubmit() {
  try {
    toast.clear();
    state.isLoading = true;
    const { data, error } = await services.auth.login({
      email: state.email.value,
      password: state.password.value,
    });

    if (!error) {
      window.localStorage.setItem("token", data.data.token);
      state.isLoading = false;
      router.push({ name: "Feedbacks" });
      toast.success("Login efetuado com sucesso!");
      modal.close();
      return;
    }

    state.isLoading = false;
  } catch (err) {
    if (err.response.status === 404) {
      toast.error("E-mail não encontrado");
    }

    if (err.response.status === 401) {
      toast.error("E-mail ou senha inválidos");
    }

    if (err.response.status === 400 || err.response.status === 500) {
      toast.error("Ocorreu um erro ao fazer um login");
    }
    state.isLoading = false;
    state.hasErrors = !!err;
  }
}
</script>
<style></style>
