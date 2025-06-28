import { useCartStore } from "@/store/cart";
import { useEffect } from "react";

export const useCart = () => {
    const cart = useCartStore(state => state.cart);
    const totalItems = useCartStore(state => state.totalItems);
    const isEmpty = useCartStore(state => state.isEmpty);
    const isLoading = useCartStore(state => state.isLoading);
    const error = useCartStore(state => state.error);
    const userId = useCartStore(state => state.userId);

    return {
        cart,
        totalItems,
        isEmpty,
        isLoading,
        error,
        userId,
        total: cart?.total || 0,
        items: cart?.items || []
    };
};

export const useCartActions = () => {
    const {
        initializeCart,
        addItem,
        updateItem,
        removeItem,
        clearCart,
        mergeCarts,
        incrementItem,
        decrementItem,
        setSessionId,
        setUserId,
        generateSessionId,
        clearError,
        reset
    } = useCartStore();

    return {
        initializeCart,
        addItem,
        updateItem,
        removeItem,
        clearCart,
        mergeCarts,
        incrementItem,
        decrementItem,
        setSessionId,
        setUserId, // ← Importante expor essa função
        generateSessionId,
        clearError,
        reset
    };
};

export const useCartHelpers = () => {
    const {
        getItemById,
        getItemByProductId,
        hasProduct,
        getProductQuantity
    } = useCartStore();

    return {
        getItemById,
        getItemByProductId,
        hasProduct,
        getProductQuantity
    };
};

export const useCartLoading = () => {
    const isLoading = useCartStore(state => state.isLoading);
    const isAdding = useCartStore(state => state.isAdding);
    const isUpdating = useCartStore(state => state.isUpdating);
    const isRemoving = useCartStore(state => state.isRemoving);
    const isClearing = useCartStore(state => state.isClearing);
    const isMerging = useCartStore(state => state.isMerging);

    return {
        isLoading,
        isAdding,
        isUpdating,
        isRemoving,
        isClearing,
        isMerging,
        isAnyLoading: isLoading || isAdding || isUpdating || isRemoving || isClearing || isMerging
    };
};

// NOVO: Hook para sincronizar usuário automaticamente
export const useCartUserSync = (currentUserId: string | null) => {
    const { setUserId, initializeCart } = useCartActions();
    const { userId: cartUserId } = useCart();

    useEffect(() => {
        // Só executa se o userId realmente mudou
        if (currentUserId !== cartUserId) {
            console.log('🔄 Sincronizando usuário do carrinho:', {
                atual: cartUserId,
                novo: currentUserId
            });
            
            setUserId(currentUserId);
            
            // Reinicializa o carrinho após mudança de usuário
            if (currentUserId) {
                initializeCart();
            }
        }
    }, [currentUserId, cartUserId, setUserId, initializeCart]);

    return { isUserSynced: currentUserId === cartUserId };
};