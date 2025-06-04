// src/api/http-client.ts
import axios from 'axios';
import { useNavigate } from '@tanstack/react-router';

const navigate = useNavigate();

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    withCredentials: true, // Permite cookies HTTP-only
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

let isRefreshing = false;
let failedRequestsQueue: any[] = [];

// Interceptor de requisição
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor de resposta
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
            failedRequestsQueue.push({ resolve, reject });
            }).then(() => apiClient(originalRequest))
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            // Tenta renovar o token usando o refresh token (enviado automaticamente via cookie HTTP-only)
            const response = await axios.post(`${originalRequest.baseURL}/auth/refresh`, {}, {
            withCredentials: true
            });

            const { token } = response.data;
 
            localStorage.setItem('access_token', token);
            apiClient.defaults.headers.Authorization = `Bearer ${token}`;
            
            // Reprocessa fila de requisições pendentes
            failedRequestsQueue.forEach(({ resolve }) => resolve());
            failedRequestsQueue = [];
            
            return apiClient(originalRequest);
        } catch (refreshError) {
            // Se o refresh falhar, desloga o usuário
            failedRequestsQueue.forEach(({ reject }) => reject(refreshError));
            failedRequestsQueue = [];
            
            localStorage.removeItem('access_token');
            navigate({ to: '/' });
            
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
        }
 
        if (error.response?.status === 401) {
        localStorage.removeItem('access_token');
        navigate({ to: '/', search: { redirect: window.location.pathname } });
        }

        return Promise.reject(error);
    }
);

export default apiClient;