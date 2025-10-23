
import { useCategories } from '@/hooks/useCategory';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  imageUrl?: string;
  productCount?: number;
}

interface CategoryGridProps {
  title?: string;
  subtitle?: string;
  className?: string;
  onSelect?: (category: Category) => void;
  variant?: 'default' | 'compact';
}

export const CategoryGrid = ({
  title,
  subtitle,
  className = '',
  onSelect,
  variant = 'default',
}: CategoryGridProps) => {
  const { categories, isLoading, error } = useCategories();
  const navigate = useNavigate();

  const handleCategoryClick = (category: Category) => {
    onSelect?.(category) || navigate({ to: `/categories/${category.id}` });
  };

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {title && <h2 className="text-2xl font-light">{title}</h2>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-3/4 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center p-24  ${className}`}>
        <AlertTriangle className="mx-auto mb-4 h-8 w-8 text-muted-foreground" />
        <p className="text-muted-foreground rounded-none text-xl mb-4">Erro ao carregar categorias</p>
        <Button variant="default"  className='rounded-[0.4rem] mt-2 bg-transparent border border-zinc-600 text-zinc-600 hover:bg-zinc-600 hover:text-white' onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  if (!categories?.length) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-muted-foreground">Nenhuma categoria disponível</p>
      </div>
    );
  }

  return (
    <section className={`space-y-6 ${className}`}>
      <header className="space-y-1 flex flex-col justify-center items-center">
        {title && <h2 className="text-4xl font-light tracking-tight">{title}</h2>}
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        <div className="w-16 h-px bg-black"></div>
      </header>

      <div className={`grid grid-cols-2 ${
        variant === 'compact' ? 'sm:grid-cols-3 md:grid-cols-5' : 'sm:grid-cols-3 md:grid-cols-4'
      } gap-4`}>
        {categories.map((category) => (
          <article 
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className="group cursor-pointer space-y-2"
          >
            <div className="relative aspect-square overflow-hidden bg-gray-50">
              {category.imageUrl ? (
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-xs text-muted-foreground">Sem imagem</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
            </div>

            <div className="text-center space-y-0.5">
              <h3 className="font-medium text-sm truncate">{category.name}</h3>
              {variant === 'default' && category.productCount !== undefined && (
                <p className="text-xs text-muted-foreground">
                  {category.productCount} {category.productCount === 1 ? 'item' : 'itens'}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};