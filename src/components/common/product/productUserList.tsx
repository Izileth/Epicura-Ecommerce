// components/user-products-list.tsx
import { useProducts } from "@/hooks/useProduct";
import { ProductCard } from "./productCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CloudAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export function UserProductsList({ userId }: { userId: string }) {
  const { 
    userProducts, 
    isLoading, 
    error,
    refreshUserProducts,
    deleteProduct 
  } = useProducts(userId);
  
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate({ to: '/products/edit/$id', params: { id } });
  };

  const handleCreate = () => {
    navigate({ to: '/products/create' });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(userId, id);
      refreshUserProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[400px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <CloudAlert className="h-4 w-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>
          {error}
          <Button variant="ghost" className="ml-2" onClick={refreshUserProducts}>
            Tentar novamente
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (userProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">Você ainda não tem produtos</h3>
        <p className="text-muted-foreground mt-2">
          Crie seu primeiro produto para começar
        </p>
        <Button className="mt-4" onClick={handleCreate}>
          Criar produto
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-2 md:px-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-light">Seus Produtos</h2>
        <div className="space-x-2">
          <Button variant="outline" onClick={refreshUserProducts}>
            Atualizar
          </Button>
          <Button onClick={handleCreate}>
            Novo Produto
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            isOwner 
            onEdit={handleEdit}
            onDelete={() => handleDelete(product.id)}
          />
        ))}
      </div>
    </div>
  );
}