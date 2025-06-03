import React, { useState, useEffect, useCallback } from 'react';

// Tipagem para um testemunho
export interface Testimonial {
    id: string;
    name: string;
    role?: string;
    company?: string;
    content: string;
    avatar?: string;
    rating?: number; // 1-5 estrelas
    date?: string;
}

// Props do componente
export interface TestimonialCarouselProps {
    testimonials: Testimonial[];
    title?: string;
    className?: string;
    autoPlay?: boolean;
    autoPlayInterval?: number; // em millisegundos
    showNavigation?: boolean;
    showPagination?: boolean;
    itemsPerView?: {
        mobile: number;
        tablet: number;
        desktop: number;
    };
    onTestimonialSelect?: (testimonial: Testimonial) => void;
}

// Componente de estrelas para rating
const StarRating: React.FC<{ rating: number; className?: string }> = ({ 
    rating, 
    className = "w-4 h-4" 
    }) => {
    return (
        <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
            <svg
            key={star}
            className={`${className} ${
                star <= rating ? 'text-gray-900' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
            >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        ))}
        </div>
    );
};

// Avatar padrão
const DefaultAvatar: React.FC<{ name: string; className?: string }> = ({ 
    name, 
    className = "w-12 h-12" 
    }) => {
    const initials = name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className={`
        ${className} 
        bg-gray-200 
        flex 
        items-center 
        justify-center 
        text-gray-600 
        font-medium 
        text-sm
        `}>
        {initials}
        </div>
    );
};

// Item individual de testemunho
const TestimonialItem: React.FC<{
    testimonial: Testimonial;
    isActive?: boolean;
    onClick?: () => void;
    }> = ({ testimonial, isActive = false, onClick }) => {
    return (
        <div
        className={`
            bg-white 
            border 
            border-gray-200 
            p-6 
            h-full 
            flex 
            flex-col 
            transition-all 
            duration-300 
            ease-out
            cursor-pointer
            ${isActive ? 'border-gray-900 shadow-sm' : 'hover:border-gray-400'}
        `}
        onClick={onClick}
        >
        {/* Rating */}
        {testimonial.rating && (
            <div className="mb-4">
            <StarRating rating={testimonial.rating} />
            </div>
        )}

        {/* Conteúdo do testemunho */}
        <blockquote className="flex-1 mb-6">
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            "{testimonial.content}"
            </p>
        </blockquote>

        {/* Informações do autor */}
        <div className="flex items-center gap-3 mt-auto">
            {/* Avatar */}
            <div className="flex-shrink-0">
            {testimonial.avatar ? (
                <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 object-cover filter grayscale"
                />
            ) : (
                <DefaultAvatar name={testimonial.name} />
            )}
            </div>

            {/* Informações textuais */}
            <div className="flex-1 min-w-0">
            <p className="text-gray-900 font-medium text-sm truncate">
                {testimonial.name}
            </p>
            {testimonial.role && (
                <p className="text-gray-500 text-xs truncate">
                {testimonial.role}
                {testimonial.company && ` • ${testimonial.company}`}
                </p>
            )}
            {testimonial.date && (
                <p className="text-gray-400 text-xs mt-1">
                {testimonial.date}
                </p>
            )}
            </div>
        </div>
        </div>
    );
};

// Componente principal
export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
    testimonials,
    title,
    className = "",
    autoPlay = false,
    autoPlayInterval = 5000,
    showNavigation = true,
    showPagination = true,
    itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
    onTestimonialSelect
    }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoPlay);

    // Cálculo de itens por view baseado no breakpoint
    const getItemsPerView = useCallback(() => {
        if (typeof window === 'undefined') return itemsPerView.desktop;
        
        const width = window.innerWidth;
        if (width < 640) return itemsPerView.mobile;
        if (width < 1024) return itemsPerView.tablet;
        return itemsPerView.desktop;
    }, [itemsPerView]);

    const [currentItemsPerView, setCurrentItemsPerView] = useState(getItemsPerView);

    // Atualizar itens por view no resize
    useEffect(() => {
        const handleResize = () => {
        setCurrentItemsPerView(getItemsPerView());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [getItemsPerView]);

    // Total de páginas
    const totalPages = Math.ceil(testimonials.length / currentItemsPerView);
    
    // Auto-play
    useEffect(() => {
        if (!isPlaying || totalPages <= 1) return;

        const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % totalPages);
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [isPlaying, totalPages, autoPlayInterval]);

    // Navegação
    const goToSlide = (index: number) => {
        setCurrentIndex(Math.max(0, Math.min(index, totalPages - 1)));
    };

    const nextSlide = () => {
        setCurrentIndex(prev => (prev + 1) % totalPages);
    };

    const prevSlide = () => {
        setCurrentIndex(prev => (prev - 1 + totalPages) % totalPages);
    };

    // Pausar/continuar auto-play
    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    if (!testimonials || testimonials.length === 0) {
        return (
        <div className={`text-center py-12 ${className}`}>
            <p className="text-gray-500">Nenhum testemunho disponível</p>
        </div>
        );
    }

    // Testemunhos visíveis na página atual
    const startIndex = currentIndex * currentItemsPerView;
    const visibleTestimonials = testimonials.slice(
        startIndex, 
        startIndex + currentItemsPerView
    );

    return (
        <section className={`w-full ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            {title && (
            <h2 className="
                text-2xl 
                md:text-3xl 
                font-light 
                text-center
                text-gray-900 
                tracking-tight
            ">
                {title}
            </h2>
            )}

            {/* Controles do auto-play */}
            {autoPlay && totalPages > 1 && (
            <button
                onClick={togglePlayPause}
                className="
                text-gray-500 
                hover:text-gray-900 
                transition-colors 
                duration-300
                p-2
                "
                aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
            >
                {isPlaying ? (
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

        {/* Carousel */}
        <div className="relative">
            {/* Grid de testemunhos */}
            <div className="
            grid 
            gap-6 
            transition-all 
            duration-500 
            ease-out
            "
            style={{
            gridTemplateColumns: `repeat(${currentItemsPerView}, 1fr)`
            }}>
            {visibleTestimonials.map((testimonial) => (
                <TestimonialItem
                key={testimonial.id}
                testimonial={testimonial}
                onClick={() => onTestimonialSelect?.(testimonial)}
                />
            ))}
            </div>

            {/* Navegação com setas */}
            {showNavigation && totalPages > 1 && (
            <>
                <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="
                    absolute 
                    left-0 
                    top-1/2 
                    -translate-y-1/2 
                    -translate-x-4
                    w-10 
                    h-10 
                    bg-white 
                    border 
                    border-gray-200 
                    hover:border-gray-900 
                    disabled:opacity-30 
                    disabled:cursor-not-allowed
                    transition-all 
                    duration-300
                    flex 
                    items-center 
                    justify-center
                "
                aria-label="Anterior"
                >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="butt" strokeLinejoin="miter" d="M15 19l-7-7 7-7" />
                </svg>
                </button>

                <button
                onClick={nextSlide}
                disabled={currentIndex === totalPages - 1}
                className="
                    absolute 
                    right-0 
                    top-1/2 
                    -translate-y-1/2 
                    translate-x-4
                    w-10 
                    h-10 
                    bg-white 
                    border 
                    border-gray-200 
                    hover:border-gray-900 
                    disabled:opacity-30 
                    disabled:cursor-not-allowed
                    transition-all 
                    duration-300
                    flex 
                    items-center 
                    justify-center
                "
                aria-label="Próximo"
                >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="butt" strokeLinejoin="miter" d="M9 5l7 7-7 7" />
                </svg>
                </button>
            </>
            )}
        </div>

        {/* Paginação */}
        {showPagination && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, index) => (
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
                    : 'bg-gray-300 hover:bg-gray-500'
                    }
                `}
                aria-label={`Ir para página ${index + 1}`}
                />
            ))}
            </div>
        )}

        {/* Indicador de progresso */}
        {autoPlay && isPlaying && totalPages > 1 && (
            <div className="w-full bg-gray-200 h-1 mt-4">
            <div 
                className="bg-gray-900 h-full transition-all duration-100 ease-linear"
                style={{
                width: `${((currentIndex + 1) / totalPages) * 100}%`
                }}
            />
            </div>
        )}
        </section>
    );
};

export default TestimonialCarousel;