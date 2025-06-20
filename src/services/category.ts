// src/api/category.service.ts
import api from './api';
import type { Category } from '@/types/category';

export const CategoryService = {
    async getAllCategories(): Promise<Category[]> {
        const response = await api.get('/categories');
        console.log("categoryService - Resposta do servidor:", response.data)
         return response.data.data || []; // Acesse a propriedade data
    },

    async getCategoryById(id: string): Promise<Category> {
        const response = await api.get(`/categories/${id}`);
        console.log("categoryService ID - Resposta do servidor ", response.data)
        return response.data.data;
    },

    async createCategory(data: Category): Promise<Category> {
        const response = await api.post('/categories', data);
        console.log("categoryService Create - Resposta do servidor:", response.data)
        return response.data.data; 
    },

    async updateCategory(id: string, data: Category): Promise<Category> {
        const response = await api.put(`/categories/${id}`, data);
        return response.data.data; 
    },

    async deleteCategory(id: string): Promise<void> {
        await api.delete(`/categories/${id}`);
    },
};