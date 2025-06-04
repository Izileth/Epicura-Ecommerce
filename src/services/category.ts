// src/api/category.service.ts
import api from './api';
import type { Category } from '@/types/category';

export const CategoryService = {
    async getAllCategories(): Promise<Category[]> {
        const response = await api.get('/categories');
        return response.data;
    },

    async getCategoryById(id: string): Promise<Category> {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    },

    async createCategory(data: Category): Promise<Category> {
        const response = await api.post('/categories', data);
        return response.data;
    },

    async updateCategory(id: string, data: Category): Promise<Category> {
        const response = await api.put(`/categories/${id}`, data);
        return response.data;
    },

    async deleteCategory(id: string): Promise<void> {
        await api.delete(`/categories/${id}`);
    },
};