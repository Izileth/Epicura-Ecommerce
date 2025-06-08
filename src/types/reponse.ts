
export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        createdAt: string;
        updatedAt: string;
        firstName: string | null;
        lastName: string | null;
        role: string;
        isActive: boolean;
    };
}