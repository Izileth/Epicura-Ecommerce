
import { useNavigate } from "@tanstack/react-router";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Product } from "@/types/product";
import { Calendar, Edit3, Trash2, Tag } from "lucide-react"

interface ProductCardProps {
    product: Product;
    isOwner?: boolean;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export function ProductCard({ product, isOwner = false, onEdit, onDelete }: ProductCardProps) {
    const navigate = useNavigate();

    const handleCardClick = (e: React.MouseEvent) => {
        // Previne a navegação se o clique foi em um botão de edição/exclusão
        const target = e.target as HTMLElement;
        if (target.closest('button')) return;
        
        navigate({ to: '/product/$id', params: { id: product.id } });
    };


    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        }).format(price)
    }

    return (
        <div className="group">
        <div
            className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer"
            onClick={handleCardClick}
        >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
                {product.user && (
                <Avatar>
                <AvatarImage src={product.user.email} />
                <AvatarFallback>{product.user.firstName?.charAt(0)}</AvatarFallback>
                </Avatar>
            )}
            <div className="flex-1">
                <p className="text-sm font-light text-black leading-tight">
                {product.user?.firstName || 'Anônimo' || product.userId }
                </p>
                <div className="flex items-center space-x-1 mt-1">
                    <Calendar size={12} className="text-gray-400" />
                    <p className="text-sm text-muted-foreground">
                    {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
            </div>

            <h3 className="text-lg font-light text-black mb-2 line-clamp-1">{product.title}</h3>
            <p className="text-sm font-light text-gray-600 line-clamp-2 leading-relaxed">{product.description}</p>
            </div>

            {/* Content */}
            <div className="p-6">
            {product.imageUrl && (
                <div className="mb-6">
                <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-48 object-cover border border-gray-200 bg-gray-50"
                />
                </div>
            )}

            <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-light text-black">{formatPrice(product.price)}</span>
                {product.category && (
                <span className="px-3 py-1 text-xs font-light text-gray-700 border border-gray-200 bg-gray-50">
                    {product.category.name}
                </span>
                )}
            </div>

            {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                    <span
                    key={tag}
                    className="inline-flex items-center space-x-1 px-2 py-1 text-xs font-light text-gray-600 border border-gray-200 bg-white"
                    >
                    <Tag size={10} />
                    <span>{tag}</span>
                    </span>
                ))}
                </div>
            )}
            </div>

            {/* Footer - Owner Actions */}
            {isOwner && onEdit && onDelete && (
            <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                <div className="flex justify-end space-x-3">
                <button
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-light text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                    onClick={(e) => {
                    e.stopPropagation()
                    onEdit(product.id)
                    }}
                >
                    <Edit3 size={14} />
                    <span>Editar</span>
                </button>
                <button
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-light text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-black transition-colors duration-200"
                    onClick={(e) => {
                    e.stopPropagation()
                    onDelete(product.id)
                    }}
                >
                    <Trash2 size={14} />
                    <span>Excluir</span>
                </button>
                </div>
            </div>
            )}
        </div>

        </div>
    )
}