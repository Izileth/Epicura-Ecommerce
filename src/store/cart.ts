import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { CartService } from '@/services/cart';
import type { 
    CartResponse, 
    CartItem, 
    AddItemRequest, 
    UpdateItemRequest 
} from '@/types/cart';

// Interface para o estado do store
interface CartState {
    // Estado do carrinho
    cart: CartResponse | null;
    sessionId: string | null;
    
    // Estados de loading
    isLoading: boolean;
    isAdding: boolean;
    isUpdating: boolean;
    isRemoving: boolean;
    isClearing: boolean;
    isMerging: boolean;
    
    // Estado de erro
    error: string | null;
    
    // Computed values
    totalItems: number;
    isEmpty: boolean;
    
    // Actions
    initializeCart: (sessionId?: string) => Promise<void>;
    addItem: (item: AddItemRequest) => Promise<void>;
    updateItem: (itemId: string, data: UpdateItemRequest) => Promise<void>;
    removeItem: (itemId: string) => Promise<void>;
    clearCart: () => Promise<void>;
    mergeCarts: (sessionId: string) => Promise<void>;
    
    // Utility actions
    incrementItem: (itemId: string, increment?: number) => Promise<void>;
    decrementItem: (itemId: string, decrement?: number) => Promise<void>;
    getItemById: (itemId: string) => CartItem | undefined;
    getItemByProductId: (productId: string) => CartItem | undefined;
    hasProduct: (productId: string) => boolean;
    getProductQuantity: (productId: string) => number;
    
    // Session management
    setSessionId: (sessionId: string) => void;
    generateSessionId: () => string;
    
    // Error handling
    setError: (error: string | null) => void;
    clearError: () => void;
    
    // Reset state
    reset: () => void;
}

// Função para calcular total de itens
const calculateTotalItems = (cart: CartResponse | null): number => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
};

