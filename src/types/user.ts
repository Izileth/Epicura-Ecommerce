export interface User {
    id: string;
    email: string;
    firstName: string | null; // Agora permite explicitamente null
    lastName: string | null;
    role: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
    reset_code?: string; // Adicione esta linha

}
export interface UpdateUser{
    id: string;
    email: string ;
    firstName?: string | null;
    lastName?: string | null;
    role?: string;
    isActive?: boolean;
    reset_code?: string; // Adicione esta linha
}