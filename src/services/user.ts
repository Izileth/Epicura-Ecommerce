import api from './api';
import type { User, UpdateUser } from '@/types/user';
export const UserService = {
    async getMe(): Promise<User> {
        const response = await api.get('/user/me');
        console.log("userService - Resposta do servidor:", response.data)
        
        return response.data;
    },


    async updateUser( id: string, data: UpdateUser): Promise<User> {
        const response = await api.put('/user/${userId}', data);
        console.log("userService - Resposta do servidor:", response.data)
        console.log("userId - Resposta do servidor:", id)
        return response.data;
    },

    async deleteUser(userId: string): Promise<void> {
        await api.delete(`/user/${userId}`);
    },
};