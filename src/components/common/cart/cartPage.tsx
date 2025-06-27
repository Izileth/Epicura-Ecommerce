
import { useEffect } from 'react';
import { useCart, useCartActions,useCartLoading } from '@/hooks/useCart';
import { Loader2, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import type { CartItem } from '@/types/cart';


export const CartPage = () => {
    const { items, total, isEmpty } = useCart()
    const { removeItem, clearCart, incrementItem, decrementItem, initializeCart } = useCartActions()
    const { isAnyLoading, isRemoving, isUpdating } = useCartLoading()

    useEffect(() => {
        initializeCart()
    }, [])

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        }).format(price)
    }

    const currentYear = new Date().getFullYear()

    if (isEmpty && !isAnyLoading) {
        return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="text-center py-16">
                <div className="w-24 h-24 border border-gray-200 bg-white mx-auto mb-8 flex items-center justify-center">
                <ShoppingBag size={32} className="text-gray-300 stroke-1" />
                </div>
                <h2 className="text-2xl font-light text-black mb-4">Seu carrinho está vazio</h2>
                <p className="text-gray-600 font-light mb-8 max-w-md mx-auto leading-relaxed">
                Adicione produtos ao seu carrinho para continuar com a compra
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors duration-200 font-light">
                Continuar Comprando
                <ArrowRight size={16} className="stroke-1" />
                </button>
            </div>

            {/* Copyright Notice */}
            <div className="mt-16 pt-8 border-t border-gray-200">
                <p className="text-center text-xs font-light text-gray-400">
                © {currentYear} Epicura Brand. Todos os direitos reservados.
                </p>
            </div>
            </div>
        </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            {/* Header */}
            <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-light text-black mb-4 tracking-wide">Seu Carrinho</h1>
            <div className="w-16 h-px bg-black"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
                {items.map((item) => (
                <CartItemCard
                    key={item.id}
                    item={item}
                    onIncrement={() => incrementItem(item.id)}
                    onDecrement={() => decrementItem(item.id)}
                    onRemove={() => removeItem(item.id)}
                    isUpdating={isUpdating}
                />
                ))}

                {/* Clear Cart Button */}
                <div className="pt-6 border-t border-gray-200">
                <button
                    onClick={clearCart}
                    disabled={isEmpty || isAnyLoading}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-light text-gray-600 border border-gray-200 hover:border-black hover:text-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isRemoving ? (
                    <Loader2 size={14} className="animate-spin stroke-1" />
                    ) : (
                    <Trash2 size={14} className="stroke-1" />
                    )}
                    Limpar Carrinho
                </button>
                </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
                <div className="bg-white border border-gray-200 sticky top-8">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-light text-black">Resumo do Pedido</h2>
                </div>

                {/* Summary Details */}
                <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-light">Subtotal</span>
                    <span className="font-light text-black">{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-light">Entrega</span>
                    <span className="font-light text-black">Grátis</span>
                    </div>
                    <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-light">Taxa de serviço</span>
                    <span className="font-light text-black">R$ 0,00</span>
                    </div>
                </div>

                {/* Total */}
                <div className="p-6 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-light text-black">Total</span>
                    <span className="text-xl font-light text-black">{formatPrice(total)}</span>
                    </div>

                    <button
                    disabled={isEmpty || isAnyLoading}
                    className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors duration-200 font-light disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                    {isAnyLoading ? (
                        <>
                        <Loader2 size={16} className="animate-spin stroke-1" />
                        Processando...
                        </>
                    ) : (
                        <>
                        Finalizar Compra
                        <ArrowRight size={16} className="stroke-1" />
                        </>
                    )}
                    </button>

                    <p className="text-xs font-light text-gray-500 mt-4 text-center leading-relaxed">
                    Ao finalizar a compra, você concorda com nossos{" "}
                    <a href="/terms" className="underline hover:no-underline">
                        Termos de Uso
                    </a>{" "}
                    e{" "}
                    <a href="/privacy" className="underline hover:no-underline">
                        Política de Privacidade
                    </a>
                    .
                    </p>
                </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 p-6 bg-gray-50 border border-gray-200">
                <h3 className="text-sm font-light text-black mb-3">Informações de Entrega</h3>
                <ul className="space-y-2 text-xs font-light text-gray-600">
                    <li>• Entrega gratuita para pedidos acima de R$ 100,00</li>
                    <li>• Prazo de entrega: 2-5 dias úteis</li>
                    <li>• Acompanhe seu pedido em tempo real</li>
                    <li>• Garantia de satisfação ou seu dinheiro de volta</li>
                </ul>
                </div>
            </div>
            </div>

            {/* Copyright Notice */}
            <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-center text-xs font-light text-gray-400">
                © {currentYear} Epicura Brand. Todos os direitos reservados.
            </p>
            </div>
        </div>
        </div>
    )
}


// Componente de Item do Carrinho

    
const  CartItemCard = ({
    item,
    onIncrement,
    onDecrement,
    onRemove,
    isUpdating,
    }: {
    item: CartItem
    onIncrement: () => void
    onDecrement: () => void
    onRemove: () => void
    isUpdating: boolean
    }) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        }).format(price)
    }

    const itemTotal = (item.product?.price || 0) * item.quantity

    return (
        <div className="bg-white border border-gray-200 hover:border-gray-300 transition-colors duration-200">
        <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
            {/* Product Image */}
            <div className="flex-shrink-0">
                <div className="w-20 h-20 border border-gray-200 bg-gray-50 overflow-hidden">
                {item.product?.imageUrl ? (
                    <img
                    src={item.product.imageUrl || "/placeholder.svg"}
                    alt={item.product.title}
                    className="w-full h-full object-cover filter grayscale"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag size={24} className="text-gray-300 stroke-1" />
                    </div>
                )}
                </div>
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-light text-black leading-tight pr-4">{item.product?.title}</h3>
                <button
                    onClick={onRemove}
                    disabled={isUpdating}
                    className="flex-shrink-0 w-8 h-8 border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isUpdating ? (
                    <Loader2 size={14} className="animate-spin stroke-1" />
                    ) : (
                    <Trash2 size={14} className="stroke-1" />
                    )}
                </button>
                </div>

                {item.product?.description && (
                <p className="text-sm font-light text-gray-600 mb-4 leading-relaxed">
                    {item.product.description.length > 80
                    ? `${item.product.description.substring(0, 80)}...`
                    : item.product.description}
                </p>
                )}

                {/* Quantity and Price Controls */}
                <div className="flex items-center justify-between">
                <div className="flex items-center border border-gray-200">
                    <button
                    onClick={onDecrement}
                    disabled={item.quantity <= 1 || isUpdating}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-200"
                    >
                    <Minus size={14} className="stroke-1" />
                    </button>
                    <span className="w-12 h-10 flex items-center justify-center text-sm font-light bg-white">
                    {item.quantity}
                    </span>
                    <button
                    onClick={onIncrement}
                    disabled={isUpdating}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-l border-gray-200"
                    >
                    <Plus size={14} className="stroke-1" />
                    </button>
                </div>

                <div className="text-right">
                    <div className="text-sm font-light text-gray-600">
                    {formatPrice(item.product?.price || 0)} × {item.quantity}
                    </div>
                    <div className="text-lg font-light text-black">{formatPrice(itemTotal)}</div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}
