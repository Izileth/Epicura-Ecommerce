// src/lib/validations/product.ts
import { z } from "zod";

export const productSchema = z.object({
    title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    price: z.coerce.number()  // Usando coerce para converter string para number
    .min(0, "Preço não pode ser negativo")
    .transform(val => Number(val.toFixed(2))), // Garante 2 casas decimais
    link: z.string().url("Link inválido").optional(),
    isAvailable: z.boolean(),
    tags: z.array(z.string()).optional(),
    categoryId: z.string().optional(),
});

