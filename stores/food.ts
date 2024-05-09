export const useFoodStore = defineStore("foodStore", {
  state: () => ({
    list: [] as DFood[],
  }),
  actions: {
    async fetchAdmin(query: string) {
      const foods: DFood[] = await $fetch(`/api/food?${query}`, {
        headers: useRequestHeaders(["cookie"]),
      });
      this.list = foods;
    },
    async fetchClient() {
      const foods: DFood[] = await $fetch("/api/food");
      this.list = foods;
    },
  },
});
