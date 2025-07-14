export default defineNuxtConfig({
    ssr: false,

    runtimeConfig: {
        public: {
            apiBase:
                process.env.NUXT_PUBLIC_API_BASE ||
                (process.env.NODE_ENV === 'production'
                    ? 'https://fypbackend-production-ed18.up.railway.app/api'
                    : 'http://127.0.0.1:8000/api'),
        },
    },

    modules: ['@nuxt/ui',],

    nitro: {
        preset: 'static',
    },

    routeRules: {
        '/**': {static: true},
    },

    colorMode: {
        preference: 'light',
        fallback: 'light',
        classSuffix: '',
    },

    compatibilityDate: '2025-07-06',
});
