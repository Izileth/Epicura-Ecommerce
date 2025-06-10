// src/stores/product.store.ts
import { create } from 'zustand';
import { ProductService } from '@/services/product';
import type { Product } from '@/types/product';

    interface ProductState {
    products: Product[];
    publicProducts: Product[]; // Novo estado para produtos públicos
    currentProduct: Product | null;
    isLoading: boolean;
    isPublicLoading: boolean; // Novo estado de loading para produtos públicos
    error: string | null;
    publicError: string | null; // Novo estado de erro para produtos públicos
    
    // Métodos para produtos do usuário
    fetchProducts: (userId: string) => Promise<void>;
    fetchProductById: (userId: string, id: string) => Promise<void>;
    createProduct: (userId: string, product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateProduct: (userId: string, id: string, product: Partial<Product>) => Promise<void>;
    deleteProduct: (userId: string, id: string) => Promise<void>;
    
    // Novos métodos para produtos públicos
    fetchPublicProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    publicProducts: [],
    currentProduct: null,
    isLoading: false,
    isPublicLoading: false,
    error: null,
    publicError: null,

    // Métodos para produtos do usuário (mantidos como estão)
    fetchProducts: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
        const products = await ProductService.getAllProducts(userId);
        set({ products, isLoading: false });
        } catch (error) {
        set({ error: 'Failed to fetch user products', isLoading: false });
        }
    },

    fetchProductById: async (userId: string, id: string) => {
        set({ isLoading: true, error: null });
        try {
        const product = await ProductService.getProductById(userId, id);
        set({ currentProduct: product, isLoading: false });
        } catch (error) {
        set({ error: 'Failed to fetch product', isLoading: false });
        }
    },

    createProduct: async (userId: string, product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
        set({ isLoading: true, error: null });
        try {
        const newProduct = await ProductService.createProduct(userId, product);
        set((state) => ({ products: [...state.products, newProduct], isLoading: false }));
        } catch (error) {
        set({ error: 'Failed to create product', isLoading: false });
        }
    },

    updateProduct: async (userId: string, id: string, product: Partial<Product>) => {
        set({ isLoading: true, error: null });
        try {
        const updatedProduct = await ProductService.updateProduct(userId, id, product);
        set((state) => ({
            products: state.products.map((p) => (p.id === id ? updatedProduct : p)),
            currentProduct: state.currentProduct?.id === id ? updatedProduct : state.currentProduct,
            isLoading: false,
        }));
        } catch (error) {
        set({ error: 'Failed to update product', isLoading: false });
        }
    },

    deleteProduct: async (userId: string, id: string) => {
        set({ isLoading: true, error: null });
        try {
        await ProductService.deleteProduct(userId, id);
        set((state) => ({
            products: state.products.filter((p) => p.id !== id),
            isLoading: false,
        }));
        } catch (error) {
        set({ error: 'Failed to delete product', isLoading: false });
        }
    },

    // Novo método para buscar produtos públicos
    fetchPublicProducts: async () => {
        set({ isPublicLoading: true, publicError: null });
        try {
        const publicProducts = await ProductService.getAllPublicProducts();
        set({ publicProducts, isPublicLoading: false });
        } catch (error) {
        set({ publicError: 'Failed to fetch public products', isPublicLoading: false });
        }
    },
}));