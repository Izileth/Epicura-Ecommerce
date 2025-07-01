import { z } from "zod";

export const productSchema = z.object({
    title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    price: z.coerce.number()  
    .min(0, "Preço não pode ser negativo")
    .transform(val => Number(val.toFixed(2))), 
    link: z.string().url("Link inválido").optional(),
    isAvailable: z.boolean(),
    tags: z.array(z.string()).optional(),
    categoryId: z.string().optional(),
});

