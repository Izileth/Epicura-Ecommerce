import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PasswordService } from '@/services/password';
import type { ForgotPassword, ResetPassword, RefreshToken } from '@/types/password';
import type { AuthResponse } from '@/types/reponse';

interface PasswordState {
    // Estados de loading
    isLoading: boolean;
    isForgotPasswordLoading: boolean;
    isResetPasswordLoading: boolean;
    isRefreshTokenLoading: boolean;
    
    // Estados de dados
    forgotPasswordData: ForgotPassword | null;
    resetPasswordData: AuthResponse | null;
    refreshTokenData: RefreshToken | null;
    
    // Estados de erro
    error: string | null;
    forgotPasswordError: string | null;
    resetPasswordError: string | null;
    refreshTokenError: string | null;
    
    // Estados de sucesso
    isForgotPasswordSuccess: boolean;
    isResetPasswordSuccess: boolean;
    isRefreshTokenSuccess: boolean;
}

interface PasswordActions {
    // Actions principais
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (payload: ResetPassword) => Promise<void>;
    refreshToken: (refreshToken?: string) => Promise<void>;
    forgotPasswordTest: (email: string) => Promise<{ token: string }>;
    
    // Actions de limpeza
    clearErrors: () => void;
    clearForgotPasswordState: () => void;
    clearResetPasswordState: () => void;
    clearRefreshTokenState: () => void;
    resetStore: () => void;
}

type PasswordStore = PasswordState & PasswordActions;

const initialState: PasswordState = {
    isLoading: false,
    isForgotPasswordLoading: false,
    isResetPasswordLoading: false,
    isRefreshTokenLoading: false,
    
    forgotPasswordData: null,
    resetPasswordData: null,
    refreshTokenData: null,
    
    error: null,
    forgotPasswordError: null,
    resetPasswordError: null,
    refreshTokenError: null,
    
    isForgotPasswordSuccess: false,
    isResetPasswordSuccess: false,
    isRefreshTokenSuccess: false,
};

export const usePasswordStore = create<PasswordStore>()(
    devtools(
        (set) => ({
        ...initialState,

        // Solicita redefinição de senha
        forgotPassword: async (email: string) => {
            set({ 
                isForgotPasswordLoading: true, 
                isLoading: true,
                forgotPasswordError: null,
                error: null,
                isForgotPasswordSuccess: false 
            });

            try {
            const data = await PasswordService.forgotPassword(email);
            set({ 
                forgotPasswordData: data, 
                isForgotPasswordSuccess: true 
            });
            } catch (error: any) {
            const errorMessage = error?.response?.data?.message || 'Erro ao solicitar redefinição de senha';
            set({ 
                forgotPasswordError: errorMessage,
                error: errorMessage 
            });
            throw error;
            } finally {
            set({ 
                isForgotPasswordLoading: false, 
                isLoading: false 
            });
            }
        },

        // Redefine senha com token/código
        resetPassword: async (payload: ResetPassword) => {
            set({ 
                    isResetPasswordLoading: true, 
                    isLoading: true,
                    resetPasswordError: null,
                    error: null,
                    isResetPasswordSuccess: false 
                });

                try {
                const data = await PasswordService.resetPassword(payload);
                set({ 
                    resetPasswordData: data, 
                    isResetPasswordSuccess: true 
                });
                } catch (error: any) {
                const errorMessage = error?.response?.data?.message || 'Erro ao redefinir senha';
                set({ 
                    resetPasswordError: errorMessage,
                    error: errorMessage 
                });
                throw error;
                } finally {
                set({ 
                    isResetPasswordLoading: false, 
                    isLoading: false 
                });
            }
        },

        // Renova access token
        refreshToken: async (refreshToken?: string) => {
            set({ 
                    isRefreshTokenLoading: true, 
                    isLoading: true,
                    refreshTokenError: null,
                    error: null,
                    isRefreshTokenSuccess: false 
                });

                try {
                const data = await PasswordService.refreshToken(refreshToken);
                set({ 
                    refreshTokenData: data, 
                    isRefreshTokenSuccess: true 
                });
                } catch (error: any) {
                const errorMessage = error?.response?.data?.message || 'Erro ao renovar token';
                set({ 
                    refreshTokenError: errorMessage,
                    error: errorMessage 
                });
                throw error;
                } finally {
                set({ 
                    isRefreshTokenLoading: false, 
                    isLoading: false 
                });
            }
        },

        // Função de teste para desenvolvimento
        forgotPasswordTest: async (email: string) => {
            set({ 
                    isForgotPasswordLoading: true, 
                    isLoading: true,
                    forgotPasswordError: null,
                    error: null 
                });

                try {
                const data = await PasswordService.forgotPasswordTest(email);
                return data;
                } catch (error: any) {
                const errorMessage = error?.response?.data?.message || 'Erro no teste de redefinição';
                set({ 
                    forgotPasswordError: errorMessage,
                    error: errorMessage 
                });
                throw error;
                } finally {
                set({ 
                    isForgotPasswordLoading: false, 
                    isLoading: false 
                });
            }
        },

        // Limpa todos os erros
        clearErrors: () => {
            set({
                error: null,
                forgotPasswordError: null,
                resetPasswordError: null,
                refreshTokenError: null,
            });
        },

        // Limpa estado do forgot password
        clearForgotPasswordState: () => {
            set({
                forgotPasswordData: null,
                forgotPasswordError: null,
                isForgotPasswordSuccess: false,
            });
        },

        // Limpa estado do reset password
        clearResetPasswordState: () => {
            set({
                resetPasswordData: null,
                resetPasswordError: null,
                isResetPasswordSuccess: false,
            });
        },

        // Limpa estado do refresh token
        clearRefreshTokenState: () => {
            set({
                refreshTokenData: null,
                refreshTokenError: null,
                isRefreshTokenSuccess: false,
            });
        },
    
        resetStore: () => {
            set(initialState);
        },
        }),
        {
        name: 'password-store',
        }
    )
);