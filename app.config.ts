export default defineAppConfig({
  imageSettings: {
    product: {
      width: 640,
      height: 480,
    },
    banner: {
      width: 1280,
      height: 720,
    },
  },
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
  categoryOptions: ["Normal", "Smart Chef"],
  statusOptions: ["pending", "paid", "delivered"],
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
    "1": { status: "pending" },
    "2": { status: "paid" },
    "3": { status: "delivered" },
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
