<template>
  <div>
    <label class="mb-1 block text-sm font-medium text-black dark:text-white">{{
      inputLabel
    }}</label>
    <select
      v-model="input"
      class="block w-full rounded-lg border border-black/30 bg-black/5 p-[0.8rem] text-black sm:text-lg"
    >
      <option
        v-for="option in options"
        :value="{
          _id: option._id,
          name: option.name,
          price: option.price,
        }"
        :key="option._id"
      >
        {{ option.name }} -
        {{
          option.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })
        }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  inputLabel: string;
  options: DFood[];
}>();
const input = defineModel("input");
</script>
