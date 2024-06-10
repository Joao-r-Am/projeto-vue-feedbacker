<template>
  <div
    class="flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray"
    @click="handleToggle"
  >
    <div class="flex items-center justify-between w-full mb-8">
      <badge :type="props.feedback.type" />
      <span class="font-regular text-brand-graydark">
        {{ getDiffTimeBetweenCurrentDate(props.feedback.createdAt) }}
      </span>
    </div>
    <div class="text-lg font-medium text-gray-800">
      {{ feedback.text }}
    </div>
    <div
      :class="{ animate__fadeOutUp: state.isClosing }"
      class="flex mt-8 animate__animated animate__fadeInUp animate__faster"
      v-if="state.isOpen"
    >
      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none"
            >Página</span
          >
          <span class="font-medium text-gray-700">{{ feedback.page }}</span>
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none"
            >Dispositivo</span
          >
          <span class="font-medium text-gray-700">{{ feedback.device }}</span>
        </div>
      </div>

      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">
            Usuário
          </span>
          <span class="font-medium text-gray-700">
            {{ feedback.fingerprint }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-8" v-if="!state.isOpen">
      <icon name="chevron-down" size="24" color="#C0BCB0" />
    </div>
  </div>
</template>
<script setup>
import Badge from "./Badge.vue";
import { getDiffTimeBetweenCurrentDate } from "@/utils/date";
import { reactive } from "vue";
import Icon from "./Icon.vue";
import { wait } from "@/utils/timeout";

const props = defineProps(["feedback", "isOpened"]);

const state = reactive({
  isOpen: props.isOpened,
  isClosing: !props.isOpened,
});

async function handleToggle() {
  state.isClosing = true;
  await wait(250);
  state.isOpen = !state.isOpen;
  state.isClosing = false;
}
</script>
<style></style>
