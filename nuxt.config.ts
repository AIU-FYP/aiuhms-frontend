export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  colorMode: {
    preference: 'light'
  },
  app: {
    baseURL: '/',
  },
  runtimeConfig: {
    public: {
      isDev: process.env.NODE_ENV === 'development',
      apiBase: 'https://fypbackend-production-ed18.up.railway.app' // or use env var
    }
  }
})
