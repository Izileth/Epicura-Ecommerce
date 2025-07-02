
interface HeadingProps {
    title: string
    subtitle?: string
    className?: string
}

export function Heading({ title, subtitle, className }: HeadingProps) {
    return (
        <div className={className}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-4">{title}</h1>
        {subtitle && <p className="text-lg md:text-xl text-gray-600 font-light tracking-wide">{subtitle}</p>}
        </div>
    )
}
