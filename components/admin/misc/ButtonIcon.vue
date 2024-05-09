<template>
  <button
    type="button"
    @click="$emit('action')"
    :class="dynamicClass"
    class="rounded border-2 border-black p-1 text-center"
  >
    <Icon :name="iconName" class="h-6 w-6" />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ iconName: string; dynamicClass: string }>();
const emit = defineEmits(["action"]);
</script>
