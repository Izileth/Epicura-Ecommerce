import { useCartStore } from "@/store/cart";

export const useCart = () => {
    const cart = useCartStore(state => state.cart);
    const totalItems = useCartStore(state => state.totalItems);
    const isEmpty = useCartStore(state => state.isEmpty);
    const isLoading = useCartStore(state => state.isLoading);
    const error = useCartStore(state => state.error);

    return {
        cart,
        totalItems,
        isEmpty,
        isLoading,
        error,
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