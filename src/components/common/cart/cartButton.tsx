import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useCartHelpers, useCartActions } from '@/hooks/useCart';
import { useState } from 'react';

export const AddToCartButton = ({ productId }: { productId: string }) => {
    const { hasProduct, getProductQuantity } = useCartHelpers();
    const { addItem, incrementItem } = useCartActions();
    const [isLoading, setIsLoading] = useState(false);

    const quantity = getProductQuantity(productId);
    const isInCart = hasProduct(productId);

    const handleAddToCart = async () => {
        setIsLoading(true);
        try {
            if (isInCart) {
                await incrementItem(productId);
            } else {
                await addItem({
                    productId,
                    quantity: 1
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button 
            onClick={handleAddToCart}
            disabled={isLoading}
            className="w-full"
        >
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isInCart ? `Adicionar Mais (${quantity})` : 'Adicionar ao Carrinho'}
        </Button>
    );
};