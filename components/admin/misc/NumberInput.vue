<template>
  <div>
    <label class="mb-1 block text-sm font-medium text-black dark:text-white">
      {{ inputLabel }}
    </label>
    <input
      type="number"
      v-model="input"
      class="block w-full rounded-lg border border-black/30 bg-black/5 p-2.5 text-black sm:text-lg"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ inputLabel: string }>();
const input = defineModel("input");
</script>
