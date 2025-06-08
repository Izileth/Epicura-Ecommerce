export interface User {
    id: string;
    email: string;
    firstName: string | null; // Agora permite explicitamente null
    lastName: string | null;
    role: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;

}
export interface UpdateUser{
    email: string ;
    firstName?: string | null;
    lastName?: string | null;
}