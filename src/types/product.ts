import type { User } from "./user";
import type { Category } from "./category";
export interface Product {
    id: string;
    title: string;
    description?: string;  
    price: number;       
    link: string;
    imageUrl?: string;    
    category?: Category;  
    categoryId?: string;  
    tags: string[];      
    isAvailable: boolean;
    userId: string;
    user?: User;        
    createdAt: Date;
    updatedAt: Date;
}    