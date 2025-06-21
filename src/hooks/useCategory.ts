
import { useEffect } from 'react';
import { useCategoryStore } from '@/store/category';

export const useCategories = (categoryId?: string) => {
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
        if (categoryId) {
        fetchCategoryById(categoryId);
        }
    }, [categoryId, fetchCategoryById]);

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