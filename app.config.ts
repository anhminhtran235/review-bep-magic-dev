export default defineAppConfig({
  navbarItems: [
    {
      name: "Menu",
      navigateTo: "/admin/menu",
    },
    {
      name: "Blog",
      navigateTo: "/admin/blog",
    },
    {
      name: "Cart",
      navigateTo: "/admin/cart",
    },
  ],
  categoryFoodOptions: ["Normal", "Smart Chef"],
  foodFilter: {
    "0": {},
    "1": { is_displayed: false },
    "2": { is_displayed: true },
  },
  cartSort: {
    "0": { updated_at: -1 },
    "1": { updated_at: 1 },
  },
  cartFilter: {
    "0": {},
    "1": { is_resolved: false },
    "2": { is_resolved: true },
  },
  blogSort: {
    "0": { updated_at: -1 },
    "1": { updated_at: 1 },
  },
  success: {
    statusMessage: "Success",
  },
  error: {
    badrequest: {
      statusCode: 400,
      statusMessage: "Bad Request",
    },
    unauthorized: {
      statusCode: 401,
      statusMessage: "Unauthorized",
    },
    notfound: {
      statusCode: 404,
      statusMessage: "Not Found",
    },
    toomanyrequests: {
      statusCode: 429,
      statusMessage: "Too Many Requests",
    },
    internalservererror: {
      statusCode: 500,
      statusMessage: "Internal Server Error",
    },
  },
});
