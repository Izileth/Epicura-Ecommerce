// src/stores/category.store.ts
import { create } from 'zustand';
import { CategoryService } from '@/services/category';
import type { Category } from '@/types/category';

interface CategoryState {
    categories: Category[];
    isLoading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
    createCategory: (data: { name: string }) => Promise<Category>; 
}

export const useCategoryStore = create<CategoryState>((set) => ({
    categories: [],
    isLoading: false,
    error: null,

    fetchCategories: async () => {
        set({ isLoading: true, error: null });
        try {
        const categories = await CategoryService.getAllCategories();
        set({ categories, isLoading: false });
        } catch (error) {
        set({ error: 'Failed to fetch categories', isLoading: false });
        }
    },
    createCategory: async (data) => {
        set({ isLoading: true, error: null });
        try {
        const newCategory = await CategoryService.createCategory({
            ...data,
        } as Category);
        set((state) => ({
            categories: [...state.categories, newCategory],
            isLoading: false
        }));
        return newCategory;
        } catch (error) {
        set({ error: 'Failed to create category', isLoading: false });
        throw error;
        }
    }
}));