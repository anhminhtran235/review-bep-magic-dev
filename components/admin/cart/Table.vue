<template>
  <div class="relative mt-4 overflow-x-auto sm:rounded-lg">
    <table class="w-full text-left text-sm text-black">
      <thead class="bg-black/5 text-xs uppercase">
        <th scope="col" class="px-6 py-3">Name</th>
        <th scope="col" class="px-6 py-3">Price</th>
        <th scope="col" class="px-6 py-3">Quantity</th>
        <th scope="col" class="px-6 py-3">Total</th>
        <th scope="col" class="px-6 py-3">Grand Total</th>
        <th scope="col" class="px-6 py-3">Phone Number</th>
        <th scope="col" class="px-6 py-3">Delivery Address</th>
        <th scope="col" class="px-6 py-3">Status</th>
        <th scope="col" class="px-6 py-3">Notes</th>
        <th scope="col" class="px-6 py-3">Actions</th>
      </thead>
      <tbody>
        <AdminCartTableItem
          v-for="cart in carts.list"
          :cart="cart"
          :key="cart._id"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const carts = useCartStore();
</script>
