// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    rootAttrs: {
      id: "app",
    },
  },
  compatibilityDate: "2024-04-03",
  devServer: {
    port: 4444,
  },
  devtools: { enabled: true },
  dir: {
    public: "../public",
  },
  fonts: {
    families: [
      {
        name: "Noto Sans",
        provider: "google",
        weights: [400, 500, 600, 700, 800],
        styles: ["normal"],
        fallbacks: ["sans-serif"],
      },
      {
        name: "Noto Serif",
        provider: "google",
        weights: [400, 500, 600, 700, 800],
        styles: ["normal"],
        fallbacks: ["serif"],
      },
      {
        name: "Noto Serif Tibetan",
        provider: "google",
        weights: [400, 500],
        styles: ["normal"],
      },
    ],
  },
  modules: ["@nuxt/fonts", "@nuxtjs/tailwindcss", "@pinia/nuxt", "@vueuse/nuxt"],
  serverDir: "server/",
  srcDir: "app/",
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },
});
