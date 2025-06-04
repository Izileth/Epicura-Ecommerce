import React from 'react';
import { Partners } from '@/data/partners';
export interface Partner {
    id: string;
    name: string;
    logo: string;
    description?: string;
}

interface PartnersSectionProps {
    title?: string;
    subtitle?: string;
    partners?: Partner[];
    className?: string;
}



const PartnersSelector: React.FC<PartnersSectionProps> = ({
    title = "Nossos Parceiros",
    subtitle = "Reconhecidos pelas principais instituições gastronômicas mundiais",
    partners = Partners,
    className = ""
    }) => {
    return (
        <section className={`py-16 md:py-24 bg-white ${className}`}>
        <div className="max-w-full text-left mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-left flex flex-col items-start mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-wide">
                {title}
            </h2>
            <div className="w-12 h-px bg-gray-900  mb-6"></div>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl  leading-relaxed">
                {subtitle}
            </p>
            </div>

            {/* Partners Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center">
            {partners.map((partner) => (
                <div
                key={partner.id}
                className="group relative flex flex-col items-center justify-center p-4 md:p-6 transition-all duration-300 hover:scale-105"
                >
                {/* Logo Container */}
                <div className="relative w-full h-16 md:h-20 flex items-center justify-center mb-3 md:mb-4">
                    <img
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    className="max-w-full max-h-full object-contain filter grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                </div>

                {/* Partner Name */}
                <h3 className="text-xs md:text-sm font-medium text-gray-700 text-center mb-1 group-hover:text-gray-900 transition-colors duration-300">
                    {partner.name}
                </h3>

                {/* Description */}
                {partner.description && (
                    <p className="text-xs text-gray-500 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {partner.description}
                    </p>
                )}

                {/* Hover Line */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-px bg-gray-900 transition-all duration-300 group-hover:w-8"></div>
                </div>
            ))}
            </div>

            {/* Bottom Text */}
            <div className="text-center mt-12 md:mt-16">
            <p className="text-xs md:text-sm text-gray-500 tracking-wider uppercase">
                Certificados de Excelência
            </p>
            </div>
        </div>
        </section>
    );
};

export default PartnersSelector;