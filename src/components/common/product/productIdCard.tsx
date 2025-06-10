// src/routes/products/$id.tsx
import { useEffect } from 'react'
import { useParams, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useProducts } from '@/hooks/useProduct'
import { Skeleton } from '@/components/ui/skeleton'
import useAuthStore from '@/store/auth'
import { Edit, Trash, ArrowLeft } from 'lucide-react'

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
        if (id && user?.id) {
        fetchProductById(user.id, id)
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
        <div className="container py-8 max-w-4xl space-y-6">
            <Skeleton className="h-10 w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-96 w-full" />
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
                ))}
            </div>
            </div>
        </div>
        )
    }

    if (error || !currentProduct) {
        return (
        <div className="container py-8 max-w-4xl text-center">
            <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
            <Button onClick={() => navigate({ to: '/products' })}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para produtos
            </Button>
        </div>
        )
    }

    const isOwner = user?.id === currentProduct.userId

    return (
        <div className="container py-8 max-w-4xl">
        <Button 
            variant="ghost" 
            onClick={() => navigate({ to: isOwner ? '/products/user' : '/products' })}
            className="mb-6"
        >
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>

        <Card>
            <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                <CardTitle className="text-3xl">{currentProduct.title}</CardTitle>
                <div className="flex items-center mt-2 space-x-4">
                    <Avatar>
                    <AvatarImage src={currentProduct.user?.email} />
                    <AvatarFallback>
                        {currentProduct.user?.firstName?.charAt(0) || 'U'}
                    </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                    Publicado por {currentProduct.user?.firstName || 'Anônimo'}
                    </span>
                </div>
                </div>
                
                {isOwner && (
                <div className="flex space-x-2">
                    <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate({ to: '/products/edit/$id', params: { 'id': id || '' } })}
                    >
                    <Edit className="mr-2 h-4 w-4" /> Editar
                    </Button>
                    <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleDelete}
                    >
                    <Trash className="mr-2 h-4 w-4" /> Excluir
                    </Button>
                </div>
                )}
            </div>
            </CardHeader>

            <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                {currentProduct.imageUrl && (
                    <img
                    src={currentProduct.imageUrl}
                    alt={currentProduct.title}
                    className="w-full h-auto max-h-96 object-contain rounded-lg"
                    />
                )}

                <div className="flex flex-wrap gap-2">
                    {currentProduct.tags?.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
                </div>

                <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold">Descrição</h3>
                    <p className="text-muted-foreground">
                    {currentProduct.description || 'Nenhuma descrição fornecida.'}
                    </p>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Detalhes</h3>
                    <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Preço</p>
                        <p className="text-2xl font-bold">${currentProduct.price}</p>
                    </div>
                    
                    {currentProduct.category && (
                        <div>
                        <p className="text-sm text-muted-foreground">Categoria</p>
                        <Badge>{currentProduct.category.name}</Badge>
                        </div>
                    )}

                    <div>
                        <p className="text-sm text-muted-foreground">Disponibilidade</p>
                        <Badge variant={currentProduct.isAvailable ? 'default' : 'secondary'}>
                        {currentProduct.isAvailable ? 'Disponível' : 'Indisponível'}
                        </Badge>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">Publicado em</p>
                        <p>
                        {new Date(currentProduct.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    </div>
                </div>

                {currentProduct.link && (
                    <div>
                    <Button asChild>
                        <a 
                        href={currentProduct.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full md:w-auto"
                        >
                        Visitar Link do Produto
                        </a>
                    </Button>
                    </div>
                )}
                </div>
            </div>
            </CardContent>

            <CardFooter className="text-sm text-muted-foreground">
            Última atualização: {new Date(currentProduct.updatedAt).toLocaleString()}
            </CardFooter>
        </Card>
        </div>
    )
}