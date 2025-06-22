import { useEffect, useRef } from 'react';
import { usePassword } from '@/hooks/usePassword';
import { useNavigate } from '@tanstack/react-router';

    
interface TokenRefreshProviderProps {
    children: React.ReactNode;
    refreshIntervalMinutes?: number;
    autoRefresh?: boolean;
}
export function TokenRefreshProvider({ 
    children, 
    refreshIntervalMinutes = 15,
    autoRefresh = true 
    }: TokenRefreshProviderProps) {
    const navigate = useNavigate();
    const intervalRef = useRef<NodeJS.Timeout>(null);

    const { 
        refreshToken, 
    } = usePassword({
        onRefreshTokenSuccess: (data) => {
        // Atualizar tokens no localStorage
        if (data.access_token) {
            localStorage.setItem('access_token', data.access_token);
        }
        if (data.refresh_token) {
            localStorage.setItem('refresh_token', data.refresh_token);
        }
        console.log('Token renovado automaticamente');
        },
        onRefreshTokenError: (error) => {
        console.error('Erro ao renovar token:', error);
        // Limpar tokens e redirecionar para login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate({ to: '/login' });
        }
    });

    const handleRefreshToken = async () => {
        const storedRefreshToken = localStorage.getItem('refresh_token');
        const accessToken = localStorage.getItem('access_token');
        
        // Só tenta renovar se tiver refresh token e access token
        if (storedRefreshToken && accessToken) {
        await refreshToken(storedRefreshToken);
        }
    };

    useEffect(() => {
        if (!autoRefresh) return;

        // Configurar intervalo de renovação
        intervalRef.current = setInterval(() => {
        handleRefreshToken();
        }, refreshIntervalMinutes * 60 * 1000);

        // Cleanup
        return () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        };
    }, [autoRefresh, refreshIntervalMinutes]);

    // Tentar renovar token na inicialização se estiver próximo do vencimento
    useEffect(() => {
        const checkTokenExpiration = () => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            try {
            // Decodificar JWT para verificar expiração (implementação básica)
            const payload = JSON.parse(atob(accessToken.split('.')[1]));
            const currentTime = Date.now() / 1000;
            const timeUntilExpiry = payload.exp - currentTime;
            
            // Se o token expira em menos de 5 minutos, renovar
            if (timeUntilExpiry < 300) { // 5 minutos
                handleRefreshToken();
            }
            } catch (error) {
            console.error('Erro ao decodificar token:', error);
            }
        }
        };

        checkTokenExpiration();
    }, []);

    return <>{children}</>;
    }
