
import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Play, Pause, Star } from "lucide-react"

// Tipagem para um testemunho
export interface Testimonial {
    id: string
    name: string
    role?: string
    company?: string
    content: string
    avatar?: string
    rating?: number // 1-5 estrelas
    date?: string
}

// Props do componente
export interface TestimonialCarouselProps {
    testimonials: Testimonial[]
    title?: string
    className?: string
    autoPlay?: boolean
    autoPlayInterval?: number // em millisegundos
    showNavigation?: boolean
    showPagination?: boolean
    itemsPerView?: {
        mobile: number
        tablet: number
        desktop: number
    }
    onTestimonialSelect?: (testimonial: Testimonial) => void
}

// Componente de estrelas para rating
const StarRating: React.FC<{ rating: number; className?: string }> = ({ rating, className = "w-4 h-4" }) => {
    return (
        <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
            <Star
            key={star}
            size={16}
            className={`${star <= rating ? "text-black fill-black" : "text-gray-300"} stroke-1`}
            />
        ))}
        </div>
    )
}

// Avatar padrão
const DefaultAvatar: React.FC<{ name: string; className?: string }> = ({ name, className = "w-12 h-12" }) => {
    const initials = name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2)

    return (
        <div
        className={`${className} border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-600 font-light text-sm`}
        >
        {initials}
        </div>
    )
}

// Item individual de testemunho
const TestimonialItem: React.FC<{
    testimonial: Testimonial
    isActive?: boolean
    onClick?: () => void
    }> = ({ testimonial, isActive = false, onClick }) => {
    return (
        <div
        className={`bg-white border transition-all duration-300 ease-out cursor-pointer p-8 h-full flex flex-col ${
            isActive ? "border-black" : "border-gray-200 hover:border-gray-400"
        }`}
        onClick={onClick}
        >
        {/* Rating */}
        {testimonial.rating && (
            <div className="mb-6 text-center flex justify-center items-center">
            <StarRating rating={testimonial.rating} />
            </div>
        )}

        {/* Conteúdo do testemunho */}
        <blockquote className="flex-1 mb-8">
            <p className="text-gray-700 leading-relaxed text-base font-light">"{testimonial.content}"</p>
        </blockquote>

        {/* Informações do autor */}
        <div className="flex items-center gap-4 mt-auto">
            {/* Avatar */}
            <div className="flex-shrink-0">
            {testimonial.avatar ? (
                <div className="w-12 h-12 border border-gray-200 overflow-hidden">
                <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-full h-full object-cover filter grayscale"
                />
                </div>
            ) : (
                <DefaultAvatar name={testimonial.name} />
            )}
            </div>

            {/* Informações textuais */}
            <div className="flex-1 min-w-0">
            <p className="text-black font-light text-sm truncate">{testimonial.name}</p>
            {testimonial.role && (
                <p className="text-gray-500 text-xs font-light truncate">
                {testimonial.role}
                {testimonial.company && ` • ${testimonial.company}`}
                </p>
            )}
            {testimonial.date && <p className="text-gray-400 text-xs font-light mt-1">{testimonial.date}</p>}
            </div>
        </div>
        </div>
    )
    }

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
    onTestimonialSelect,
    }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(autoPlay)

    // Cálculo de itens por view baseado no breakpoint
    const getItemsPerView = useCallback(() => {
        if (typeof window === "undefined") return itemsPerView.desktop

        const width = window.innerWidth
        if (width < 640) return itemsPerView.mobile
        if (width < 1024) return itemsPerView.tablet
        return itemsPerView.desktop
    }, [itemsPerView])

    const [currentItemsPerView, setCurrentItemsPerView] = useState(getItemsPerView)

    // Atualizar itens por view no resize
    useEffect(() => {
        const handleResize = () => {
        setCurrentItemsPerView(getItemsPerView())
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [getItemsPerView])

    // Total de páginas
    const totalPages = Math.ceil(testimonials.length / currentItemsPerView)

    // Auto-play
    useEffect(() => {
        if (!isPlaying || totalPages <= 1) return

        const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalPages)
        }, autoPlayInterval)

        return () => clearInterval(interval)
    }, [isPlaying, totalPages, autoPlayInterval])

    // Navegação
    const goToSlide = (index: number) => {
        setCurrentIndex(Math.max(0, Math.min(index, totalPages - 1)))
    }

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalPages)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
    }

    // Pausar/continuar auto-play
    const togglePlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    

    if (!testimonials || testimonials.length === 0) {
        return (
        <div className={`text-center py-16 ${className}`}>
            <div className="max-w-md mx-auto">
            <Star size={48} className="mx-auto mb-4 text-gray-300 stroke-1" />
            <p className="text-gray-500 font-light">Nenhum testemunho disponível</p>
            </div>
        </div>
        )
    }

    // Testemunhos visíveis na página atual
    const startIndex = currentIndex * currentItemsPerView
    const visibleTestimonials = testimonials.slice(startIndex, startIndex + currentItemsPerView)

    return (
        <section className={`w-full ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-center mb-12">
            {title && (
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-3xl md:text-4xl font-light text-black tracking-wide mb-4">{title}</h2>
                <div className="w-16 h-px bg-black"></div>
            </div>
            )}
            
        </div>
        <div className="flex items-center justify-center gap-4 mb-4">
            {/* Controles do auto-play */}
            {autoPlay && totalPages > 1 && (
                <button
                    onClick={togglePlayPause}
                    className="w-10 h-10 border border-gray-200 hover:border-black transition-colors duration-300 flex items-center justify-center"
                    aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                >
                    {isPlaying ? <Pause size={16} className="stroke-1" /> : <Play size={16} className="stroke-1" />}
                </button>
                )}
        </div>

        {/* Carousel */}
        <div className="relative">
            {/* Grid de testemunhos */}
            <div
            className="grid gap-6 transition-all duration-500 ease-out"
            style={{
                gridTemplateColumns: `repeat(${currentItemsPerView}, 1fr)`,
            }}
            >
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
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white border border-gray-200 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                aria-label="Anterior"
                >
                <ChevronLeft size={16} className="stroke-1" />
                </button>

                <button
                onClick={nextSlide}
                disabled={currentIndex === totalPages - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white border border-gray-200 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                aria-label="Próximo"
                >
                <ChevronRight size={16} className="stroke-1" />
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
                className={`h-px transition-all duration-300 ${
                    currentIndex === index ? "bg-black w-8" : "bg-gray-300 hover:bg-gray-500 w-2"
                }`}
                aria-label={`Ir para página ${index + 1}`}
                />
            ))}
            </div>
        )}

        {/* Indicador de progresso */}
        {autoPlay && isPlaying && totalPages > 1 && (
            <div className="w-full bg-gray-200 h-px mt-6">
            <div
                className="bg-black h-full transition-all duration-100 ease-linear"
                style={{
                width: `${((currentIndex + 1) / totalPages) * 100}%`,
                }}
            />
            </div>
        )}

        
        

        </section>
    )
}
