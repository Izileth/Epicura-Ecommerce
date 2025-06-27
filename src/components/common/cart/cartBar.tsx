import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Loader2} from 'lucide-react';
import { useCart, useCartActions, useCartLoading } from '@/hooks/useCart';
import type { CartItem } from '@/types/cart';
interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

interface CartItemProps {
    item: CartItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { incrementItem, decrementItem, removeItem } = useCartActions()
    const { isUpdating, isRemoving } = useCartLoading()

    const handleIncrement = () => {
        incrementItem(item.id)
    }

    const handleDecrement = () => {
        if (item.quantity > 1) {
        decrementItem(item.id)
        } else {
        removeItem(item.id)
        }
    }

    const handleRemove = () => {
        removeItem(item.id)
    }

    const isItemLoading = isUpdating || isRemoving
    const itemTotal = (item.product?.price || 0) * item.quantity

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        }).format(price)
    }

    return (
        <div
        className={`border-b border-gray-200 pb-4 transition-opacity duration-200 ${isItemLoading ? "opacity-50" : ""}`}
        >
        <div className="flex gap-4">
            {/* Product Image */}
            <div className="flex-shrink-0">
            <div className="w-16 h-16 border border-gray-200 bg-gray-50 overflow-hidden">
                {item.product?.imageUrl && item.product?.isAvailable ? (
                <img
                    src={item.product.imageUrl || "/placeholder.svg"}
                    alt={item.product.title}
                    className="w-full h-full object-cover filter grayscale"
                />
                ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag size={20} className="text-gray-300 stroke-1" />
                </div>
                )}
            </div>
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-light text-black text-sm leading-tight pr-2">{item.product?.title}</h4>
                <button
                onClick={handleRemove}
                disabled={isItemLoading}
                className="flex-shrink-0 w-6 h-6 border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                {isItemLoading ? (
                    <Loader2 size={10} className="animate-spin stroke-1" />
                ) : (
                    <Trash2 size={10} className="stroke-1" />
                )}
                </button>
            </div>

            {item.product?.description && (
                <p className="text-xs font-light text-gray-600 mb-3 leading-relaxed">
                {item.product.description.length > 50
                    ? `${item.product.description.substring(0, 50)}...`
                    : item.product.description}
                </p>
            )}

            {/* Quantity Controls and Price */}
            <div className="flex items-center justify-between">
                <div className="flex items-center border border-gray-200">
                <button
                    onClick={handleDecrement}
                    disabled={isItemLoading}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-200"
                >
                    <Minus size={12} className="stroke-1" />
                </button>
                <span className="w-10 h-8 flex items-center justify-center text-xs font-light bg-white">
                    {item.quantity}
                </span>
                <button
                    onClick={handleIncrement}
                    disabled={isItemLoading}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-l border-gray-200"
                >
                    <Plus size={12} className="stroke-1" />
                </button>
                </div>

                <div className="text-right">
                <div className="text-sm font-light text-black">{formatPrice(itemTotal)}</div>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

// Enhanced Cart Sidebar Component
export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
    const { items, total, totalItems, isEmpty, isLoading, error } = useCart()
    const { clearCart } = useCartActions()
    const { isClearing, isAnyLoading } = useCartLoading()

    const handleClearCart = () => {
        if (window.confirm("Tem certeza que deseja limpar o carrinho?")) {
        clearCart()
        }
    }

    const handleCheckout = () => {
        console.log("Iniciando checkout...")
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        }).format(price)
    }

    const currentYear = new Date().getFullYear()

    if (!isOpen) return null

    return (
        <>
        {/* Overlay */}
        <div
            className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={onClose}
        />

        {/* Sidebar */}
        <div
            className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-black stroke-1" />
                <h2 className="text-lg font-light text-black">Carrinho</h2>
                {totalItems > 0 && (
                <span className="px-2 py-1 text-xs font-light text-black border border-gray-200 bg-gray-50">
                    {totalItems}
                </span>
                )}
            </div>
            <button
                onClick={onClose}
                className="w-8 h-8 border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-200 flex items-center justify-center"
            >
                <X size={16} className="stroke-1" />
            </button>
            </div>

            {/* Content */}
            <div className="flex flex-col h-full">
            {/* Items List */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                    <Loader2 size={24} className="animate-spin text-gray-400 stroke-1" />
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-gray-600 font-light mb-4">{error}</p>
                    <button className="px-4 py-2 border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-200 font-light text-sm">
                        Tentar novamente
                    </button>
                    </div>
                ) : isEmpty ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 border border-gray-200 bg-gray-50 mb-6 flex items-center justify-center">
                        <ShoppingBag size={24} className="text-gray-300 stroke-1" />
                    </div>
                    <h3 className="text-lg font-light text-black mb-2">Carrinho vazio</h3>
                    <p className="text-gray-600 font-light mb-6 max-w-xs leading-relaxed">
                        Adicione alguns produtos para começar suas compras
                    </p>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-200 font-light"
                    >
                        Continuar comprando
                    </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                    {items.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}

                    {/* Clear Cart Button */}
                    {!isEmpty && (
                        <div className="pt-4 border-t border-gray-200">
                        <button
                            onClick={handleClearCart}
                            disabled={isClearing}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-light text-gray-600 border border-gray-200 hover:border-black hover:text-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isClearing ? (
                            <Loader2 size={14} className="animate-spin stroke-1" />
                            ) : (
                            <Trash2 size={14} className="stroke-1" />
                            )}
                            Limpar carrinho
                        </button>
                        </div>
                    )}
                    </div>
                )}
                </div>
            </div>

            {/* Footer with Total and Checkout */}
            {!isEmpty && (
                <div className="border-t border-gray-200 bg-white p-6 space-y-6">
                {/* Order Summary */}
                <div className="space-y-3">
                    <div className="flex justify-between text-sm font-light">
                    <span className="text-gray-600">
                        Subtotal ({totalItems} {totalItems === 1 ? "item" : "itens"})
                    </span>
                    <span className="text-black">{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-light">
                    <span className="text-gray-600">Entrega</span>
                    <span className="text-black">Grátis</span>
                    </div>
                    <div className="h-px bg-gray-200"></div>
                    <div className="flex justify-between text-lg font-light">
                    <span className="text-black">Total</span>
                    <span className="text-black">{formatPrice(total)}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                    onClick={handleCheckout}
                    disabled={isAnyLoading}
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

                    <button
                    onClick={onClose}
                    className="w-full py-3 border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-200 font-light"
                    >
                    Continuar comprando
                    </button>
                </div>

                {/* Copyright Notice */}
                <div className="pt-4 border-t border-gray-200">
                    <p className="text-center text-xs font-light text-gray-400">
                    © {currentYear} Epicura Brand. Todos os direitos reservados.
                    </p>
                </div>
                </div>
            )}
            </div>
        </div>
        </>
    )
}
