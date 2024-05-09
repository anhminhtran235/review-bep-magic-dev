<template>
  <div class="grid grid-cols-2">
    <img
      class="rounded-l-lg border-y border-l"
      :src="runtimeConfig.public.imageDomain + '/' + food.image_url"
      alt=""
    />
    <div class="flex flex-col rounded-r-lg border p-2">
      <h1
        class="border-b border-black pb-1 text-sm font-bold leading-none text-teal-dark"
      >
        {{ food.name }}
      </h1>
      <div class="my-0.5 flex h-full flex-col justify-between">
        <h2 class="text-sm">
          Giá:
          {{
            food.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })
          }}
        </h2>
        <div class="flex justify-center">
          <button class="relative">
            <h2
              class="relative z-20 rounded-lg border border-black bg-orange px-2 py-1 text-xs font-bold text-black transition-all ease-out hover:translate-y-0.5"
            >
              SHOP NOW
            </h2>
            <div
              class="absolute right-0 top-0 z-10 h-full w-full translate-y-1 rounded-lg border bg-orange/75"
            ></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ food: DFood }>();

const runtimeConfig = useRuntimeConfig();
</script>
