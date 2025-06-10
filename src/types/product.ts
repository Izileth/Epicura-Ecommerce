import type { User } from "./user";
import type { Category } from "./category";
import { productSchema } from "@/validations/product.schema";
import {z} from 'zod'
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

export type ProductFormValues = z.infer<typeof productSchema>;

