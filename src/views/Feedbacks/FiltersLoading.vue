<template>
  <content-loader
    width="100%"
    height="260px"
    class="flex flex-col items-center rounded"
  >
    <content-loader
      class="mt-3 rounded"
      width="90%"
      height="50px"
      animation-duration="2s"
    />

    <content-loader
      class="mt-3 rounded"
      width="80%"
      height="50px"
      animation-duration="2.3s"
    />

    <content-loader
      class="mt-3 rounded"
      width="80%"
      height="50px"
      animation-duration="2.7s"
    />

    <content-loader
      class="mt-3 rounded"
      width="80%"
      height="50px"
      animation-duration="2.9s"
    />
  </content-loader>
</template>
<script setup>
import ContentLoader from "@/components/ContentLoader.vue";
</script>
<style></style>
