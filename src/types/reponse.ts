
export interface AuthResponse {
    user: {
        id: string;
        email: string;
        firstName?: string;
        lastName?: string;
        role: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    token: string;         // JWT access token
    refreshToken?: string; // Opcional (se usar refresh tokens)
}