// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@sidebase/nuxt-auth",
    "@nuxtjs/tailwindcss",
    "nuxt-headlessui",
    "nuxt-icon",
  ],
  build: {
    transpile: ["vue-sonner"],
  },
  routeRules: {
    "/admin/**": { ssr: false },
  },
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
    mongoUri: process.env.MONGO_URI,
    imageXApiKey: process.env.IMAGE_X_API_KEY,
    public: {
      imageDomain: process.env.IMAGE_DOMAIN,
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: "first",
    viewer: true,
  },
  auth: {
    isEnabled: true,
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: "authjs",
    },
    globalAppMiddleware: true,
  },
});
