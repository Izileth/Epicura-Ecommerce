// components/public-products-list.tsx
import { useProducts } from "@/hooks/useProduct";
import { ProductCard } from "./productCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CloudAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PublicProductsList() {
    const { 
        publicProducts, 
        isPublicLoading, 
        publicError,
        refreshPublicProducts 
    } = useProducts();

    if (isPublicLoading) {
        return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[400px] w-full rounded-xl" />
            ))}
        </div>
        );
    }

    if (publicError) {
        return (
        <Alert variant="destructive">
            <CloudAlert className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>
            {publicError}
            <Button variant="ghost" className="ml-2" onClick={refreshPublicProducts}>
                Tentar novamente
            </Button>
            </AlertDescription>
        </Alert>
        );
    }

    if (publicProducts.length === 0) {
        return (
        <div className="text-center py-12">
            <h3 className="text-lg font-medium">Nenhum produto disponível</h3>
            <p className="text-muted-foreground mt-2">
            Ainda não há produtos cadastrados no sistema
            </p>
        </div>
        );
    }

    return (
        <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-light">Todos os Produtos</h2>
            <Button variant="outline" onClick={refreshPublicProducts}>
            Atualizar lista
            </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
            ))}
        </div>
        </div>
    );
}