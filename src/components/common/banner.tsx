
import type React from "react"
import { useState, useEffect } from "react"
import { ArrowRight, Play, Pause, Calendar, User } from "lucide-react"

// Tipagem para um item em destaque
export interface FeaturedItem {
    id: string
    title: string
    subtitle?: string
    description: string
    imageUrl?: string
    videoUrl?: string
    ctaText?: string
    ctaPath?: string
    ctaAction?: () => void
    badge?: string
    tags?: string[]
    priority?: "high" | "medium" | "low"
    publishDate?: string
    author?: {
        name: string
        avatar?: string
    }
}

// Props do componente
export interface FeaturedBannerProps {
    items: FeaturedItem[]
    title?: string
    className?: string
    layout?: "hero" | "grid" | "stack" | "minimal"
    autoRotate?: boolean
    rotateInterval?: number
    showNavigation?: boolean
    showMeta?: boolean
    maxItems?: number
    onItemClick?: (item: FeaturedItem) => void
    }

    // Mock Link component - replace with your actual router Link
    const Link: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
    <a
        href={to}
        onClick={(e) => {
        e.preventDefault()
        console.log("Navigate to:", to)
        }}
    >
        {children}
    </a>
    )

    // Componente de badge
    const Badge: React.FC<{ text: string; variant?: "default" | "priority" }> = ({ text, variant = "default" }) => (
    <span
        className={`inline-block px-3 py-1 text-xs font-light tracking-wide uppercase border ${
        variant === "priority" ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-200"
        }`}
    >
        {text}
    </span>
    )

    // Componente de tags
    const TagList: React.FC<{ tags: string[] }> = ({ tags }) => (
    <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
        <span
            key={index}
            className="text-xs font-light text-gray-600 px-2 py-1 border border-gray-200 hover:border-gray-400 transition-colors duration-300"
        >
            {tag}
        </span>
        ))}
    </div>
    )

    // Componente de meta informações
    const ItemMeta: React.FC<{ item: FeaturedItem }> = ({ item }) => (
    <div className="flex items-center gap-4 text-xs font-light text-gray-500">
        {item.author && (
        <div className="flex items-center gap-2">
            {item.author.avatar ? (
            <div className="w-4 h-4 border border-gray-200 overflow-hidden">
                <img
                src={item.author.avatar || "/placeholder.svg"}
                alt={item.author.name}
                className="w-full h-full object-cover filter grayscale"
                />
            </div>
            ) : (
            <div className="w-4 h-4 border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-600 text-xs">
                <User size={8} />
            </div>
            )}
            <span>{item.author.name}</span>
        </div>
        )}
        {item.publishDate && (
        <div className="flex items-center gap-1">
            <Calendar size={10} />
            <time dateTime={item.publishDate}>{new Date(item.publishDate).toLocaleDateString("pt-BR")}</time>
        </div>
        )}
    </div>
    )

    // Item individual do banner
    const FeaturedBannerItem: React.FC<{
    item: FeaturedItem
    layout: "hero" | "grid" | "stack" | "minimal"
    showMeta: boolean
    onClick?: () => void
    }> = ({ item, layout, showMeta, onClick }) => {
    const handleClick = () => {
        onClick?.()
        item.ctaAction?.()
    }

    const content = (
        <div
        className={`group cursor-pointer transition-all duration-300 ease-out ${
            layout === "hero"
            ? "relative overflow-hidden bg-white border border-gray-200 hover:border-black"
            : layout === "grid"
                ? "bg-white border border-gray-200 hover:border-black p-8 h-full flex flex-col"
                : layout === "stack"
                ? "bg-white border-l border-l-gray-200 hover:border-l-black pl-6 py-6"
                : "border-b border-gray-200 hover:border-gray-400 pb-4"
        }`}
        onClick={handleClick}
        >
        {/* Layout Hero */}
        {layout === "hero" && (
            <>
            {/* Imagem de fundo */}
            {item.imageUrl && (
                <div className="absolute inset-0">
                <img
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-white bg-opacity-90 group-hover:bg-opacity-80 transition-all duration-300" />
                </div>
            )}

            {/* Conteúdo */}
            <div className="relative z-10 p-8 md:p-12 lg:p-16 min-h-[500px] flex flex-col justify-center">
                {item.badge && (
                <div className="mb-6">
                    <Badge text={item.badge} variant={item.priority === "high" ? "priority" : "default"} />
                </div>
                )}

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-6 tracking-wide leading-tight">
                {item.title}
                </h1>

                {item.subtitle && (
                <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light leading-relaxed">{item.subtitle}</p>
                )}

                <p className="text-gray-700 mb-8 max-w-2xl leading-relaxed font-light">{item.description}</p>

                {showMeta && (
                <div className="mb-6">
                    <ItemMeta item={item} />
                </div>
                )}
            </div>
            </>
        )}

        {/* Layout Grid */}
        {layout === "grid" && (
            <>
            {item.imageUrl && (
                <div className="mb-6 border border-gray-200">
                <img
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-48 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                </div>
            )}

            {item.badge && (
                <div className="mb-4">
                <Badge text={item.badge} variant={item.priority === "high" ? "priority" : "default"} />
                </div>
            )}

            <h3 className="text-xl font-light text-black mb-3 group-hover:text-black transition-colors duration-300 leading-tight">
                {item.title}
            </h3>

            {item.subtitle && <p className="text-gray-600 mb-4 font-light leading-relaxed">{item.subtitle}</p>}

            <p className="text-gray-700 text-sm mb-6 leading-relaxed font-light flex-1">{item.description}</p>

            {item.tags && item.tags.length > 0 && (
                <div className="mb-6">
                <TagList tags={item.tags} />
                </div>
            )}

            {showMeta && (
                <div className="mt-auto">
                <ItemMeta item={item} />
                </div>
            )}
            </>
        )}

        {/* Layout Stack */}
        {layout === "stack" && (
            <div className="flex items-start gap-6">
            {item.imageUrl && (
                <div className="flex-shrink-0">
                <div className="w-16 h-16 border border-gray-200">
                    <img
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                </div>
                </div>
            )}

            <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                {item.badge && <Badge text={item.badge} variant={item.priority === "high" ? "priority" : "default"} />}
                </div>

                <h3 className="text-lg font-light text-black mb-2 group-hover:text-black transition-colors duration-300 leading-tight">
                {item.title}
                </h3>

                <p className="text-gray-700 text-sm mb-3 leading-relaxed font-light">{item.description}</p>

                {showMeta && <ItemMeta item={item} />}
            </div>
            </div>
        )}

        {/* Layout Minimal */}
        {layout === "minimal" && (
            <div className="py-3">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                <h3 className="text-base font-light text-black group-hover:text-black transition-colors duration-300 leading-tight">
                    {item.title}
                </h3>
                {item.subtitle && <p className="text-sm text-gray-600 mt-1 font-light">{item.subtitle}</p>}
                </div>

                {item.badge && <Badge text={item.badge} variant={item.priority === "high" ? "priority" : "default"} />}
            </div>
            </div>
        )}

        {/* CTA Button (todos os layouts exceto minimal) */}
        {item.ctaText && layout !== "minimal" && (
            <div className={`${layout === "hero" ? "relative z-10" : "mt-6"}`}>
            <span className="inline-flex items-center gap-2 text-black hover:text-gray-700 transition-colors duration-300 font-light group-hover:gap-3">
                {item.ctaText}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 stroke-1" />
            </span>
            </div>
        )}
        </div>
    )

    // Envolver com Link se ctaPath estiver presente
    if (item.ctaPath) {
        return <Link to={item.ctaPath}>{content}</Link>
    }

    return content
}

