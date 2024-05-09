<template>
  <div>
    <label class="mb-1 block text-sm font-medium text-black dark:text-white">{{
      inputLabel
    }}</label>
    <input
      class="block w-full rounded-lg border border-black/30 bg-black/5 p-[0.48rem] text-black sm:text-lg"
      type="file"
      accept="image/png, image/jpeg, image/jpg"
      @change="handleFile($event)"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ inputLabel: string }>();
const input = defineModel<any>("input");

// Need to handle the file input list when resetting
async function handleFile(e: any) {
  input.value = await convertFileToBase64(e.target.files[0]);
}
</script>
