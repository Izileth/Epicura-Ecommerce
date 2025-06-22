import { useTokenStatus } from "@/hooks/usePasswordTokenStatus";
export function TokenStatusIndicator() {
    const { isValid, expiresAt, timeUntilExpiry, shouldRefresh } = useTokenStatus();

    if (!isValid && !expiresAt) {
        return null; // Não mostra nada se não há token
    }

    const formatTimeRemaining = (seconds: number) => {
        if (seconds <= 0) return 'Expirado';
        
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        
        if (minutes > 0) {
        return `${minutes}m ${secs}s`;
        }
        return `${secs}s`;
    };

    const getStatusColor = () => {
        if (!isValid) return 'bg-red-500';
        if (shouldRefresh) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getStatusText = () => {
        if (!isValid) return 'Token Expirado';
        if (shouldRefresh) return 'Renovação Necessária';
        return 'Token Válido';
    };

    return (
        <div className="flex items-center space-x-2 text-sm">
        <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
        <span>{getStatusText()}</span>
        {isValid && (
            <span className="text-gray-500">
            (expira em {formatTimeRemaining(timeUntilExpiry)})
            </span>
        )}
        </div>
    );
}