// Função para gerar session ID
const generateSessionId = (): string => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const useCartStore = create<CartState>()(
    devtools(
        persist(
            (set, get) => ({
                // Estado inicial
                cart: null,
                sessionId: null,
                isLoading: false,
                isAdding: false,
                isUpdating: false,
                isRemoving: false,
                isClearing: false,
                isMerging: false,
                error: null,
                totalItems: 0,
                isEmpty: true,

                // Inicializar carrinho
                initializeCart: async (sessionId?: string) => {
                    set({ isLoading: true, error: null });
                    
                    try {
                        const currentSessionId = sessionId || get().sessionId || generateSessionId();
                        
                        // Verificar se já tem carrinho persistido
                        const existingCart = get().cart;
                        if (existingCart && existingCart.sessionId === currentSessionId) {
                            set({ 
                                isLoading: false,
                                sessionId: currentSessionId
                            });
                            return;
                        }
                        
                        const cart = await CartService.getOrCreateCart(currentSessionId);
                        
                        set({
                            cart,
                            sessionId: currentSessionId,
                            totalItems: calculateTotalItems(cart),
                            isEmpty: !cart.items || cart.items.length === 0,
                            isLoading: false
                        });
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar carrinho';
                        set({ error: errorMessage, isLoading: false });
                    }
                },

                // Adicionar item
                addItem: async (item: AddItemRequest) => {
                    set({ isAdding: true, error: null });
                    
                    try {
                        const cart = await CartService.addItem(item);
                        
                        set({
                            cart,
                            totalItems: calculateTotalItems(cart),
                            isEmpty: !cart.items || cart.items.length === 0,
                            isAdding: false
                        });
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : 'Erro ao adicionar item';
                        set({ error: errorMessage, isAdding: false });
                        throw error;
                    }
                },

                // Atualizar item
                updateItem: async (itemId: string, data: UpdateItemRequest) => {
                    set({ isUpdating: true, error: null });
                    
                    try {
                        const cart = await CartService.updateItem(itemId, data);
                        
                        set({
                            cart,
                            totalItems: calculateTotalItems(cart),
                            isEmpty: !cart.items || cart.items.length === 0,
                            isUpdating: false
                        });
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar item';
                        set({ error: errorMessage, isUpdating: false });
                        throw error;
                    }
                },

                // Remover item
                removeItem: async (itemId: string) => {
                    set({ isRemoving: true, error: null });
                    
                    try {
                        const cart = await CartService.removeItem(itemId);
                        
                        set({
                            cart,
                            totalItems: calculateTotalItems(cart),
                            isEmpty: !cart.items || cart.items.length === 0,
                            isRemoving: false
                        });
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : 'Erro ao remover item';
                        set({ error: errorMessage, isRemoving: false });
                        throw error;
                    }
                },

                // Limpar carrinho
                clearCart: async () => {
                    set({ isClearing: true, error: null });
                    
                    try {
                        const cart = await CartService.clearCart();
                        
                        set({
                            cart,
                            totalItems: 0,
                            isEmpty: true,
                            isClearing: false
                        });
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : 'Erro ao limpar carrinho';
                        set({ error: errorMessage, isClearing: false });
                        throw error;
                    }
                },

                // Mesclar carrinhos
                mergeCarts: async (sessionId: string) => {
                    set({ isMerging: true, error: null });
                    
                    try {
                        const cart = await CartService.mergeCarts(sessionId);
                        
                        set({
                            cart,
                            totalItems: calculateTotalItems(cart),
                            isEmpty: !cart.items || cart.items.length === 0,
                            isMerging: false
                        });
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : 'Erro ao mesclar carrinhos';
                        set({ error: errorMessage, isMerging: false });
                        throw error;
                    }
                },

                // Incrementar item
                incrementItem: async (itemId: string, increment: number = 1) => {
                    const { cart } = get();
                    if (!cart) return;

                    const item = cart.items.find(item => item.id === itemId);
                    if (!item) return;

                    const newQuantity = item.quantity + increment;
                    await get().updateItem(itemId, { quantity: newQuantity });
                },

                // Decrementar item
                decrementItem: async (itemId: string, decrement: number = 1) => {
                    const { cart } = get();
                    if (!cart) return;

                    const item = cart.items.find(item => item.id === itemId);
                    if (!item) return;

                    const newQuantity = Math.max(1, item.quantity - decrement);
                    await get().updateItem(itemId, { quantity: newQuantity });
                },

                // Obter item por ID
                getItemById: (itemId: string) => {
                    const { cart } = get();
                    if (!cart) return undefined;
                    return cart.items.find(item => item.id === itemId);
                },

                // Obter item por ID do produto
                getItemByProductId: (productId: string) => {
                    const { cart } = get();
                    if (!cart) return undefined;
                    return cart.items.find(item => item.productId === productId);
                },

                // Verificar se produto está no carrinho
                hasProduct: (productId: string) => {
                    const { cart } = get();
                    if (!cart) return false;
                    return cart.items.some(item => item.productId === productId);
                },

                // Obter quantidade do produto
                getProductQuantity: (productId: string) => {
                    const { cart } = get();
                    if (!cart) return 0;
                    const item = cart.items.find(item => item.productId === productId);
                    return item ? item.quantity : 0;
                },

                // Definir session ID
                setSessionId: (sessionId: string) => {
                    set({ sessionId });
                },

                // Gerar session ID
                generateSessionId,

                // Definir erro
                setError: (error: string | null) => {
                    set({ error });
                },

                // Limpar erro
                clearError: () => {
                    set({ error: null });
                },

                // Reset do estado
                reset: () => {
                    set({
                        cart: null,
                        sessionId: null,
                        isLoading: false,
                        isAdding: false,
                        isUpdating: false,
                        isRemoving: false,
                        isClearing: false,
                        isMerging: false,
                        error: null,
                        totalItems: 0,
                        isEmpty: true
                    });
                }
            }),
            {
                name: 'cart-storage',
                // CORREÇÃO PRINCIPAL: Persistir o estado completo do carrinho
                partialize: (state) => ({
                    cart: state.cart,
                    sessionId: state.sessionId,
                    totalItems: state.totalItems,
                    isEmpty: state.isEmpty
                }),
                // Versão para migrations futuras
                version: 1,
                // Hidratar os computed values após recarregar
                onRehydrateStorage: () => (state) => {
                    if (state?.cart) {
                        state.totalItems = calculateTotalItems(state.cart);
                        state.isEmpty = !state.cart.items || state.cart.items.length === 0;
                    }
                }
            }
        ),
        {
            name: 'cart-store',
        }
    )
);