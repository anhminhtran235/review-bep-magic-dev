<template>
  <tr class="border-b bg-white last:border-none hover:bg-black/5">
    <td class="px-6 py-4">
      <img
        class="w-full"
        :src="runtimeConfig.public.imageDomain + '/' + blog.banner_url"
        alt=""
      />
    </td>
    <td class="px-6 py-4">
      {{ blog.title }}
    </td>
    <td class="px-6 py-4">
      <ul>
        <li v-for="(item, index) in blog.paragraphs" :key="index">
          {{ item }}
        </li>
      </ul>
    </td>
    <td class="flex space-x-2 px-6 py-4">
      <NuxtLink :to="'/admin/blog/edit/' + blog._id">
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
  blog: DBlog;
}>();
async function handleDeleteItem() {
  const result = await $fetch(`/api/blog/id/${props.blog._id}`, {
    headers: useRequestHeaders(["cookie"]),
    method: "DELETE",
  });
}
</script>
