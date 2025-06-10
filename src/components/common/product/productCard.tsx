// components/product-card.tsx
import { useNavigate } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types/product";

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

    return (
        <Card 
        className="hover:shadow-lg transition-shadow cursor-pointer"
        onClick={handleCardClick}
        >
        <CardHeader className="relative">
            <div className="flex items-center space-x-4 mb-3">
            {product.user && (
                <Avatar>
                <AvatarImage src={product.user.email} />
                <AvatarFallback>{product.user.firstName?.charAt(0)}</AvatarFallback>
                </Avatar>
            )}
            <div>
                <p className="text-sm font-medium leading-none">
                {product.user?.firstName || 'Anônimo'}
                </p>
                <p className="text-sm text-muted-foreground">
                {new Date(product.createdAt).toLocaleDateString()}
                </p>
            </div>
            </div>
            <CardTitle>{product.title}</CardTitle>
            <CardDescription className="line-clamp-2">
            {product.description}
            </CardDescription>
        </CardHeader>
        
        <CardContent>
            {product.imageUrl && (
            <img 
                src={product.imageUrl} 
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
            />
            )}
            
            <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">${product.price}</span>
            {product.category && (
                <Badge variant="outline">{product.category.name}</Badge>
            )}
            </div>
            
            {product.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
                {product.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
            </div>
            )}
        </CardContent>
        
        {isOwner && onEdit && onDelete && (
            <CardFooter className="flex justify-end gap-2">
            <Button 
                variant="outline" 
                size="sm" 
                onClick={(e) => {
                e.stopPropagation();
                onEdit(product.id);
                }}
            >
                Editar
            </Button>
            <Button 
                variant="destructive" 
                size="sm" 
                onClick={(e) => {
                e.stopPropagation();
                onDelete(product.id);
                }}
            >
                Excluir
            </Button>
            </CardFooter>
        )}
        </Card>
    );
}