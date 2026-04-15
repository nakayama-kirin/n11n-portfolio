export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: false,
  devtools: { enabled: true },
  srcDir: 'src/',
  components: true,
  css: [
    '~/assets/styles/reset.css',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "sass:map";
            @use "~/assets/styles/import.scss" as *;
          `
        }
      }
    },
  
  app: {
    baseURL: '/n11n-portfolio/',
    buildAssetsDir: 'assets',
  },

  dir: {
    public: 'public'
  },
})