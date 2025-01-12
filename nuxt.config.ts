export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  colorMode: {
    preference: 'light'
  },
  app: {
    baseURL: '/fyp-frontend2/',
  },
  runtimeConfig: {
    public: {
      isDev: process.env.NODE_ENV === 'development',
    },
  },
})