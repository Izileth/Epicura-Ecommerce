import { useState, useEffect } from 'react';

interface TokenStatus {
    isValid: boolean;
    expiresAt: Date | null;
    timeUntilExpiry: number; // em segundos
    shouldRefresh: boolean; // true se expira em menos de 5 minutos
}

export function useTokenStatus(): TokenStatus {
    const [tokenStatus, setTokenStatus] = useState<TokenStatus>({
        isValid: false,
        expiresAt: null,
        timeUntilExpiry: 0,
        shouldRefresh: false
    });

    useEffect(() => {
        const checkToken = () => {
        const accessToken = localStorage.getItem('access_token');
        
        if (!accessToken) {
            setTokenStatus({
            isValid: false,
            expiresAt: null,
            timeUntilExpiry: 0,
            shouldRefresh: false
            });
            return;
        }

        try {
            // Decodificar JWT
            const payload = JSON.parse(atob(accessToken.split('.')[1]));
            const currentTime = Date.now() / 1000;
            const expiresAt = new Date(payload.exp * 1000);
            const timeUntilExpiry = payload.exp - currentTime;
            
            setTokenStatus({
            isValid: timeUntilExpiry > 0,
            expiresAt,
            timeUntilExpiry,
            shouldRefresh: timeUntilExpiry < 300 && timeUntilExpiry > 0 // 5 minutos
            });
        } catch (error) {
            console.error('Erro ao decodificar token:', error);
            setTokenStatus({
            isValid: false,
            expiresAt: null,
            timeUntilExpiry: 0,
            shouldRefresh: false
            });
        }
        };

        checkToken();
        
        // Verificar a cada minuto
        const interval = setInterval(checkToken, 60000);
        
        return () => clearInterval(interval);
    }, []);

    return tokenStatus;
}
