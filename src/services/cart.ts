import api from './api';
import type { 
    CartResponse, 
    AddItemRequest, 
    UpdateItemRequest, 
    CartTotalResponse 
} from '@/types/cart';

export const CartService = {
    /**
     * Obtém ou cria um carrinho para o usuário
     * @param sessionId - ID da sessão (opcional)
     * @returns Promise<CartResponse>
     */
    async getOrCreateCart(sessionId?: string): Promise<CartResponse> {
        const params = sessionId ? { sessionId } : {};
        const response = await api.get('/cart', { params });
        console.log("Carrinho do Usuário - Resposta do servidor:", response.data)
        return response.data;
    },

    /**
     * Adiciona um item ao carrinho
     * @param data - Dados do item a ser adicionado
     * @returns Promise<CartResponse>
     */
    async addItem(data: AddItemRequest): Promise<CartResponse> {
        const response = await api.post('/cart/items', data);
        console.log( "Produto Adicionado:",response.data);
        return response.data;
    },

    /**
     * Atualiza um item do carrinho
     * @param itemId - ID do item a ser atualizado
     * @param data - Dados para atualização
     * @returns Promise<CartResponse>
     */
    async updateItem(itemId: string, data: UpdateItemRequest): Promise<CartResponse> {
        const response = await api.put(`/cart/items/${itemId}`, data);
        console.log( "Produto Atualizado:",response.data);
        return response.data;
    },

    /**
     * Remove um item do carrinho
     * @param itemId - ID do item a ser removido
     * @returns Promise<CartResponse>
     */
    async removeItem(itemId: string): Promise<CartResponse> {
        const response = await api.delete(`/cart/items/${itemId}`);
        console.log( "Produto Removido:",response.data);
        return response.data;
    },

    /**
     * Limpa todos os itens do carrinho
     * @returns Promise<CartResponse>
     */
    async clearCart(): Promise<CartResponse> {
        const response = await api.delete('/cart/clear');
        console.log( "Carrinho Limpo:",response.data);
        return response.data;
    },

    /**
     * Mescla carrinho da sessão com carrinho do usuário
     * @param sessionId - ID da sessão a ser mesclada
     * @returns Promise<CartResponse>
     */
    async mergeCarts(sessionId: string): Promise<CartResponse> {
        const response = await api.post('/cart/merge', {}, { 
        params: { sessionId } 
        });
        return response.data;
    },

    /**
     * Obtém o total do carrinho
     * @returns Promise<CartTotalResponse>
     */
    async getTotal(): Promise<CartTotalResponse> {
        const response = await api.get('/cart/total');
        console.log( "Total do Carrinho:",response.data);
        return response.data;
    },

    // Métodos utilitários adicionais

    /**
     * Incrementa a quantidade de um item no carrinho
     * @param itemId - ID do item
     * @param increment - Valor a ser incrementado (padrão: 1)
     * @returns Promise<CartResponse>
     */
    async incrementItem(itemId: string, increment: number = 1): Promise<CartResponse> {
        // Primeiro, precisamos obter o carrinho atual para pegar a quantidade atual
        const cart = await this.getOrCreateCart();
        const item = cart.items.find(item => item.id === itemId);
        
        if (!item) {
        throw new Error('Item não encontrado no carrinho');
        }

        const newQuantity = item.quantity + increment;
        return this.updateItem(itemId, { quantity: newQuantity });
    },

    /**
     * Decrementa a quantidade de um item no carrinho
     * @param itemId - ID do item
     * @param decrement - Valor a ser decrementado (padrão: 1)
     * @returns Promise<CartResponse>
     */
    async decrementItem(itemId: string, decrement: number = 1): Promise<CartResponse> {
        const cart = await this.getOrCreateCart();
        const item = cart.items.find(item => item.id === itemId);
        
        if (!item) {
        throw new Error('Item não encontrado no carrinho');
        }

        const newQuantity = Math.max(1, item.quantity - decrement);
        return this.updateItem(itemId, { quantity: newQuantity });
    },

    /**
     * Verifica se um produto está no carrinho
     * @param productId - ID do produto
     * @returns Promise<boolean>
     */
    async hasProduct(productId: string): Promise<boolean> {
        const cart = await this.getOrCreateCart();
        return cart.items.some(item => item.productId === productId);
    },

    /**
     * Obtém a quantidade de um produto no carrinho
     * @param productId - ID do produto
     * @returns Promise<number>
     */
    async getProductQuantity(productId: string): Promise<number> {
        const cart = await this.getOrCreateCart();
        const item = cart.items.find(item => item.productId === productId);
        return item ? item.quantity : 0;
    },

    /**
     * Obtém o número total de itens no carrinho
     * @returns Promise<number>
     */
    async getTotalItems(): Promise<number> {
        const cart = await this.getOrCreateCart();
        return cart.items.reduce((total, item) => total + item.quantity, 0);
    }
};