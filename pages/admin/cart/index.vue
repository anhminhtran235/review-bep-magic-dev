<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
const route = useRoute();

const cf = ref("0");
const cs = ref("0");
const cp = ref(1);
const cl = ref(25);
const carts = useCartStore();
const appConfig = useAppConfig();

function cartsFetch() {
  carts.fetchAdmin(
    `filter=${cf.value}&sort=${cs.value}&page=${cp.value}&limit=${cl.value}`,
  );
}

onMounted(async () => {
  if (route.query.page == undefined) {
    await navigateTo({
      query: {
        page: cp.value,
      },
    });
  } else {
    cp.value = parseInt(route.query.page);
  }
  await callOnce(cartsFetch);
});

async function handlePage(sign: boolean) {
  if (cp.value > 1 && sign == false) {
    cp.value -= 1;
    await navigateTo({
      query: {
        page: cp.value,
      },
    });
  } else if (sign == true) {
    cp.value += 1;
    await navigateTo({
      query: {
        page: cp.value,
      },
    });
  }
  cartsFetch();
}
</script>

<template>
  <div
    class="relative flex items-end justify-between space-x-2 overflow-x-auto overflow-y-hidden"
  >
    <h1 class="text-4xl font-semibold">CART</h1>
    <div class="flex items-end space-x-2">
      <div>
        <h3>Filter</h3>
        <select v-model="cf" class="text-md rounded border-2 px-2 py-1">
          <option
            v-for="(item, key) in appConfig.cartFilter"
            :item="item"
            :value="key"
            :key="key"
          >
            {{ item }}
          </option>
        </select>
      </div>
      <div>
        <h3>Sort</h3>
        <select v-model="cs" class="text-md rounded border-2 px-2 py-1">
          <option
            v-for="(item, key) in appConfig.cartSort"
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
        navigate-to="/admin/cart/create"
        dynamic-class="hover:bg-[#4291f3]/75 bg-[#4291f3]"
      />
      <AdminMiscButtonIcon
        icon-name="material-symbols:restart-alt-rounded"
        @action="cartsFetch()"
        dynamic-class="hover:bg-black/10"
      />
    </div>
  </div>
  <AdminCartTable />
  <AdminMiscButtonIcon
    icon-name="material-symbols:chevron-left-rounded"
    @action="handlePage(false)"
    dynamic-class="hover:bg-black/10"
  />
  <AdminMiscButtonIcon
    icon-name="material-symbols:chevron-right-rounded"
    @action="handlePage(true)"
    dynamic-class="hover:bg-black/10"
  />
</template>
