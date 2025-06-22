import api from './api';
import type { ForgotPassword, ResetPassword, RefreshToken } from '@/types/password';
import type { AuthResponse } from '@/types/reponse';

export const PasswordService = {
    /**
     * Solicita redefinição de senha (envia email)
     */
    async forgotPassword(email: string): Promise<ForgotPassword> {
        const response = await api.post('/auth/forgot-password', { email });
        return response.data;
    },

    /**
     * Redefine a senha com token/código
     */
    async resetPassword(payload: ResetPassword): Promise<AuthResponse> {
        const response = await api.post('/auth/reset-password', payload);
        return {
        token: response.data.access_token,
        user: response.data.user
        };
    },

    /**
     * Rota de teste (apenas desenvolvimento)
     */
    async forgotPasswordTest(email: string): Promise<{ token: string }> {
        const response = await api.post('/auth/forgot-password-test', { email });
        return response.data;
    },

    /**
     * Renova access token usando refresh token
     */
    async refreshToken(refreshToken?: string): Promise<RefreshToken> {
        const response = await api.post('/auth/refresh', { refreshToken });
        return {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token // Opcional se houver rotação
        };
    }
};