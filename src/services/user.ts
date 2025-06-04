// src/api/user.service.ts
import api from './api';
import type { User } from '@/types/user';
export const UserService = {
    async getMe(): Promise<User> {
        const response = await api.get('/user/me');
        return response.data;
    },

    async updateUser(data: User): Promise<User> {
        const response = await api.patch('/user', data);
        return response.data;
    },

    async deleteUser(): Promise<void> {
        await api.delete('/user');
    },
};