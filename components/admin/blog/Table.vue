<template>
  <div class="relative mt-4 overflow-x-auto sm:rounded-lg">
    <table class="w-full text-left text-sm text-black">
      <thead class="bg-black/5 text-xs uppercase">
        <th scope="col" class="w-[180px] min-w-[180px] px-6 py-3">Image</th>
        <th scope="col" class="px-6 py-3">Title</th>
        <th scope="col" class="px-6 py-3">Paragraphs</th>
        <th scope="col" class="px-6 py-3">Actions</th>
      </thead>
      <tbody>
        <AdminBlogTableItem
          v-for="blog in blogs.list"
          :blog="blog"
          :key="blog._id"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const blogs = useBlogStore();
</script>
