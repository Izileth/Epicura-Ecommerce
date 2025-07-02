import { MotionDiv } from "@/components/template/Motion/container"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChefHat, Home, Utensils } from "lucide-react"

export  function RebootPage() {
    const currentYear = new Date().getFullYear()

    return (
        <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background with subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
            <div className="absolute inset-0 bg-black/30" />

            {/* Geometric accent lines */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />

            <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
            >
            <div className="mb-8">
                <div className="w-24 h-px bg-white/40 mx-auto mb-8" />
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-[0.2em] text-white mb-6 leading-none">
                EPICURA
                </h1>
                <div className="w-24 h-px bg-white/40 mx-auto" />
            </div>

            <p className="text-lg md:text-xl lg:text-2xl font-light text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed tracking-wide">
                Onde os sabores do mundo se encontram com a sofisticação contemporânea
            </p>

            <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
                <Button
                variant="outline"
                className="bg-transparent text-white border border-white/30 hover:bg-white hover:text-black transition-all duration-300 px-8 py-3 text-sm tracking-wider font-light"
                >
                EXPLORE NOSSO MENU
                <ArrowRight className="ml-3 h-4 w-4" />
                </Button>
            </MotionDiv>
            </MotionDiv>
        </section>

        {/* About Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gray-200" />

            <div className="max-w-7xl mx-auto">
            <MotionDiv
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
            >
                <div className="order-2 lg:order-1">
                <div className="border-l border-gray-200 pl-8 md:pl-12">
                    <span className="text-xs uppercase tracking-[0.3em] text-gray-500 font-light">SOBRE NÓS</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight mt-6 mb-8 text-gray-900 leading-tight tracking-tight">
                    Experiências gastronômicas que transcendem
                    </h2>
                    <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p className="text-base md:text-lg font-light">
                        Na Epicura, cada prato é uma jornada. Combinamos técnicas ancestrais com inovação contemporânea para
                        criar experiências que desafiam e encantam o paladar.
                    </p>
                    <p className="text-base md:text-lg font-light">
                        Nossa filosofia transcende a simples alimentação, criando momentos de contemplação e descoberta
                        através da gastronomia de excelência.
                    </p>
                    </div>

                    <div className="mt-10">
                    <Button
                        variant="ghost"
                        className="text-gray-900 border border-gray-300 hover:bg-gray-50 transition-all duration-300 px-8 py-3 text-sm tracking-wider font-light"
                    >
                        CONHEÇA NOSSA HISTÓRIA
                    </Button>
                    </div>
                </div>
                </div>

                <div className="order-1 lg:order-2">
                <div className="relative h-96 md:h-[500px] lg:h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-6 border border-gray-300 rounded-full flex items-center justify-center">
                        <ChefHat className="w-10 h-10 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-light tracking-wide text-sm">Prato signature da Epicura</p>
                    </div>
                    </div>
                    {/* Decorative corner lines */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gray-300" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gray-300" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gray-300" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gray-300" />
                </div>
                </div>
            </MotionDiv>
            </div>
        </section>

        {/* Services Section */}
        <section className="py-32 bg-gray-50 relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gray-200" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gray-200" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionDiv
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <span className="text-xs uppercase tracking-[0.3em] text-gray-500 font-light">NOSSOS SERVIÇOS</span>
                <h2 className="text-4xl md:text-5xl font-extralight mt-6 text-gray-900 leading-tight tracking-tight max-w-4xl mx-auto">
                Mais que um restaurante, uma experiência completa
                </h2>
                <div className="w-24 h-px bg-gray-300 mx-auto mt-8" />
            </MotionDiv>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {[
                {
                    title: "Jantares Temáticos",
                    description:
                    "Eventos mensais que exploram a culinária de diferentes regiões com menus exclusivos criados especialmente para cada ocasião.",
                    icon: Utensils,
                },
                {
                    title: "Chef à Domicílio",
                    description:
                    "Nossos chefs preparam uma experiência Epicura exclusiva na comodidade da sua casa, com todo o requinte do restaurante.",
                    icon: Home,
                },
                {
                    title: "Workshops Culinários",
                    description:
                    "Aprenda as técnicas por trás de nossos pratos mais icônicos em aulas intimistas com nossos chefs especialistas.",
                    icon: ChefHat,
                },
                ].map((service, index) => (
                <MotionDiv
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="group"
                >
                    <div className="bg-white border border-gray-200 p-8 lg:p-10 h-full transition-all duration-300 hover:border-gray-400 hover:shadow-sm">
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-6 border border-gray-200 rounded-full flex items-center justify-center group-hover:border-gray-400 transition-colors duration-300">
                        <service.icon className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-extralight mb-4 text-gray-900 tracking-wide">
                        {service.title}
                        </h3>
                        <div className="w-12 h-px bg-gray-200 mx-auto mb-6 group-hover:bg-gray-400 transition-colors duration-300" />
                        <p className="text-gray-600 font-light leading-relaxed text-sm md:text-base">
                        {service.description}
                        </p>
                    </div>
                    </div>
                </MotionDiv>
                ))}
            </div>
            </div>
        </section>

        {/* CTA Reservations Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white relative overflow-hidden">
            {/* Geometric background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="max-w-5xl mx-auto text-center relative z-10">
            <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
            >
                <div className="mb-8">
                <div className="w-24 h-px bg-white/40 mx-auto mb-8" />
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-8 leading-tight tracking-tight">
                    Prepare-se para uma jornada sensorial
                </h2>
                <div className="w-24 h-px bg-white/40 mx-auto" />
                </div>

                <p className="text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed text-base md:text-lg">
                Reservas com pelo menos 48 horas de antecedência para garantir a melhor experiência. Cada mesa é
                cuidadosamente preparada para proporcionar momentos inesquecíveis.
                </p>

                <Button className="bg-white text-black hover:bg-gray-100 transition-all duration-300 px-10 py-4 text-sm tracking-wider font-light">
                RESERVAR MESA
                </Button>
            </MotionDiv>
            </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
                <div className="text-center lg:text-left">
                <h3 className="text-2xl font-extralight tracking-[0.2em] text-gray-900 mb-2">EPICURA</h3>
                <p className="text-gray-600 font-light tracking-wide text-sm">
                    © {currentYear} Epicura. Todos os direitos reservados.
                </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm">
                <span className="text-gray-500 font-light tracking-wide">Experiência gastronômica excepcional</span>
                <div className="hidden sm:block w-px h-4 bg-gray-300" />
                <span className="text-gray-500 font-light tracking-wide">Reservas: +55 (11) 9999-9999</span>
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex justify-center">
                <div className="w-16 h-px bg-gray-300" />
                </div>
            </div>
            </div>
        </footer>
        </div>
    )
}
