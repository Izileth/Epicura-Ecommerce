import { MotionDiv } from "@/components/template/Motion/container"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

export function AboutPage() {
    const currentYear = new Date().getFullYear()

    return (
        <div className="min-h-screen bg-white">
        {/* Main Content */}
        <div className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
            {/* Header Section */}
            <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-20 text-center"
            >
                <Heading title="Nossa História" subtitle="A jornada do sabor que transcende fronteiras" className="mb-8" />
                <Separator className="mx-auto w-24 h-px bg-gray-300" />
            </MotionDiv>

            {/* Origins Section */}
            <MotionDiv
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-24"
            >
                <div className="border-l border-gray-200 pl-8 md:pl-12">
                <h2 className="text-3xl md:text-4xl font-extralight tracking-wider text-gray-900 mb-8">Origens</h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p className="text-base md:text-lg font-light">
                    Fundada em 2010, a Epicura nasceu da paixão de nosso chef fundador,
                    <span className="font-normal text-gray-900 mx-1">Rafael Monteiro</span>, por sabores que desafiam o
                    convencional. Durante suas viagens pelos cinco continentes, Rafael descobriu que a verdadeira
                    sofisticação gastronômica reside na autenticidade dos ingredientes e na coragem de combinações
                    inesperadas.
                    </p>
                    <p className="text-base md:text-lg font-light">
                    O nome <span className="italic font-normal">Epicura</span> homenageia o filósofo grego Epicuro, que
                    acreditava que o prazer moderado era o caminho para a felicidade — princípio que guia cada criação em
                    nossa cozinha.
                    </p>
                </div>
                </div>
            </MotionDiv>

            {/* Decorative Image Section */}
            <MotionDiv
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="mb-24"
            >
                <div className="relative h-64 md:h-80 lg:h-96 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 border border-gray-300 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                    </div>
                    <p className="text-gray-500 font-light tracking-wide">Chef Rafael em sua primeira cozinha</p>
                    </div>
                </div>
                </div>
            </MotionDiv>

            {/* Philosophy Section */}
            <MotionDiv
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className="mb-24"
            >
                <div className="border-r border-gray-200 pr-8 md:pr-12">
                <h2 className="text-3xl md:text-4xl font-extralight tracking-wider text-gray-900 mb-8 text-right">
                    Filosofia Gastronômica
                </h2>
                <div className="text-right">
                    <p className="text-base md:text-lg font-light text-gray-700 leading-relaxed mb-8">
                    Na Epicura, acreditamos que comer é uma experiência multisensorial. Cada prato é uma narrativa que
                    combina elementos essenciais:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {[
                        "Técnicas ancestrais",
                        "Ingredientes raros",
                        "Apresentação artística",
                        "Sustentabilidade",
                        "Inovação ousada",
                        "Respeito às origens",
                    ].map((item, index) => (
                        <MotionDiv
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-right"
                        >
                        <div className="border-t border-gray-200 pt-4">
                            <span className="text-gray-800 font-light tracking-wide text-sm md:text-base">{item}</span>
                        </div>
                        </MotionDiv>
                    ))}
                    </div>
                </div>
                </div>
            </MotionDiv>

            {/* Recognition Section */}
            <MotionDiv
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
                className="mb-24"
            >
                <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extralight tracking-wider text-gray-900 mb-8">Reconhecimento</h2>
                <p className="text-base md:text-lg font-light text-gray-700 leading-relaxed max-w-2xl mx-auto">
                    Nossa dedicação à excelência nos rendeu reconhecimento internacional, consolidando nossa posição no
                    cenário gastronômico mundial:
                </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { year: "2015", title: "Melhor Novo Conceito", by: "Gourmet Awards" },
                    { year: "2018", title: "Estrela Verde", by: "Guia Michelin" },
                    { year: "2020", title: "Top 10 Inovação", by: "World Food Magazine" },
                    { year: "2023", title: "Excelência Sustentável", by: "Global Gastronomy" },
                ].map((item, index) => (
                    <MotionDiv
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    className="group"
                    >
                    <div className="border border-gray-200 p-6 h-full transition-all duration-300 hover:border-gray-400 hover:shadow-sm">
                        <div className="text-center">
                        <p className="text-2xl font-extralight text-gray-400 mb-2 tracking-wider">{item.year}</p>
                        <div className="h-px bg-gray-200 mb-4 group-hover:bg-gray-400 transition-colors duration-300"></div>
                        <h3 className="text-gray-900 font-light mb-3 text-sm md:text-base tracking-wide">{item.title}</h3>
                        <p className="text-gray-600 text-xs md:text-sm font-light tracking-wide">{item.by}</p>
                        </div>
                    </div>
                    </MotionDiv>
                ))}
                </div>
            </MotionDiv>

            {/* Final Quote */}
            <MotionDiv
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="py-16 border-t border-gray-200"
            >
                <blockquote className="text-center max-w-4xl mx-auto">
                <div className="mb-8">
                    <div className="w-1 h-16 bg-gray-300 mx-auto mb-8"></div>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-extralight text-gray-800 italic leading-relaxed tracking-wide">
                    "O verdadeiro luxo está na autenticidade. Cada garfada deve contar uma história."
                    </p>
                </div>
                <footer className="text-gray-600 font-light tracking-wider">— Rafael Monteiro, Fundador</footer>
                </blockquote>
            </MotionDiv>
            </div>
        </div>

        {/* Footer with Copyright */}
        <footer className="border-t border-gray-200 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-center md:text-left">
                <p className="text-gray-600 font-light tracking-wide text-sm">
                    © {currentYear} Epicura. Todos os direitos reservados.
                </p>
                </div>
                <div className="flex space-x-8 text-sm">
                <span className="text-gray-500 font-light tracking-wide">Experiência gastronômica excepcional</span>
                </div>
            </div>
            </div>
        </footer>
        </div>
    )
}
