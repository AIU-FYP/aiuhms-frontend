export default defineNuxtConfig({
    ssr: false,
    modules: ['@nuxt/ui'],
    app: {
        baseURL: '/',
    },
    nitro: {
        preset: 'static'  // <-- this is key for `.output/public` to have index.html
    },
    routeRules: {
        '/**': {static: true}
    },
    colorMode: {
        preference: 'light',
    },
    runtimeConfig: {
        public: {
            apiBase: 'https://fypbackend-production-ed18.up.railway.app/'
        }
    }
})
