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
          additionalData: '@use "~/assets/styles/import.scss" as *;'
        }
      }
    },
  },
})