export const FeaturedBanner: React.FC<FeaturedBannerProps> = ({
    items,
    title,
    className = "",
    layout = "hero",
    autoRotate = false,
    rotateInterval = 8000,
    showNavigation = true,
    showMeta = true,
    maxItems,
    onItemClick,
    }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isRotating, setIsRotating] = useState(autoRotate)

    // Limitar itens se maxItems for especificado
    const displayItems = maxItems ? items.slice(0, maxItems) : items

    // Auto-rotate para layout hero
    useEffect(() => {
        if (!isRotating || layout !== "hero" || displayItems.length <= 1) return

        const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % displayItems.length)
        }, rotateInterval)

        return () => clearInterval(interval)
    }, [isRotating, layout, displayItems.length, rotateInterval])

    const handleItemClick = (item: FeaturedItem) => {
        onItemClick?.(item)
    }

    const toggleRotation = () => {
        setIsRotating(!isRotating)
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }


    if (!displayItems || displayItems.length === 0) {
        return (
        <div className={`text-center py-16 ${className}`}>
            <div className="max-w-md mx-auto">
            <div className="w-16 h-16 border border-gray-200 bg-gray-50 mx-auto mb-4 flex items-center justify-center">
                <ArrowRight size={24} className="text-gray-300 stroke-1" />
            </div>
            <p className="text-gray-500 font-light">Nenhum item em destaque disponível</p>
            </div>
        </div>
        )
    }

    return (
        <section className={`w-full ${className}`}>
        {/* Header */}
        {title && layout !== "hero" && (
            <div className="flex items-center justify-center text-center mb-12">
            <div className="flex flex-col items-center justify-center text-center ">
                <h2 className="text-3xl md:text-4xl font-light text-black tracking-wide mb-4">{title}</h2>
                <div className="w-20 h-px bg-black"></div>
            </div>

            {autoRotate && layout === "grid" && displayItems.length > 1 && (
                <button
                onClick={toggleRotation}
                className="w-10 h-10 border border-gray-200 hover:border-black transition-colors duration-300 flex items-center justify-center"
                aria-label={isRotating ? "Pausar rotação" : "Iniciar rotação"}
                >
                {isRotating ? <Pause size={16} className="stroke-1" /> : <Play size={16} className="stroke-1" />}
                </button>
            )}
            </div>
        )}

        {/* Layout Hero - Carousel */}
        {layout === "hero" && (
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
                <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
                    {autoRotate && (
                    <button
                        onClick={toggleRotation}
                        className="w-10 h-10 bg-white bg-opacity-90 hover:bg-opacity-100 border border-gray-200 hover:border-black flex items-center justify-center transition-all duration-300"
                        aria-label={isRotating ? "Pausar" : "Reproduzir"}
                    >
                        {isRotating ? <Pause size={16} className="stroke-1" /> : <Play size={16} className="stroke-1" />}
                    </button>
                    )}
                </div>

                {/* Paginação */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                    {displayItems.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-px transition-all duration-300 ${
                        currentIndex === index ? "bg-black w-8" : "bg-gray-400 hover:bg-gray-600 w-2"
                        }`}
                        aria-label={`Ir para slide ${index + 1}`}
                    />
                    ))}
                </div>
                </>
            )}
            </div>
        )}

        {/* Layout Grid */}
        {layout === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        {layout === "stack" && (
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
        {layout === "minimal" && (
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
    )
}
