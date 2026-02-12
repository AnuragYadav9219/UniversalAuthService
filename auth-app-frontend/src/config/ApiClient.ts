import useAuth from '@/auth/store';
import { refreshToken } from '@/services/AuthService';
import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1",
    headers: {
        'Content-Type': "application/json",
    },
    withCredentials: true,
    timeout: 10000
});

// Every Request: Before
apiClient.interceptors.request.use((config) => {
    console.log("Request Interceptor →", config.url);
    
    const accessToken = useAuth.getState().accessToken;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    console.log("Request Interceptor Running");

    return config;
});

let isRefreshing = false;
let pending: any[] = [];

function queseRequest(cb: any) {
    pending.push(cb);
}

function resolveQueue(newToken: string) {
    pending.forEach((cb) => cb(newToken));
    pending = [];
}

// Response Interceptors
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.config.url?.includes("/auth/refresh")) {
            return Promise.reject(error);
        }

        console.log(error);
        const is401 = error.response.status === 401;
        const original = error.config;

        console.log("Original retry: ", original._retry);

        if (!is401 || original._retry) {
            return Promise.reject(error);
        }

        original._retry = true;

        // We will try to refresh token
        if (isRefreshing) {

            console.log("Added to Queue");

            return new Promise((resolve, reject) => {
                queseRequest((newToken: string) => {
                    if (!newToken) return reject();
                    original.headers.Authorization = `Bearer ${newToken}`;
                    resolve(apiClient(original));
                });
            });
        }

        // Start Refresh
        isRefreshing = true;

        try {

            console.log("Start Refreshing...");

            const loginResponse = await refreshToken();
            const newToken = loginResponse.accessToken;
            if (!newToken) throw new Error("No Access Token received");
            useAuth.getState().changeLocalLoginData(loginResponse.accessToken, loginResponse.user, true, false);

            resolveQueue(newToken);

            original.headers.Authorization = `Bearer ${newToken}`;
            return apiClient(original);

        } catch (error) {
            resolveQueue('null');
            useAuth.getState().logout();
            return Promise.reject(error);

        } finally {
            isRefreshing = false;
        }
    }
);

export default apiClient;