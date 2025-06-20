// src/hooks/useCategories.ts
import { useEffect } from 'react';
import { useCategoryStore } from '@/store/category';

export const useCategories = () => {
    const { categories, isLoading, error, fetchCategories, createCategory } = useCategoryStore();


    
    useEffect(() => {
        if (categories.length === 0) {
        fetchCategories();
        }
    }, [fetchCategories, categories.length]);

    return {
        categories,
        isLoading,
        error,
        refreshCategories: fetchCategories,
        createCategory
    };
};