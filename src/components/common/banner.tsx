import React, { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';

// Tipagem para um item em destaque
export interface FeaturedItem {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    imageUrl?: string;
    videoUrl?: string;
    ctaText?: string;
    ctaPath?: string;
    ctaAction?: () => void;
    badge?: string;
    tags?: string[];
    priority?: 'high' | 'medium' | 'low';
    publishDate?: string;
    author?: {
        name: string;
        avatar?: string;
    };
}

// Props do componente
export interface FeaturedBannerProps {
    items: FeaturedItem[];
    title?: string;
    className?: string;
    layout?: 'hero' | 'grid' | 'stack' | 'minimal';
    autoRotate?: boolean;
    rotateInterval?: number;
    showNavigation?: boolean;
    showMeta?: boolean;
    maxItems?: number;
    onItemClick?: (item: FeaturedItem) => void;
}

// Componente de badge
const Badge: React.FC<{ text: string; variant?: 'default' | 'priority' }> = ({ 
    text, 
    variant = 'default' 
    }) => (
    <span className={`
        inline-block 
        px-3 
        py-1 
        text-xs 
        font-medium 
        tracking-wide 
        uppercase
        ${variant === 'priority' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-100 text-gray-700'
        }
    `}>
        {text}
    </span>
);

// Componente de tags
const TagList: React.FC<{ tags: string[] }> = ({ tags }) => (
    <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
        <span 
            key={index}
            className="
            text-xs 
            text-gray-500 
            px-2 
            py-1 
            border 
            border-gray-200
            hover:border-gray-400
            transition-colors
            duration-300
            "
        >
            {tag}
        </span>
        ))}
    </div>
);

// Componente de meta informações
const ItemMeta: React.FC<{ item: FeaturedItem }> = ({ item }) => (
    <div className="flex items-center gap-4 text-xs text-gray-500">
        {item.author && (
        <div className="flex items-center gap-2">
            {item.author.avatar ? (
            <img
                src={item.author.avatar}
                alt={item.author.name}
                className="w-4 h-4 object-cover filter grayscale"
            />
            ) : (
            <div className="w-4 h-4 bg-gray-300 flex items-center justify-center text-gray-600 text-xs">
                {item.author.name.charAt(0).toUpperCase()}
            </div>
            )}
            <span>{item.author.name}</span>
        </div>
        )}
        {item.publishDate && (
        <time dateTime={item.publishDate}>
            {new Date(item.publishDate).toLocaleDateString('pt-BR')}
        </time>
        )}
    </div>
);

