// src/stores/category.store.ts
import { create } from 'zustand';
import { CategoryService } from '@/services/category';
import type { Category, CreateCategory} from '@/types/category';

interface CategoryState {
    categories: Category[];
    currentCategory?: Category | null;
    isLoading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
    fetchCategoryById: (id: string) => Promise<void>;
    createCategory: (data: CreateCategory) => Promise<Category>;
    updateCategory: (id: string, data: Partial<Category>) => Promise<Category>;
    deleteCategory: (id: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
    categories: [],
    currentCategory: null,
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


    fetchCategoryById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
        const category = await CategoryService.getCategoryById(id);
        set({ 
            currentCategory: category,
            isLoading: false 
        });
        } catch (error) {
        set({ 
            error: 'Failed to fetch category',
            isLoading: false 
        });
        }
    },

    createCategory: async (data: CreateCategory) => {
        set({ isLoading: true, error: null });
        try {
            const newCategory = await CategoryService.createCategory(data);
            set((state) => ({
                categories: [...state.categories, newCategory],
                isLoading: false
            }));
            return newCategory;
        } catch (error) {
            set({ error: 'Failed to create category', isLoading: false });
            throw error;
        }
    },

    updateCategory: async (id: string, data: Partial<Category>) => {
        set({ isLoading: true, error: null });
        try {
            const updatedCategory = await CategoryService.updateCategory(id, data);
            set((state) => ({
                categories: state.categories.map(cat => 
                    cat.id === id ? updatedCategory : cat
                ),
                currentCategory: updatedCategory,
                isLoading: false
            }));
            return updatedCategory;
        } catch (error) {
            set({ error: 'Failed to update category', isLoading: false });
            throw error;
        }
    },

    deleteCategory: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            await CategoryService.deleteCategory(id);
            set((state) => ({
                categories: state.categories.filter(cat => cat.id !== id),
                isLoading: false
            }));
        } catch (error) {
            set({ error: 'Failed to delete category', isLoading: false });
            throw error;
        }
    }
}));