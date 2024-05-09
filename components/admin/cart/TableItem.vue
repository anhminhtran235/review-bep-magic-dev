<template>
  <tr class="border-b bg-white last:border-none hover:bg-black/5">
    <td class="px-6 py-4">
      <ul>
        <li v-for="order in cart.orders" :key="order.food._id">
          {{ order.food.name! }}
        </li>
      </ul>
    </td>
    <td class="px-6 py-4">
      <ul>
        <li v-for="order in cart.orders" :key="order.food._id">
          {{
            order.food.price!.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })
          }}
        </li>
      </ul>
    </td>
    <td class="px-6 py-4">
      <ul>
        <li v-for="order in cart.orders" :key="order.food._id">
          {{ order.quantity }}
        </li>
      </ul>
    </td>
    <td class="px-6 py-4">
      <ul>
        <li v-for="order in cart.orders" :key="order.food._id">
          {{
            (order.food.price! * order.quantity).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })
          }}
        </li>
      </ul>
    </td>
    <td class="px-6 py-4">
      {{
        cart.grand_total.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })
      }}
    </td>
    <td class="px-6 py-4">
      {{ cart.phone_number }}
    </td>
    <td class="px-6 py-4">
      {{ cart.delivery_address }}
    </td>
    <td class="px-6 py-4">
      {{ cart.status }}
    </td>
    <td class="px-6 py-4">
      {{ cart.notes }}
    </td>
    <td class="flex space-x-2 px-6 py-4">
      <NuxtLink :to="'/admin/cart/edit/' + cart._id">
        <button
          class="rounded border-2 border-black bg-[#FFA726] p-1 text-center text-white hover:bg-[#FFA726]/75"
        >
          <Icon name="material-symbols:edit-square-outline" class="h-8 w-8" />
        </button>
      </NuxtLink>
      <AdminMiscDeletePopover @delete-item="handleDeleteItem" />
    </td>
  </tr>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const props = defineProps<{ cart: DCart }>();

async function handleDeleteItem() {
  const result = await $fetch(`/api/cart/id/${props.cart._id}`, {
    headers: useRequestHeaders(["cookie"]),
    method: "DELETE",
  });
}
</script>