// Item individual do banner
const FeaturedBannerItem: React.FC<{
    item: FeaturedItem;
    layout: 'hero' | 'grid' | 'stack' | 'minimal';
    showMeta: boolean;
    onClick?: () => void;
    }> = ({ item, layout, showMeta, onClick }) => {
    const handleClick = () => {
        onClick?.();
        item.ctaAction?.();
    };

    const content = (
        <div 
        className={`
            group 
            cursor-pointer 
            transition-all 
            duration-300 
            ease-out
            ${layout === 'hero' 
            ? 'relative overflow-hidden bg-white border border-gray-200 hover:border-gray-900' 
            : layout === 'grid'
            ? 'bg-white border border-gray-200 hover:border-gray-900 hover:shadow-sm p-6'
            : layout === 'stack'
            ? 'bg-white border-l-2 border-l-gray-200 hover:border-l-gray-900 pl-6 py-4'
            : 'border-b border-gray-200 hover:border-gray-400 pb-4'
            }
        `}
        onClick={handleClick}
        >
        {/* Layout Hero */}
        {layout === 'hero' && (
            <>
            {/* Imagem de fundo */}
            {item.imageUrl && (
                <div className="absolute inset-0">
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-white bg-opacity-90 group-hover:bg-opacity-80 transition-all duration-300" />
                </div>
            )}
            
            {/* Conteúdo */}
            <div className="relative z-10 p-8 md:p-12 lg:p-16 min-h-[400px] flex flex-col justify-center">
                {item.badge && (
                <div className="mb-4">
                    <Badge text={item.badge} variant={item.priority === 'high' ? 'priority' : 'default'} />
                </div>
                )}
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 tracking-tight">
                {item.title}
                </h1>
                
                {item.subtitle && (
                <p className="text-xl md:text-2xl text-gray-600 mb-6 font-light">
                    {item.subtitle}
                </p>
                )}
                
                <p className="text-gray-700 mb-8 max-w-2xl leading-relaxed">
                {item.description}
                </p>
                
                {showMeta && <ItemMeta item={item} />}
            </div>
            </>
        )}

        {/* Layout Grid */}
        {layout === 'grid' && (
            <>
            {item.imageUrl && (
                <div className="mb-4">
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                </div>
            )}
            
            {item.badge && (
                <div className="mb-3">
                <Badge text={item.badge} variant={item.priority === 'high' ? 'priority' : 'default'} />
                </div>
            )}
            
            <h3 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-black transition-colors duration-300">
                {item.title}
            </h3>
            
            {item.subtitle && (
                <p className="text-gray-600 mb-3 font-light">
                {item.subtitle}
                </p>
            )}
            
            <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                {item.description}
            </p>
            
            {item.tags && item.tags.length > 0 && (
                <div className="mb-4">
                <TagList tags={item.tags} />
                </div>
            )}
            
            {showMeta && <ItemMeta item={item} />}
            </>
        )}

        {/* Layout Stack */}
        {layout === 'stack' && (
            <div className="flex items-start gap-4">
            {item.imageUrl && (
                <div className="flex-shrink-0">
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                </div>
            )}
            
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                {item.badge && (
                    <Badge text={item.badge} variant={item.priority === 'high' ? 'priority' : 'default'} />
                )}
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-1 group-hover:text-black transition-colors duration-300">
                {item.title}
                </h3>
                
                <p className="text-gray-700 text-sm mb-2 leading-relaxed">
                {item.description}
                </p>
                
                {showMeta && <ItemMeta item={item} />}
            </div>
            </div>
        )}

        {/* Layout Minimal */}
        {layout === 'minimal' && (
            <div className="py-2">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                <h3 className="text-base font-medium text-gray-900 group-hover:text-black transition-colors duration-300">
                    {item.title}
                </h3>
                {item.subtitle && (
                    <p className="text-sm text-gray-600 mt-1">
                    {item.subtitle}
                    </p>
                )}
                </div>
                
                {item.badge && (
                <Badge text={item.badge} variant={item.priority === 'high' ? 'priority' : 'default'} />
                )}
            </div>
            </div>
        )}

        {/* CTA Button (todos os layouts exceto minimal) */}
        {item.ctaText && layout !== 'minimal' && (
            <div className={`${layout === 'hero' ? 'relative z-10' : 'mt-4'}`}>
            <span className="
                inline-flex 
                items-center 
                gap-2 
                text-gray-900 
                hover:text-black 
                transition-colors 
                duration-300
                font-medium
                group-hover:gap-3
            ">
                {item.ctaText}
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="butt" strokeLinejoin="miter" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </span>
            </div>
        )}
        </div>
    );

    // Envolver com Link se ctaPath estiver presente
    if (item.ctaPath) {
        return (
        <Link to={item.ctaPath}>
            {content}
        </Link>
        );
    }

    return content;
};

