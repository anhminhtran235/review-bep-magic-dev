<template>
  <NuxtLink
    :to="item.navigateTo"
    active-class="bg-black/5"
    class="flex items-center rounded-lg px-4 py-2 text-black hover:bg-black/5"
    >{{ item.name }}</NuxtLink
  >
</template>

<script setup lang="ts">
const props = defineProps(["item"]);
</script>
