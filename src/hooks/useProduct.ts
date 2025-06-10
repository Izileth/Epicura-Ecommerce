
import { useProductStore } from '@/store/product';
import { useEffect } from 'react';

export const useProducts = (userId?: string) => {
    const { 
        products, 
        publicProducts,
        currentProduct, 
        isLoading, 
        isPublicLoading,
        error, 
        publicError,
        fetchProducts, 
        fetchPublicProducts,
        fetchProductById, // Adicionando esta linha
        deleteProduct
    } = useProductStore();

    // Busca produtos quando userId muda (produtos do usuário)
    useEffect(() => {
        if (userId) {
        fetchProducts(userId);
        }
    }, [userId, fetchProducts]);

    // Busca produtos públicos apenas uma vez (não depende de userId)
    useEffect(() => {
        fetchPublicProducts();
    }, [fetchPublicProducts]);

    return {
        // Produtos do usuário
        userProducts: products,
        currentProduct,
        isLoading,
        error,
        refreshUserProducts: () => userId ? fetchProducts(userId) : Promise.resolve(),
        
        // Produtos públicos
        publicProducts,
        isPublicLoading,
        publicError,
        refreshPublicProducts: fetchPublicProducts,
        
        // Métodos de ação
        fetchProductById: (userId: string, id: string) => fetchProductById(userId, id),
        deleteProduct: (userId: string, id: string) => deleteProduct(userId, id),
        
        // Todos os produtos combinados (opcional)
        allProducts: [...publicProducts, ...products],
    };
};