// Componente principal
export const FeaturedBanner: React.FC<FeaturedBannerProps> = ({
    items,
    title,
    className = "",
    layout = 'hero',
    autoRotate = false,
    rotateInterval = 8000,
    showNavigation = true,
    showMeta = true,
    maxItems,
    onItemClick
    }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isRotating, setIsRotating] = useState(autoRotate);

    // Limitar itens se maxItems for especificado
    const displayItems = maxItems ? items.slice(0, maxItems) : items;

    // Auto-rotate para layout hero
    useEffect(() => {
        if (!isRotating || layout !== 'hero' || displayItems.length <= 1) return;

        const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % displayItems.length);
        }, rotateInterval);

        return () => clearInterval(interval);
    }, [isRotating, layout, displayItems.length, rotateInterval]);

    const handleItemClick = (item: FeaturedItem) => {
        onItemClick?.(item);
    };

    const toggleRotation = () => {
        setIsRotating(!isRotating);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    if (!displayItems || displayItems.length === 0) {
        return (
        <div className={`text-center py-12 ${className}`}>
            <p className="text-gray-500">Nenhum item em destaque disponível</p>
        </div>
        );
    }

    return (
        <section className={`w-full ${className}`}>
        {/* Header */}
        {title && layout !== 'hero' && (
            <div className="flex items-center justify-between mb-8">
            <h2 className="
                text-2xl 
                md:text-3xl 
                font-light 
                text-gray-900 
                tracking-tight
            ">
                {title}
            </h2>
            
            {autoRotate && layout === 'grid' && displayItems.length > 1 && (
                <button
                onClick={toggleRotation}
                className="
                    text-gray-500 
                    hover:text-gray-900 
                    transition-colors 
                    duration-300
                    p-2
                "
                aria-label={isRotating ? 'Pausar rotação' : 'Iniciar rotação'}
                >
                {isRotating ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                    </svg>
                )}
                </button>
            )}
            </div>
        )}

        {/* Layout Hero - Carousel */}
        {layout === 'hero' && (
            <div className="relative">
            <FeaturedBannerItem
                item={displayItems[currentIndex]}
                layout={layout}
                showMeta={showMeta}
                onClick={() => handleItemClick(displayItems[currentIndex])}
            />
            
            {/* Navegação */}
            {showNavigation && displayItems.length > 1 && (
                <>
                {/* Controles */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                    {autoRotate && (
                    <button
                        onClick={toggleRotation}
                        className="
                        w-10 
                        h-10 
                        bg-white 
                        bg-opacity-90 
                        hover:bg-opacity-100 
                        border 
                        border-gray-200 
                        flex 
                        items-center 
                        justify-center
                        transition-all 
                        duration-300
                        "
                        aria-label={isRotating ? 'Pausar' : 'Reproduzir'}
                    >
                        {isRotating ? (
                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                        ) : (
                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        )}
                    </button>
                    )}
                </div>

                {/* Paginação */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                    {displayItems.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`
                        w-2 
                        h-2 
                        transition-all 
                        duration-300
                        ${currentIndex === index 
                            ? 'bg-gray-900 w-8' 
                            : 'bg-gray-400 hover:bg-gray-600'
                        }
                        `}
                        aria-label={`Ir para slide ${index + 1}`}
                    />
                    ))}
                </div>
                </>
            )}
            </div>
        )}

        {/* Layout Grid */}
        {layout === 'grid' && (
            <div className="
            grid 
            grid-cols-1 
            md:grid-cols-2 
            lg:grid-cols-3 
            gap-6
            ">
            {displayItems.map((item) => (
                <FeaturedBannerItem
                key={item.id}
                item={item}
                layout={layout}
                showMeta={showMeta}
                onClick={() => handleItemClick(item)}
                />
            ))}
            </div>
        )}

        {/* Layout Stack */}
        {layout === 'stack' && (
            <div className="space-y-6">
            {displayItems.map((item) => (
                <FeaturedBannerItem
                key={item.id}
                item={item}
                layout={layout}
                showMeta={showMeta}
                onClick={() => handleItemClick(item)}
                />
            ))}
            </div>
        )}

        {/* Layout Minimal */}
        {layout === 'minimal' && (
            <div className="space-y-4">
            {displayItems.map((item) => (
                <FeaturedBannerItem
                key={item.id}
                item={item}
                layout={layout}
                showMeta={showMeta}
                onClick={() => handleItemClick(item)}
                />
            ))}
            </div>
        )}
        </section>
    );
};

export default FeaturedBanner;