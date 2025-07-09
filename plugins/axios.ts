// import axios from 'axios'
//
// export default defineNuxtPlugin(() => {
//   const config = useRuntimeConfig()
//   axios.defaults.baseURL = config.public.apiBase
// })


// plugins/axios.ts
import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  axios.defaults.baseURL = config.public.apiBase;
  axios.defaults.withCredentials = true;

  console.log('✅ Axios plugin loaded with baseURL:', axios.defaults.baseURL); // Debugging

  nuxtApp.provide('axios', axios);
});
