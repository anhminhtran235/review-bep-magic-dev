<template>
  <NuxtLayout>
    <!-- <Toaster position="top-center" richColors /> -->
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "bg-white-cream font-raleway",
  },
  link: [{ rel: "icon", type: "image/svg+xml", href: "/icons/icon-logo.svg" }],
});
</script>
