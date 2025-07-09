export default defineNuxtConfig({
    ssr: false,

    runtimeConfig: {
        public: {
            apiBase:
                process.env.NODE_ENV === 'production'
                    ? 'https://fypbackend-production-ed18.up.railway.app'
                    : 'http://127.0.0.1:8001/api',
        },
    },

    modules: ['@nuxt/ui'],

    app: {
        baseURL: '/',
    },

    nitro: {
        preset: 'static',
    },

    routeRules: {
        '/**': { static: true },
    },

    colorMode: {
        preference: 'light',
        fallback: 'light',
        classSuffix: '',
    },

    compatibilityDate: '2025-07-06',
});
