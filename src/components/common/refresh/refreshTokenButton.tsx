import { useState } from 'react';
import { usePassword } from '@/hooks/usePassword';

export function RefreshTokenButton() {
    const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

    const { 
        refreshToken, 
        isRefreshTokenLoading, 
        refreshTokenError,
        isRefreshTokenSuccess 
    } = usePassword({
        onRefreshTokenSuccess: (data) => {
        setLastRefresh(new Date());
        if (data.access_token) {
            localStorage.setItem('access_token', data.access_token);
        }
        if (data.refresh_token) {
            localStorage.setItem('refresh_token', data.refresh_token);
        }
        }
    });

    const handleRefresh = async () => {
        const storedRefreshToken = localStorage.getItem('refresh_token');
        if (storedRefreshToken) {
        await refreshToken(storedRefreshToken);
        } else {
        alert('Nenhum refresh token encontrado');
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('pt-BR');
    };

    return (
        <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Gerenciar Token</h3>
        
        {refreshTokenError && (
            <div className="mb-3 p-2 bg-red-100 text-red-700 rounded text-sm">
            {refreshTokenError}
            </div>
        )}

        {isRefreshTokenSuccess && lastRefresh && (
            <div className="mb-3 p-2 bg-green-100 text-green-700 rounded text-sm">
            Token renovado às {formatTime(lastRefresh)}
            </div>
        )}

        <div className="space-y-2">
            <button
            onClick={handleRefresh}
            disabled={isRefreshTokenLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
            {isRefreshTokenLoading ? 'Renovando...' : 'Renovar Token'}
            </button>
            
            {lastRefresh && (
            <p className="text-sm text-gray-600 text-center">
                Última renovação: {formatTime(lastRefresh)}
            </p>
            )}
        </div>
        </div>
    );
}