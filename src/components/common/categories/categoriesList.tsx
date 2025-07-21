import { useParams, useNavigate } from '@tanstack/react-router';
import { useCategories } from '@/hooks/useCategory';
import { ProductCard } from '../product/productCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function CategoryProductsPage() {

    const { id: categoryId } = useParams({ strict: false })
    const navigate = useNavigate();
    const { 
        currentCategory, 
        isLoading, 
        error 
    } = useCategories(categoryId);


    if (isLoading) {
        return (
        <div className="container py-8">
            <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-24" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-80 w-full rounded-lg" />
            ))}
            </div>
        </div>
        );
    }

    if (error) {
        return (
        <div className="container py-8 text-center">
            <div className="mb-4 text-destructive">{error}</div>
            <Button variant="outline" onClick={() => navigate({ to: '/' })}>
            Voltar para categorias
            </Button>
        </div>
        );
    }

    if (!currentCategory) {
        return (
        <div className="container py-8 text-center">
            <div className="mb-4">Categoria não encontrada</div>
            <Button variant="outline" onClick={() => navigate({ to: '/' })}>
            Voltar para categorias
            </Button>
        </div>
        );
    }

    return (
        <div className="container py-8 px-2 md:px-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate({ to: '/' })}
                    className="mb-2"
                >
                    <ArrowLeft className=" h-4 w-4" />
                    Todas categorias
                </Button>
                <h1 className="text-2xl font-bold">{currentCategory.name}</h1>
                {currentCategory.description && (
                    <p className="text-muted-foreground mt-1">{currentCategory.description}</p>
                )}
                </div>
                <div className="text-sm text-muted-foreground">
                {currentCategory.productCount} {currentCategory.productCount === 1 ? 'produto' : 'produtos'}
                </div>
            </div>

            {currentCategory.products?.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentCategory.products.map((product) => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                    />
                ))}
                </div>
            ) : (
                <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Nenhum produto encontrado nesta categoria</p>
                <Button variant="outline" onClick={() => navigate({ to: '/products/create' })}>
                    Criar novo produto
                </Button>
                </div>
            )}
        </div>
    );
}