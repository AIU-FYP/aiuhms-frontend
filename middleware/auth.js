export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token');

    if (!token.value && to.path !== '/login') {
        return navigateTo('/login');
    }

    if (token.value && to.path === '/login') {
        return navigateTo('/admin');
    }
});



// export default defineNuxtRouteMiddleware((to, from) => {
//     const token = useCookie('token');
//
//     if (to.path === '/login' && token.value) {
//         return navigateTo('/admin')
//     } else if (to.path === '/admin' && !token.value) {
//         return navigateTo('/login')
//     }
// })