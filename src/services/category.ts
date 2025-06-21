
import api from './api';
import type { Category, CreateCategory } from '@/types/category';

export const CategoryService = {
    async getAllCategories(): Promise<Category[]> {
        const response = await api.get<{ data: Category[] }>('/categories');
        return response.data.data || [];
    },

    async getCategoryById(id: string): Promise<Category> {
        const response = await api.get<{ data: Category }>(`/categories/${id}`);
        console.log(response.data.data);
        return response.data.data;
    },

    async createCategory(data: CreateCategory): Promise<Category> { // Usar DTO específico
        const response = await api.post<{ data: Category }>('/categories', data);
        return response.data.data; 
    },

    async updateCategory(id: string, data: Partial<Category>): Promise<Category> {
        const response = await api.put<{ data: Category }>(`/categories/${id}`, data);
        return response.data.data; 
    },

    async deleteCategory(id: string): Promise<void> {
        await api.delete(`/categories/${id}`);
    },
};