<script setup lang="ts">
const appConfig = useAppConfig();
const navIsActive = ref(false);

function toggleNav() {
  navIsActive.value = !navIsActive.value;
}

const toggleNavComputed = computed(() => ({
  "admin-nav-active": navIsActive.value,
  "admin-nav-inactive": !navIsActive.value,
}));
</script>

<template>
  <div
    v-if="navIsActive"
    @click="toggleNav"
    class="fixed inset-0 z-30 w-full bg-black/10 md:hidden"
  ></div>
  <button
    @click="toggleNav"
    class="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm hover:bg-black/10 md:hidden"
  >
    <Icon class="h-8 w-8" name="material-symbols:menu" />
  </button>
  <aside
    :class="toggleNavComputed"
    class="fixed left-0 top-0 z-40 h-screen w-64 transition-transform md:translate-x-0"
  >
    <div class="h-full overflow-y-auto bg-white px-3 py-4">
      <h1 class="mb-6 flex flex-col items-center justify-center space-y-2">
        <img class="h-8" src="/icons/icon-name.svg" alt="" />
        <div class="bg-teal-dark h-1 w-full rounded-full"></div>
      </h1>
      <div class="space-y-2 text-2xl font-medium">
        <AdminNavItem
          v-for="item in appConfig.navbarItems"
          :item="item"
          :key="item.name"
        />
      </div>
    </div>
  </aside>
</template>
