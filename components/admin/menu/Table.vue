<template>
  <div class="relative mt-4 overflow-x-auto sm:rounded-lg">
    <table class="w-full text-left text-sm text-black">
      <thead class="bg-black/5 text-xs uppercase">
        <th scope="col" class="w-[180px] min-w-[180px] px-6 py-3">Image</th>
        <th scope="col" class="px-6 py-3">Name</th>
        <th scope="col" class="px-6 py-3">Price</th>
        <th scope="col" class="px-6 py-3">Category</th>
        <th scope="col" class="px-6 py-3">Description</th>
        <th scope="col" class="px-6 py-3">Is Displayed</th>
        <th scope="col" class="px-6 py-3">Nutritional Value</th>
        <th scope="col" class="px-6 py-3">Action</th>
      </thead>
      <tbody>
        <AdminMenuTableItem
          v-for="food in foods.list"
          :food="food"
          :key="food._id"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const foods = useFoodStore();
</script>
