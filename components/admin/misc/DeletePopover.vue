<template>
  <HeadlessPopover class="relative">
    <HeadlessPopoverButton
      class="rounded border-2 border-black bg-[#EF5350] p-1 text-center text-white hover:bg-[#EF5350]/75"
    >
      <Icon name="material-symbols:delete-outline-rounded" class="h-8 w-8" />
    </HeadlessPopoverButton>
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <HeadlessPopoverPanel class="absolute right-0 z-50 w-56">
        <div class="mt-2 rounded-md border-2 bg-white p-2 shadow-xl">
          <h1 class="text-lg">Are you sure?</h1>
          <div class="flex justify-end">
            <HeadlessPopoverButton
              @click="$emit('deleteItem')"
              class="rounded border-2 border-black bg-[#EF5350] px-4 py-1 text-center text-white hover:bg-[#EF5350]/75"
            >
              Delete
            </HeadlessPopoverButton>
          </div>
        </div>
      </HeadlessPopoverPanel>
    </Transition>
  </HeadlessPopover>
</template>

<script setup lang="ts">
const emit = defineEmits(["deleteItem"]);
</script>
