export default defineNuxtConfig({
  ssr: false, // SPA mode
  modules: ['@nuxt/ui'],
  app: {
    baseURL: '/',
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://fypbackend-production-ed18.up.railway.app'
    }
  }
})
