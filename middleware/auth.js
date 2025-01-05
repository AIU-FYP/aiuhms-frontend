export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token');

    if (to.path === '/login' && token.value) {
        return navigateTo('/admin')
    } else if (to.path === '/admin' && !token.value) {
        return navigateTo('/login')
    }
})