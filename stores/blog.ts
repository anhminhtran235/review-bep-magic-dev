export const useBlogStore = defineStore("blogStore", {
  state: () => ({
    list: [] as DBlog[],
  }),
  actions: {
    async fetchBlog(query: string) {
      const blogs: DBlog[] = await $fetch(`/api/blog?${query}`);
      this.list = blogs;
    },
  },
});
