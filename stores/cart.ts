export const useCartStore = defineStore("cartStore", {
  state: () => ({
    list: [] as DCart[],
  }),
  actions: {
    async fetchAdmin(query: string) {
      const carts: DCart[] = await $fetch(`/api/cart?${query}`, {
        headers: useRequestHeaders(["cookie"]),
      });
      this.list = carts;
    },
  },
});
