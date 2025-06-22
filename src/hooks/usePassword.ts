import { useCallback, useEffect } from 'react';
import { usePasswordStore } from '@/store/password';
import type { ResetPassword } from '@/types/password';

export interface UsePasswordReturn {
  // Estados de loading
    isLoading: boolean;
    isForgotPasswordLoading: boolean;
    isResetPasswordLoading: boolean;
    isRefreshTokenLoading: boolean;
    
    // Estados de dados
    forgotPasswordData: any;
    resetPasswordData: any;
    refreshTokenData: any;
    
    // Estados de erro
    error: string | null;
    forgotPasswordError: string | null;
    resetPasswordError: string | null;
    refreshTokenError: string | null;
    
    // Estados de sucesso
    isForgotPasswordSuccess: boolean;
    isResetPasswordSuccess: boolean;
    isRefreshTokenSuccess: boolean;
    
    // Funções
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (payload: ResetPassword) => Promise<void>;
    refreshToken: (refreshToken?: string) => Promise<void>;
    forgotPasswordTest: (email: string) => Promise<{ token: string }>;
    
    // Utilitários
    clearErrors: () => void;
    clearForgotPasswordState: () => void;
    clearResetPasswordState: () => void;
    clearRefreshTokenState: () => void;
    resetStore: () => void;
}

export interface UsePasswordOptions {
    // Auto-clear de erros após X segundos
    autoClearErrors?: number;
    
    // Auto-clear de estados de sucesso após X segundos
    autoClearSuccess?: number;
    
    // Callbacks
    onForgotPasswordSuccess?: (data: any) => void;
    onForgotPasswordError?: (error: string) => void;
    onResetPasswordSuccess?: (data: any) => void;
    onResetPasswordError?: (error: string) => void;
    onRefreshTokenSuccess?: (data: any) => void;
    onRefreshTokenError?: (error: string) => void;
}

export const usePassword = (options: UsePasswordOptions = {}): UsePasswordReturn => {
    const {
        autoClearErrors = 0,
        autoClearSuccess = 0,
        onForgotPasswordSuccess,
        onForgotPasswordError,
        onResetPasswordSuccess,
        onResetPasswordError,
        onRefreshTokenSuccess,
        onRefreshTokenError,
    } = options;

    const store = usePasswordStore();

    // Memoizar as funções para evitar re-renders desnecessários
    const forgotPassword = useCallback(async (email: string) => {
        try {
        await store.forgotPassword(email);
        onForgotPasswordSuccess?.(store.forgotPasswordData);
        } catch (error) {
        onForgotPasswordError?.(store.forgotPasswordError || 'Erro desconhecido');
        }
    }, [store.forgotPassword, onForgotPasswordSuccess, onForgotPasswordError]);

    const resetPassword = useCallback(async (payload: ResetPassword) => {
        try {
        await store.resetPassword(payload);
        onResetPasswordSuccess?.(store.resetPasswordData);
        } catch (error) {
        onResetPasswordError?.(store.resetPasswordError || 'Erro desconhecido');
        }
    }, [store.resetPassword, onResetPasswordSuccess, onResetPasswordError]);

    const refreshToken = useCallback(async (refreshToken?: string) => {
        try {
        await store.refreshToken(refreshToken);
        onRefreshTokenSuccess?.(store.refreshTokenData);
        } catch (error) {
        onRefreshTokenError?.(store.refreshTokenError || 'Erro desconhecido');
        }
    }, [store.refreshToken, onRefreshTokenSuccess, onRefreshTokenError]);

    const forgotPasswordTest = useCallback(async (email: string) => {
        return await store.forgotPasswordTest(email);
    }, [store.forgotPasswordTest]);

    // Auto-clear de erros
    useEffect(() => {
        if (autoClearErrors > 0 && store.error) {
        const timer = setTimeout(() => {
            store.clearErrors();
        }, autoClearErrors * 1000);

        return () => clearTimeout(timer);
        }
    }, [store.error, autoClearErrors, store.clearErrors]);

    // Auto-clear de estados de sucesso
    useEffect(() => {
        if (autoClearSuccess > 0) {
        let timer: NodeJS.Timeout;

        if (store.isForgotPasswordSuccess) {
            timer = setTimeout(() => {
            store.clearForgotPasswordState();
            }, autoClearSuccess * 1000);
        }

        return () => clearTimeout(timer);
        }
    }, [store.isForgotPasswordSuccess, autoClearSuccess, store.clearForgotPasswordState]);

    useEffect(() => {
        if (autoClearSuccess > 0) {
        let timer: NodeJS.Timeout;

        if (store.isResetPasswordSuccess) {
            timer = setTimeout(() => {
            store.clearResetPasswordState();
            }, autoClearSuccess * 1000);
        }

        return () => clearTimeout(timer);
        }
    }, [store.isResetPasswordSuccess, autoClearSuccess, store.clearResetPasswordState]);

    useEffect(() => {
        if (autoClearSuccess > 0) {
        let timer: NodeJS.Timeout;

        if (store.isRefreshTokenSuccess) {
            timer = setTimeout(() => {
            store.clearRefreshTokenState();
            }, autoClearSuccess * 1000);
        }

        return () => clearTimeout(timer);
        }
    }, [store.isRefreshTokenSuccess, autoClearSuccess, store.clearRefreshTokenState]);

    return {
        // Estados de loading
        isLoading: store.isLoading,
        isForgotPasswordLoading: store.isForgotPasswordLoading,
        isResetPasswordLoading: store.isResetPasswordLoading,
        isRefreshTokenLoading: store.isRefreshTokenLoading,
        
        // Estados de dados
        forgotPasswordData: store.forgotPasswordData,
        resetPasswordData: store.resetPasswordData,
        refreshTokenData: store.refreshTokenData,
        
        // Estados de erro
        error: store.error,
        forgotPasswordError: store.forgotPasswordError,
        resetPasswordError: store.resetPasswordError,
        refreshTokenError: store.refreshTokenError,
        
        // Estados de sucesso
        isForgotPasswordSuccess: store.isForgotPasswordSuccess,
        isResetPasswordSuccess: store.isResetPasswordSuccess,
        isRefreshTokenSuccess: store.isRefreshTokenSuccess,
        
        // Funções
        forgotPassword,
        resetPassword,
        refreshToken,
        forgotPasswordTest,
        
        // Utilitários
        clearErrors: store.clearErrors,
        clearForgotPasswordState: store.clearForgotPasswordState,
        clearResetPasswordState: store.clearResetPasswordState,
        clearRefreshTokenState: store.clearRefreshTokenState,
        resetStore: store.resetStore,
    };
};