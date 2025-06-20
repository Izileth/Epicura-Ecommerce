import type React from "react"

import { useState } from "react"
import { Mail, Phone, Check, Loader2, Instagram, Facebook, Twitter, MessageCircle } from "lucide-react"

function Footer() {
    const [email, setEmail] = useState("")
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!email) return

        setIsLoading(true)

        // Simular envio
        setTimeout(() => {
        setIsSubscribed(true)
        setIsLoading(false)
        setEmail("")

        // Reset após 3 segundos
        setTimeout(() => {
            setIsSubscribed(false)
        }, 3000)
        }, 1500)
    }

    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-white text-black border-t border-gray-200">
        {/* Newsletter Section */}
        <div className="bg-zinc-50 py-16 border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wide">Fique por dentro das novidades</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                Receba em primeira mão nossos lançamentos, rituais exclusivos e conteúdos especiais sobre bem-estar e beleza
                natural.
            </p>

            <div className="max-w-md mx-auto">
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor e-mail"
                    className="flex-1 px-6 py-4 bg-white border border-gray-200 focus:outline-none focus:border-black transition-all duration-300 font-light placeholder-gray-400"
                    disabled={isLoading || isSubscribed}
                />
                <button
                    type="submit"
                    disabled={isLoading || isSubscribed || !email}
                    className={`px-8 py-4 font-light transition-all duration-300 border ${
                    isSubscribed
                        ? "bg-black text-white border-black"
                        : isLoading
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                        : "bg-white text-black border-black hover:bg-black hover:text-white"
                    } disabled:cursor-not-allowed`}
                >
                    {isLoading ? (
                    <div className="flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        Enviando...
                    </div>
                    ) : isSubscribed ? (
                    <div className="flex items-center gap-2">
                        <Check size={16} />
                        Inscrito!
                    </div>
                    ) : (
                    "Inscrever-se"
                    )}
                </button>
                </form>
            </div>
            </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
                <h2 className="text-2xl font-light mb-4 tracking-wide">
                Epicura <span className="text-gray-400">Brand</span>
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed font-light">
                Conectamos você com a natureza através de rituais de beleza autênticos e sustentáveis.
                </p>

                {/* Social Media */}
                <div className="flex gap-4">
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all duration-300 text-gray-600"
                >
                    <Instagram size={18} className="stroke-1" />
                </a>
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all duration-300 text-gray-600"
                >
                    <Facebook size={18} className="stroke-1" />
                </a>
                <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all duration-300 text-gray-600"
                >
                    <Twitter size={18} className="stroke-1" />
                </a>
                <a
                    href="https://whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all duration-300 text-gray-600"
                >
                    <MessageCircle size={18} className="stroke-1" />
                </a>
                </div>
            </div>

            {/* Products */}
            <div>
                <h3 className="text-lg font-light mb-6 text-black">Produtos</h3>
                <ul className="space-y-3">
                <li>
                    <a href="/rituals" className="text-gray-600 hover:text-black transition-colors duration-300 font-light">
                    Rituais de Beleza
                    </a>
                </li>
                <li>
                    <a
                    href="/skincare"
                    className="text-gray-600 hover:text-black transition-colors duration-300 font-light"
                    >
                    Cuidados com a Pele
                    </a>
                </li>
                <li>
                    <a
                    href="/haircare"
                    className="text-gray-600 hover:text-black transition-colors duration-300 font-light"
                    >
                    Cuidados Capilares
                    </a>
                </li>
                <li>
                    <a href="/body" className="text-gray-600 hover:text-black transition-colors duration-300 font-light">
                    Cuidados Corporais
                    </a>
                </li>
                <li>
                    <a href="/kits" className="text-gray-600 hover:text-black transition-colors duration-300 font-light">
                    Kits Especiais
                    </a>
                </li>
                </ul>
            </div>

            {/* Company */}
            <div>
                <h3 className="text-lg font-light mb-6 text-black">Empresa</h3>
                <ul className="space-y-3">
                <li>
                    <a href="/about" className="text-gray-600 hover:text-black transition-colors duration-300 font-light">
                    Nossa História
                    </a>
                </li>
                <li>
                    <a
                    href="/sustainability"
                    className="text-gray-600 hover:text-black transition-colors duration-300 font-light"
                    >
                    Sustentabilidade
                    </a>
                </li>
                <li>
                    <a href="/careers" className="text-gray-600 hover:text-black transition-colors duration-300 font-light">
                    Trabalhe Conosco
                    </a>
                </li>
                <li>
                    <a href="/press" className="text-gray-600 hover:text-black transition-colors duration-300 font-light">
                    Imprensa
                    </a>
                </li>
                <li>
                    <a href="/blog" className="text-gray-600 hover:text-black transition-colors duration-300 font-light">
                    Blog
                    </a>
                </li>
                </ul>
            </div>

            {/* Support */}
            <div>
                <h3 className="text-lg font-light mb-6 text-black">Atendimento</h3>
                <ul className="space-y-3">
                <li>
                    <a href="/contact" className="text-gray-600 hover:text-black transition-colors duration-300 font-light">
                    Fale Conosco
                    </a>
                </li>
                <li>
                    <a href="/faq" className="text-gray-600 hover:text-black transition-colors duration-300 font-light">
                    Perguntas Frequentes
                    </a>
                </li>
                <li>
                    <a
                    href="/shipping"
                    className="text-gray-600 hover:text-black transition-colors duration-300 font-light"
                    >
                    Envios e Entregas
                    </a>
                </li>
                <li>
                    <a href="/returns" className="text-gray-600 hover:text-black transition-colors duration-300 font-light">
                    Trocas e Devoluções
                    </a>
                </li>
                <li>
                    <a
                    href="/size-guide"
                    className="text-gray-600 hover:text-black transition-colors duration-300 font-light"
                    >
                    Guia de Tamanhos
                    </a>
                </li>
                </ul>

                {/* Contact Info */}
                <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3">
                    <Phone size={16} className="text-gray-400 stroke-1" />
                    <span className="text-gray-600 font-light">(11) 99999-9999</span>
                </div>
                <div className="flex items-center gap-3">
                    <Mail size={16} className="text-gray-400 stroke-1" />
                    <span className="text-gray-600 font-light">contato@epicurabrand.com</span>
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <div className="text-gray-500 text-sm font-light">
                © {currentYear} Epicura Brand. Todos os direitos reservados.
                </div>

                <div className="flex flex-wrap gap-6 text-sm">
                <a href="/privacy" className="text-gray-500 hover:text-black transition-colors duration-300 font-light">
                    Política de Privacidade
                </a>
                <a href="/terms" className="text-gray-500 hover:text-black transition-colors duration-300 font-light">
                    Termos de Uso
                </a>
                <a href="/cookies" className="text-gray-500 hover:text-black transition-colors duration-300 font-light">
                    Cookies
                </a>
                </div>

                {/* Payment Methods */}
                <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm font-light">Pagamento:</span>
                <div className="flex gap-2">
                    <div className="w-8 h-5 border border-gray-200 bg-white flex items-center justify-center">
                    <span className="text-xs text-black font-light">V</span>
                    </div>
                    <div className="w-8 h-5 border border-gray-200 bg-white flex items-center justify-center">
                    <span className="text-xs text-black font-light">M</span>
                    </div>
                    <div className="w-8 h-5 border border-gray-200 bg-white flex items-center justify-center">
                    <span className="text-xs text-black font-light">P</span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </footer>
    )
}

export default Footer
