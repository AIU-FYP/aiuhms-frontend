import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  axios.defaults.baseURL = config.public.apiBase;

  const token = useCookie('token');

  axios.interceptors.request.use((request) => {
    if (token.value) {
      request.headers.Authorization = `Bearer ${token.value}`;
    }
    return request;
  });

  nuxtApp.provide('axios', axios);
});
