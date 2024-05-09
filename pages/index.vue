<script setup lang="ts">
definePageMeta({
  layout: false,
  auth: false,
});

const runtimeConfig = useRuntimeConfig();

const foods = useFoodStore();

await callOnce(foods.fetchClient);
</script>

<template>
  <!-- BANNER -->
  <div class="relative border-b-4">
    <img
      class="h-[80vh] w-full object-cover sm:h-[100vh]"
      src="/img/banner.jpg"
      alt=""
    />
    <div
      class="absolute left-0 top-0 flex w-full items-center justify-between px-4 py-4"
    >
      <img class="w-56" src="/icons/icon-name.svg" alt="" />
      <button @click="toggleNav" class="sm:hidden">
        <Icon
          class="h-8 w-8 border-black text-black"
          name="material-symbols:menu-rounded"
        />
      </button>
    </div>
    <div class="absolute bottom-0 left-0 mb-12 flex w-full justify-center">
      <button class="relative">
        <h2
          class="relative z-20 rounded-xl border-2 border-black bg-teal-dark px-6 py-1.5 text-2xl font-bold text-white transition-all ease-out hover:translate-y-1"
        >
          SHOP NOW
        </h2>
        <div
          class="absolute right-0 top-0 z-10 h-full w-full translate-y-2 rounded-xl border-2 bg-teal-dark/75"
        ></div>
      </button>
    </div>
  </div>

  <!-- CHEF PICK -->
  <div class="border-b-4">
    <div class="mx-auto max-w-screen-2xl py-12">
      <div class="mt-12 flex justify-center">
        <div class="relative">
          <img
            class="absolute right-0 top-0 h-16 w-16 -translate-y-[3.15rem] translate-x-[1.45rem] rotate-[20deg]"
            src="/icons/chef.svg"
            alt=""
          />
          <h1
            class="rounded-xl border-2 bg-white px-5 py-3 text-4xl font-semibold shadow-[0_4px_0_rgba(0,0,0,75)]"
          >
            CHEF'S PICK
          </h1>
        </div>
      </div>
      <div class="mt-12 flex space-x-4">
        <!-- Chevron Left -->
        <ClientHomepageItemList />
        <!-- Chevron Right -->
      </div>
    </div>
  </div>
  <div class="grid grid-cols-1 border-b-4">
    <div class="space-y-12 border-b-4 bg-yellow px-8 py-12">
      <div class="flex justify-center">
        <h1
          class="rounded-xl border-2 bg-white px-5 py-3 text-4xl font-semibold shadow-[0_4px_0_rgba(0,0,0,75)]"
        >
          ABOUT US
        </h1>
      </div>
      <div class="space-y-4">
        <p class="text-lg font-semibold leading-tight">
          Nhà hàng thực phẩm sạch chúng tôi cam kết mang đến cho khách hàng
          những món ăn ngon, bổ dưỡng và an toàn. Chúng tôi chọn lựa cẩn thận
          nguyên liệu từ thiên nhiên để bạn có thể thưởng thức một bữa ăn lành
          mạnh và ngon miệng mỗi ngày.
        </p>
        <h2 class="text-right text-2xl font-bold">Phu Phu</h2>
      </div>
    </div>
    <!-- Marquee -->
    <ClientHomepageMarquee />
  </div>
  <!-- HOURS OPENING -->
</template>
