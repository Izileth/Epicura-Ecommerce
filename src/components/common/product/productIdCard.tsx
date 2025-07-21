// src/routes/products/$id.tsx
import { useEffect } from 'react'
import { useParams, useNavigate } from '@tanstack/react-router'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useProducts } from '@/hooks/useProduct'
import useAuthStore from '@/store/auth'

import { ArrowLeft, Edit3, Trash2, Calendar, Tag, ExternalLink } from "lucide-react"


export function DetailsProduct() {
    const { id } = useParams({ strict: false })
    const navigate = useNavigate()
    const { user } = useAuthStore()
    const { 
        currentProduct, 
        fetchProductById, 
        deleteProduct,
        isLoading,
        error
    } = useProducts()
 
    useEffect(() => {
        if (id) {
     
            fetchProductById(user?.id || '', id) 
        }
    }, [id, user?.id])

    const handleDelete = async () => {
        try {
        if (!user?.id || !id) return
        await deleteProduct(user.id, id)
        navigate({ to: '/products/user' })
        } catch (err) {
        console.error('Failed to delete product:', err)
        }
    }


    if (isLoading) {
        return (
        <div className="min-h-full w-full max-h-full bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-full">
            <div className="space-y-8">
                <div className="h-10 bg-gray-200 animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-96 bg-gray-200 animate-pulse"></div>
                <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-8 bg-gray-200 animate-pulse"></div>
                    ))}
                </div>
                </div>
            </div>
            </div>
        </div>
        )
    }




     if (error || !currentProduct) {
        return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl font-light text-black mb-6">Produto não encontrado</h2>
            <button
                onClick={() => navigate({ to: "/products" })}
                className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-200 hover:bg-gray-50 transition-colors duration-200 font-light"
            >
                <ArrowLeft size={16} />
                <span>Voltar para produtos</span>
            </button>
            </div>
        </div>
        )
    }
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        })
    }
  
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        }).format(price)
    }

    const isOwner = user?.id === currentProduct.userId

     
    return (
        <div className="min-h-auto bg-gray-50">
            <div className="container mx-auto px-4 py-12 max-w-full ">
                {/* Back Button */}
                <button
                onClick={() => navigate({ to: isOwner ? "/products/user" : "/products" })}
                className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-200 hover:bg-gray-50 transition-colors duration-200 font-light mb-8"
                >
                <ArrowLeft size={16} />
                <span>Voltar</span>
                </button>

                {/* Main Content */}
                <div className="bg-white border border-gray-200">
                {/* Header */}
                <div className="p-8 border-b border-gray-100">
                    <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <h1 className="text-3xl font-light text-black mb-4">{currentProduct.title}</h1>
                        <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 border border-gray-200 bg-gray-50 flex items-center justify-center">
                            <Avatar>
                            <AvatarImage src={currentProduct.user?.email} />
                            <AvatarFallback>
                                {currentProduct.user?.firstName?.charAt(0) || 'U'}
                            </AvatarFallback>
                            </Avatar>
                        </div>
                        <div>
                            <p className="text-sm font-light text-black">{currentProduct.user?.firstName || "Anônimo"}</p>
                            <div className="flex items-center space-x-1 mt-1">
                            <Calendar size={12} className="text-gray-400" />
                            <span className="text-xs font-light text-gray-500">
                                Publicado em {formatDate(currentProduct.createdAt.toLocaleString())}
                            </span>
                            </div>
                        </div>
                        </div>
                    </div>

                    {isOwner && (
                        <div className="flex space-x-3">
                        <button
                            onClick={() => navigate({ to: "/products/edit/$id", params: { id: id || "" } })}
                            className="flex items-center space-x-2 px-4 py-2 text-sm font-light text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                        >
                            <Edit3 size={14} />
                            <span>Editar</span>
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex items-center space-x-2 px-4 py-2 text-sm font-light text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-black transition-colors duration-200"
                        >
                            <Trash2 size={14} />
                            <span>Excluir</span>
                        </button>
                        </div>
                    )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Image and Tags */}
                    <div className="space-y-6">
                        {currentProduct.imageUrl && (
                        <div className="border border-gray-200">
                            <img
                            src={currentProduct.imageUrl || "/placeholder.svg"}
                            alt={currentProduct.title}
                            className="w-full h-auto max-h-96 object-cover"
                            />
                        </div>
                        )}

                        {currentProduct.tags && currentProduct.tags.length > 0 && (
                        <div>
                            <h3 className="text-sm font-light text-gray-600 mb-3 flex items-center space-x-2">
                            <Tag size={14} />
                            <span>Tags</span>
                            </h3>
                            <div className="flex flex-wrap gap-2">
                            {currentProduct.tags.map((tag) => (
                                <span
                                key={tag}
                                className="px-3 py-1 text-xs font-light text-gray-700 border border-gray-200 bg-gray-50"
                                >
                                {tag}
                                </span>
                            ))}
                            </div>
                        </div>
                        )}
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-8">
                        {/* Description */}
                        <div>
                        <h3 className="text-lg font-light text-black mb-3">Descrição</h3>
                        <p className="text-gray-600 font-light leading-relaxed">
                            {currentProduct.description || "Nenhuma descrição fornecida."}
                        </p>
                        </div>

                        {/* Details Grid */}
                        <div>
                        <h3 className="text-lg font-light text-black mb-4">Detalhes</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1">
                            <p className="text-sm font-light text-gray-600">Preço</p>
                            <p className="text-2xl font-light text-black">{formatPrice(currentProduct.price)}</p>
                            </div>

                            {currentProduct.category && (
                            <div className="space-y-1">
                                <p className="text-sm font-light text-gray-600">Categoria</p>
                                <span className="inline-block px-3 py-1 text-sm font-light text-gray-700 border border-gray-200 bg-gray-50">
                                {currentProduct.category.name}
                                </span>
                            </div>
                            )}

                            <div className="space-y-1">
                            <p className="text-sm font-light text-gray-600">Disponibilidade</p>
                            <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 ${currentProduct.isAvailable ? "bg-black" : "bg-gray-400"}`}></div>
                                <span className="text-sm font-light text-gray-900">
                                {currentProduct.isAvailable ? "Disponível" : "Indisponível"}
                                </span>
                            </div>
                            </div>

                            <div className="space-y-1">
                            <p className="text-sm font-light text-gray-600">Publicado em</p>
                            <p className="text-sm font-light text-gray-900"> {new Date(currentProduct.updatedAt).toLocaleString()}</p>
                            </div>
                        </div>
                        </div>

                        {/* External Link */}
                        {currentProduct.link && (
                        <div>
                            <a
                            href={currentProduct.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors duration-200 font-light"
                            >
                            <ExternalLink size={16} />
                            <span>Visitar Link do Produto</span>
                            </a>
                        </div>
                        )}
                    </div>
                    </div>
                </div>
    
                </div>
            </div>
        </div>
    )
}