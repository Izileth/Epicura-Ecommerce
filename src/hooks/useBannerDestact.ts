import type { FeaturedItem } from "@/components/common/banner";
import { useState } from "react";

export const useFeaturedBanner = (initialItems: FeaturedItem[] = []) => {
    const [items, setItems] = useState<FeaturedItem[]>(initialItems);
    const [selectedItem, setSelectedItem] = useState<FeaturedItem | null>(null);

    const addItem = (item: FeaturedItem) => {
        setItems(prev => [...prev, item]);
    };

    const removeItem = (itemId: string) => {
        setItems(prev => prev.filter(item => item.id !== itemId));
    };

    const updateItem = (itemId: string, updates: Partial<FeaturedItem>) => {
        setItems(prev => 
        prev.map(item => 
            item.id === itemId ? { ...item, ...updates } : item
        )
        );
    };

    const sortByPriority = () => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        setItems(prev => 
        [...prev].sort((a, b) => 
            (priorityOrder[b.priority || 'low'] || 1) - (priorityOrder[a.priority || 'low'] || 1)
        )
        );
    };

    return {
        items,
        selectedItem,
        setSelectedItem,
        addItem,
        removeItem,
        updateItem,
        sortByPriority,
        setItems
    };
};