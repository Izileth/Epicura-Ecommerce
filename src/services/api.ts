import axios from 'axios';
import { PasswordService } from './password';
const apiClient = axios.create({
    baseURL: 'http://localhost:4141',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

let isRefreshing = false;
let failedRequestsQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}> = [];

// Interceptor de requisição (mantido igual)
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor de resposta (sem hooks!)
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Tratamento para erro 401 (token expirado/inválido)
        if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
            failedRequestsQueue.push({ resolve, reject });
            })
            .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return apiClient(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            // Usa o PasswordService para renovar o token
            const { access_token } = await PasswordService.refreshToken();
            
            localStorage.setItem('access_token', access_token);
            apiClient.defaults.headers.Authorization = `Bearer ${access_token}`;

            // Reprocessa fila de requisições pendentes
            failedRequestsQueue.forEach(({ resolve }) => resolve(access_token));
            failedRequestsQueue = [];

            return apiClient(originalRequest);
        } catch (refreshError: any) {
            // Tratamento de erro específico
            failedRequestsQueue.forEach(({ reject }) => reject(refreshError));
            failedRequestsQueue = [];
            localStorage.removeItem('access_token');
            
            // Redireciona para login apenas se for um erro de sessão
            if (refreshError.message === 'Refresh token inválido') {
            window.location.href = '/login';
            }
            
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
        }

        return Promise.reject(error);
    }
);
export default apiClient;