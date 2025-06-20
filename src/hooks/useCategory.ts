
import { useEffect } from 'react';
import { useCategoryStore } from '@/store/category';

export const useCategories = (id?: string) => {
    const { 
        categories, 
        currentCategory,
        isLoading, 
        error, 
        fetchCategories, 
        fetchCategoryById,
        createCategory,
        updateCategory,
        deleteCategory
    } = useCategoryStore();

    useEffect(() => {
        if (categories.length === 0) {
            fetchCategories();
        }
    }, [fetchCategories, categories.length]);

    useEffect(() => {
        if (id) {
            fetchCategoryById(id);
        }
    }, [id, fetchCategoryById]);

    return {
        categories,
        currentCategory,
        isLoading,
        error,
        refreshCategories: fetchCategories,
        fetchCategory: fetchCategoryById,
        createCategory,
        updateCategory,
        deleteCategory
    };
};