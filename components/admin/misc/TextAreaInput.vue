<template>
  <div>
    <label class="mb-1 block text-sm font-medium text-black dark:text-white">
      {{ inputLabel }}
    </label>
    <textarea
      type="text"
      :rows="rows"
      v-model="input"
      class="block w-full rounded-lg border border-black/30 bg-black/5 p-2.5 text-black sm:text-lg"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ inputLabel: string; rows: string }>();
const input = defineModel<string>("input");
</script>
