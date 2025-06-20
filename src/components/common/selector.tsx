// components/CategorySelector.tsx
import { useCategories } from '@/hooks/useCategory';
import { Skeleton } from '@/components/ui/skeleton';
import { Grid3X3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

interface CategorySelectorProps {
  title?: string;
  className?: string;
  onCategorySelect?: (category: Category) => void;
}

const DefaultCategoryIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <Grid3X3 className={`${className} stroke-1`} />
);

const CategoryItem = ({ 
  category,
  onSelect 
}: {
  category: Category;
  onSelect?: (category: Category) => void;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onSelect?.(category);
    // Navegação alternativa se não houver handler
    if (!onSelect) {
      navigate({ to: `/categories/${category.id}` });
    }
  };

  return (
    <div 
      className="group block cursor-pointer"
      onClick={handleClick}
    >
      <div className="bg-card border hover:border-primary transition-all p-6 h-full flex flex-col items-center text-center">
        {/* Ícone/Imagem */}
        <div className="mb-4 text-muted-foreground group-hover:text-primary transition-colors">
          {category.imageUrl ? (
            <div className="w-16 h-16 mx-auto rounded-md overflow-hidden">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <DefaultCategoryIcon className="w-16 h-16 mx-auto" />
          )}
        </div>

        {/* Conteúdo */}
        <div className="flex-1 flex flex-col justify-center mb-2">
          <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          {category.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {category.description}
            </p>
          )}
        </div>

        <ArrowRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};

export const CategorySelector = ({
  title,
  className = "",
  onCategorySelect
}: CategorySelectorProps) => {
  const { categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-destructive mb-4">Erro ao carregar categorias</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <div className="max-w-md mx-auto">
          <Grid3X3 size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Nenhuma categoria disponível</p>
        </div>
      </div>
    );
  }

  return (
    <section className={`w-full ${className}`}>
      {title && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryItem 
            key={category.id} 
            category={category} 
            onSelect={onCategorySelect} 
          />
        ))}
      </div>
    </section>
  );
};