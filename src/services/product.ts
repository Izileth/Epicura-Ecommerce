import api from './api';
import type { Product } from '@/types/product';

export const ProductService = {
    async getAllPublicProducts(): Promise<Product[]> {
        const response = await api.get('/product/all');
        return response.data;
    },
    async getAllProducts(userId: string): Promise<Product[]> {
        const response = await api.get('/product', { params: { userId } });
        return response.data;
    },
    async getProductById(userId: string, id: string): Promise<Product> {
        const response = await api.get(`/product/${id}`, { params: { userId } });
        return response.data;
    },

    async createProduct(userId: string, data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
        const response = await api.post('/product', data, { params: { userId } });
        return response.data;
    },

    async updateProduct(userId: string, id: string, data: Partial<Product>): Promise<Product> {
        const response = await api.put(`/product/${id}`, data, { params: { userId } });
        return response.data;
    },

    async deleteProduct(userId: string, id: string): Promise<void> {
        await api.delete(`/product/${id}`, { params: { userId } });
    },
};