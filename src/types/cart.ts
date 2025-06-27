// src/types/cart.ts

// Interface para item do carrinho
export interface CartItem {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
    // Adicione outras propriedades que vêm do Prisma se necessário
    product?: {
        id: string;
        price: number;
        title: string;
        description?: string;        
        link: string;
        imageUrl?: string;      
        categoryId?: string;  
        tags: string[];      
        isAvailable: boolean;
        userId: string;      
        createdAt: Date;
        updatedAt: Date;
        
    };
}

// Interface para resposta do carrinho
export interface CartResponse {
    id: string;
    userId: string;
    items: CartItem[];
    isActive: boolean;
    total: number;
    expiresAt: Date | null;
    sessionId: string;
}

// Interface para adicionar item ao carrinho
export interface AddItemRequest {
  productId: string;
  quantity: number;
  notes?: string;
}

// Interface para atualizar item do carrinho
export interface UpdateItemRequest {
  quantity?: number;
  notes?: string;
}

// Interface para sessão do carrinho
export interface CartSessionRequest {
  sessionId?: string;
}

// Interface para resposta do total
export interface CartTotalResponse {
  total: number;
}