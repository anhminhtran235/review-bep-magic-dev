<template>
  <div class="flex space-x-2">
    <label class="mb-1 block text-sm font-medium text-black dark:text-white">
      {{ inputLabel }}
    </label>
    <input type="checkbox" v-model="input" class="h-4 w-4 rounded-md" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ inputLabel: string }>();
const input = defineModel("input");
</script>
