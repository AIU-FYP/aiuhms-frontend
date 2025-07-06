export default defineNuxtConfig({
    ssr: false,
    modules: ['@nuxt/ui'],
    app: {
        baseURL: '/',
    },
    nitro: {
        preset: 'static'
    },
    routeRules: {
        '/**': {static: true}
    },
    colorMode: {
        preference: 'light',
        fallback: 'light',
        forced: 'light',
        classSuffix: ''
    },
    runtimeConfig: {
        public: {
            apiBase: 'https://fypbackend-production-ed18.up.railway.app/'
        }
    }
})
