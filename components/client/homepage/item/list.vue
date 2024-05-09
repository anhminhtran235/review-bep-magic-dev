<template>
  <div class="grid grid-cols-1 gap-4 px-4">
    <ClientHomepageItem
      v-for="food in displayedFoods"
      :food="food"
      :key="food._id"
    />
  </div>
</template>

<script setup lang="ts">
const foods = useFoodStore();
const displayedFoods = computed(() => {
  return foods.list.slice(0, 4);
});
console.log(displayedFoods.value);
</script>
