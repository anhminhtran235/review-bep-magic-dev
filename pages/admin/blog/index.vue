<template>
  <div
    class="relative flex items-end justify-between space-x-2 overflow-x-auto overflow-y-hidden"
  >
    <h1 class="text-4xl font-semibold">BLOG</h1>
    <div class="flex items-end space-x-2">
      <div>
        <h3>Sort</h3>
        <select v-model="bs" class="text-md rounded border-2 px-2 py-1">
          <option
            v-for="(item, key) in appConfig.blogSort"
            :item="item"
            :value="key"
            :key="key"
          >
            {{ item }}
          </option>
        </select>
      </div>
      <AdminMiscNuxtLinkButtonIcon
        icon-name="material-symbols:create-new-folder-outline"
        navigate-to="/admin/blog/create"
        dynamic-class="hover:bg-[#4291f3]/75 bg-[#4291f3]"
      />
      <AdminMiscButtonIcon
        icon-name="material-symbols:restart-alt-rounded"
        @action="blogsFetch()"
        dynamic-class="hover:bg-black/10"
      />
    </div>
  </div>
  <AdminBlogTable />
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
const route = useRoute();

const appConfig = useAppConfig();

const bs = ref("0");
const bp = ref(1);
const bl = ref(25);
const blogs = useBlogStore();

function blogsFetch() {
  blogs.fetchBlog(`sort=${bs.value}&page=${bp.value}&limit=${bl.value}`);
}

onMounted(async () => {
  if (route.query.page == undefined) {
    await navigateTo({
      query: {
        page: bp.value,
      },
    });
  } else {
    bp.value = parseInt(route.query.page);
  }
  await callOnce(blogsFetch);
});

async function handlePage(sign: boolean) {
  if (bp.value > 1 && sign == false) {
    bp.value -= 1;
    await navigateTo({
      query: {
        page: bp.value,
      },
    });
  } else if (sign == true) {
    bp.value += 1;
    await navigateTo({
      query: {
        page: bp.value,
      },
    });
  }
  blogsFetch();
}
</script>
