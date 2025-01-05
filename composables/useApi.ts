import type {AxiosInstance} from "axios";
import axios from "axios";

export function createApi() {
    const config = useRuntimeConfig();

    if (config.public.isDev) {
        return constructApi('http://localhost:8000/api/');
    }

    return constructApi('https://younesdjelloul.pythonanywhere.com');
}

function constructApi(baseUrl: string) {
    let api: AxiosInstance;

    api = axios.create({
        baseURL: baseUrl
    });

    api.interceptors.request.use((config) => {
        const accessToken = useCookie('token').value;
        if (accessToken) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    return api;
}

export function useApi() {
    return createApi()
}