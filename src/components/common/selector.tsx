import React from 'react';
import { Link } from '@tanstack/react-router';

// Tipagem para uma categoria
export interface Category {
    id: string;
    name: string;
    description?: string;
    path: string;
    imageUrl?: string;
    iconSvg?: string; // SVG como string para ícones personalizados
}

// Props do componente
export interface CategorySelectorProps {
    categories: Category[];
    title?: string;
    className?: string;
    onCategorySelect?: (category: Category) => void;
}

// Componente de ícone padrão para categorias sem imagem
const DefaultCategoryIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
    <svg 
        className={className} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5"
    >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
    </svg>
);

// Item individual de categoria
const CategoryItem: React.FC<{
    category: Category;
    onSelect?: (category: Category) => void;
    }> = ({ category, onSelect }) => {
    const handleClick = () => {
        onSelect?.(category);
    };

    return (
        <Link
        to={category.path}
        className="group block"
        onClick={handleClick}
        >
        <div className="
            bg-white 
            border 
            border-gray-200 
            hover:border-gray-900 
            transition-all 
            duration-300 
            ease-out
            hover:shadow-sm
            p-6
            h-full
            flex 
            flex-col 
            items-center 
            text-center
            cursor-pointer
        ">
            {/* Área da imagem/ícone */}
            <div className="mb-4 text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
            {category.imageUrl ? (
                <img
                src={category.imageUrl}
                alt={category.name}
                className="w-16 h-16 mx-auto object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
            ) : category.iconSvg ? (
                <div 
                className="w-16 h-16 mx-auto"
                dangerouslySetInnerHTML={{ __html: category.iconSvg }}
                />
            ) : (
                <DefaultCategoryIcon className="w-16 h-16 mx-auto" />
            )}
            </div>

            {/* Conteúdo textual */}
            <div className="flex-1 flex flex-col justify-center">
            <h3 className="
                text-lg 
                font-medium 
                text-gray-900 
                mb-2 
                group-hover:text-black 
                transition-colors 
                duration-300
                tracking-tight
            ">
                {category.name}
            </h3>
            
            {category.description && (
                <p className="
                text-sm 
                text-gray-500 
                leading-relaxed
                group-hover:text-gray-700
                transition-colors 
                duration-300
                ">
                {category.description}
                </p>
            )}
            </div>

            {/* Indicador de navegação */}
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg 
                className="w-4 h-4 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth="1.5"
            >
                <path strokeLinecap="butt" strokeLinejoin="miter" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            </div>
        </div>
        </Link>
    );
};

// Componente principal
export const CategorySelector: React.FC<CategorySelectorProps> = ({
    categories,
    title,
    className = "",
    onCategorySelect
    }) => {
    if (!categories || categories.length === 0) {
        return (
        <div className={`text-center py-12 ${className}`}>
            <p className="text-gray-500">Nenhuma categoria disponível</p>
        </div>
        );
    }

    return (
        <section className={`w-full ${className}`}>
        {title && (
            <div className="mb-8 text-center">
            <h2 className="
                text-2xl 
                md:text-3xl 
                font-light 
                text-gray-900 
                tracking-tight
                border-b 
                border-gray-200 
                pb-4 
                inline-block
            ">
                {title}
            </h2>
            </div>
        )}
        
        <div className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4 
            gap-6
            auto-rows-fr
        ">
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


export default CategorySelector;