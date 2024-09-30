import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {AuthUtil} from "./AuthUtil";
import {LocalStorageUtil} from "./LocalStorageUtil";

// import {Cookie} from '@/utils/Cookie';

interface ApiInstance extends AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
}

const backend_url: string = 'https://aaplify.logicmatrixllc.com';

const api: ApiInstance = axios.create({
    baseURL: `${backend_url}/`,
});

api.interceptors.request.use(
    (config) => {
        const token = AuthUtil.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const refreshToken = async () => {
    try {
        const response = await axios.post(`${backend_url}/api/auth/refresh-token`, {
            'refreshToken': AuthUtil.getRefreshToken(),
        });
        AuthUtil.setToken(response.data.accessToken);
        AuthUtil.setRefreshToken(response.data.refreshToken);
        return response.data.accessToken;
    } catch (error) {
        console.error('Failed to refresh token', error);
        LocalStorageUtil.clear();
        window.location.href = '/';
        return null;
    }
};

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newToken = await refreshToken();
            if (newToken) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export default api;