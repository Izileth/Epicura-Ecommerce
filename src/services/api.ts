import axios from 'axios';

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
            // Tenta renovar o token
            const response = await axios.post(
            `${originalRequest.baseURL}/auth/refresh`,
            {},
            { withCredentials: true }
            );

            const { token } = response.data;
            localStorage.setItem('access_token', token);
            apiClient.defaults.headers.Authorization = `Bearer ${token}`;

            // Reprocessa fila de requisições pendentes
            failedRequestsQueue.forEach(({ resolve }) => resolve(token));
            failedRequestsQueue = [];

            return apiClient(originalRequest);
        } catch (refreshError) {
            // Se o refresh falhar, limpa tudo e rejeita
            failedRequestsQueue.forEach(({ reject }) => reject(refreshError));
            failedRequestsQueue = [];
            localStorage.removeItem('access_token');
            
            // ⚠️ Não navega aqui! Apenas rejeita com um erro específico
            return Promise.reject(new Error('SESSION_EXPIRED'));
        } finally {
            isRefreshing = false;
        }
        }

        // Outros erros 401 (não relacionados a refresh)
        if (error.response?.status === 401) {
        localStorage.removeItem('access_token');
        return Promise.reject(new Error('UNAUTHORIZED'));
        }

        return Promise.reject(error);
    }
);

export default apiClient;