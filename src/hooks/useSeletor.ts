import React from "react";
import type { Category } from "@/components/common/selector";

export const useCategorySelector = (initialCategories: Category[] = []) => {
    const [categories, setCategories] = React.useState<Category[]>(initialCategories);
    const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);

    const addCategory = (category: Category) => {
        setCategories(prev => [...prev, category]);
    };

    const removeCategory = (categoryId: string) => {
        setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    };

    const updateCategory = (categoryId: string, updates: Partial<Category>) => {
        setCategories(prev => 
        prev.map(cat => 
            cat.id === categoryId ? { ...cat, ...updates } : cat
        )
        );
    };

    return {
        categories,
        selectedCategory,
        setSelectedCategory,
        addCategory,
        removeCategory,
        updateCategory,
        setCategories
    };
};