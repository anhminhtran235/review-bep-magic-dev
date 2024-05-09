<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
const router = useRouter();
</script>

<template>
  <div
    class="relative flex items-end justify-between space-x-2 overflow-x-auto overflow-y-hidden"
  >
    <div class="space-y-2">
      <AdminMiscButtonIcon
        @action="router.back()"
        icon-name="material-symbols:arrow-back-rounded"
        dynamic-class="hover:bg-black/10"
      />
      <h1 class="text-4xl font-semibold">CREATE CART</h1>
    </div>
  </div>
  <AdminCartAddForm />
</template>
