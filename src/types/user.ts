export interface User {
    id: string;
    email: string;
    firstName: string | null; 
    lastName: string | null;
    role: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
    reset_code?: string; 

}
export interface UpdateUser{
    id: string;
    email: string ;
    firstName?: string | null;
    lastName?: string | null;
    role?: string;
    isActive?: boolean;
    reset_code?: string; 
}