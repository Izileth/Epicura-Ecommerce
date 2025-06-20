import type { Product } from "./product";

export interface Category {
    id: string;
    name: string;
    imageUrl: string;
    productCount: number;
    description?: string;
    products?: Product[]; 
    createdAt: Date;   
    updatedAt: Date;     
}

export interface CreateCategory {
    name: string;
    description?: string;
    imageUrl?: string;
}

export interface UpdateCategory {
    name?: string;
    description?: string;
    imageUrl?: string;
}