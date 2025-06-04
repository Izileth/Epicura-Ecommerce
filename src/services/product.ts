// src/api/product.service.ts
import api from './api';
import type { Product } from '@/types/product';

export const ProductService = {
    async getAllProducts(): Promise<Product[]> {
        const response = await api.get('/product');
        return response.data;
    },

    async getProductById(id: string): Promise<Product> {
        const response = await api.get(`/product/${id}`);
        return response.data;
    },

    async createProduct(data: Product): Promise<Product> {
        const response = await api.post('/product', data);
        return response.data;
    },

    async updateProduct(id: string, data: Product): Promise<Product> {
        const response = await api.put(`/product/${id}`, data);
        return response.data;
    },

    async deleteProduct(id: string): Promise<void> {
        await api.delete(`/product/${id}`);
    },
};