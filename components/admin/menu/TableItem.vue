<template>
  <tr class="border-b bg-white last:border-none hover:bg-black/5">
    <td class="px-6 py-4">
      <img
        class="w-full"
        :src="runtimeConfig.public.imageDomain + '/' + food.image_url"
        alt=""
      />
    </td>
    <td class="px-6 py-4">{{ food.name }}</td>
    <td class="px-6 py-4">
      {{
        food.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })
      }}
    </td>
    <td class="px-6 py-4">{{ food.category }}</td>
    <td class="px-6 py-4">{{ food.description || "N/A" }}</td>
    <td class="px-6 py-4">{{ food.is_displayed }}</td>
    <td class="px-6 py-4">
      <ul>
        <li v-for="(value, key) in food.nutritional_value" :key="key">
          {{ key }}: {{ value }}
        </li>
      </ul>
    </td>
    <td class="flex space-x-2 px-6 py-4">
      <NuxtLink :to="'/admin/menu/edit/' + food._id">
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
const props = defineProps<{
  food: DFood;
}>();

async function handleDeleteItem() {
  const result = await $fetch(`/api/food/id/${props.food._id}`, {
    headers: useRequestHeaders(["cookie"]),
    method: "DELETE",
  });
}
</script>
