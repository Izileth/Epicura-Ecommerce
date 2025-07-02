import { MotionDiv } from "@/components/template/Motion/container"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone, Clock } from "lucide-react"

export default function ContactPage() {
    const currentYear = new Date().getFullYear()

    return (
        <div className="min-h-screen bg-white">
        {/* Main Content */}
        <div className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center mb-24"
            >
                <div className="mb-8">
                <span className="text-xs uppercase tracking-[0.3em] text-gray-500 font-light">CONECTE-SE</span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight mt-6 text-gray-900 leading-tight tracking-tight">
                    Entre em Contato
                </h1>
                <div className="w-24 h-px bg-gray-300 mx-auto mt-8" />
                </div>
                <p className="text-lg md:text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                Estamos aqui para criar experiências gastronômicas inesquecíveis. Entre em contato conosco para reservas,
                eventos especiais ou qualquer dúvida.
                </p>
            </MotionDiv>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                {/* Contact Form */}
                <MotionDiv
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
                >
                <div className="border-l border-gray-200 pl-8 md:pl-12">
                    <h2 className="text-3xl md:text-4xl font-extralight mb-8 text-gray-900 tracking-tight">
                    Envie sua mensagem
                    </h2>

                    <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-light text-gray-700 tracking-wide">
                            NOME
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-0 py-3 border-0 border-b border-gray-200 bg-transparent focus:border-gray-400 focus:ring-0 transition-colors duration-300 text-gray-900 placeholder-gray-400"
                            placeholder="Seu nome completo"
                        />
                        </div>
                        <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-light text-gray-700 tracking-wide">
                            EMAIL
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-0 py-3 border-0 border-b border-gray-200 bg-transparent focus:border-gray-400 focus:ring-0 transition-colors duration-300 text-gray-900 placeholder-gray-400"
                            placeholder="seu@email.com"
                        />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="subject" className="block text-sm font-light text-gray-700 tracking-wide">
                        ASSUNTO
                        </label>
                        <select
                        id="subject"
                        className="w-full px-0 py-3 border-0 border-b border-gray-200 bg-transparent focus:border-gray-400 focus:ring-0 transition-colors duration-300 text-gray-900"
                        >
                        <option value="">Selecione um assunto</option>
                        <option value="reserva">Reserva</option>
                        <option value="eventos">Eventos privados</option>
                        <option value="chef-domicilio">Chef à domicílio</option>
                        <option value="outros">Outros</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-light text-gray-700 tracking-wide">
                        MENSAGEM
                        </label>
                        <textarea
                        id="message"
                        rows={5}
                        className="w-full px-0 py-3 border-0 border-b border-gray-200 bg-transparent focus:border-gray-400 focus:ring-0 transition-colors duration-300 text-gray-900 placeholder-gray-400 resize-none"
                        placeholder="Sua mensagem..."
                        ></textarea>
                    </div>

                    <div className="pt-6">
                        <Button
                        type="submit"
                        className="w-full md:w-auto bg-gray-900 hover:bg-gray-800 text-white border-0 px-12 py-4 text-sm tracking-wider font-light transition-all duration-300"
                        >
                        ENVIAR MENSAGEM
                        </Button>
                    </div>
                    </form>
                </div>
                </MotionDiv>

                {/* Contact Information */}
                <MotionDiv
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
                >
                <div className="border-r border-gray-200 pr-8 md:pr-12">
                    <h2 className="text-3xl md:text-4xl font-extralight mb-8 text-gray-900 tracking-tight text-right">
                    Informações
                    </h2>

                    <div className="space-y-12">
                    {/* Contact Items */}
                    <div className="space-y-8">
                        {[
                        {
                            icon: MapPin,
                            title: "Endereço",
                            content: ["Rua dos Sabores, 123", "Jardim Epicurista", "São Paulo - SP, 01451-000"],
                        },
                        {
                            icon: Phone,
                            title: "Telefone",
                            content: ["+55 (11) 98765-4321", "Segunda a Sábado, 10h às 22h"],
                        },
                        {
                            icon: Mail,
                            title: "Email",
                            content: ["contato@epicura.com.br", "reservas@epicura.com.br"],
                        },
                        ].map((item, index) => (
                        <MotionDiv
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-right"
                        >
                            <div className="flex items-start justify-end">
                            <div className="text-right mr-6">
                                <h3 className="text-lg font-light text-gray-900 mb-2 tracking-wide">{item.title}</h3>
                                <div className="space-y-1">
                                {item.content.map((line, lineIndex) => (
                                    <p
                                    key={lineIndex}
                                    className={`${
                                        lineIndex === item.content.length - 1 && item.content.length > 2
                                        ? "text-sm text-gray-500"
                                        : "text-gray-700"
                                    } font-light`}
                                    >
                                    {line}
                                    </p>
                                ))}
                                </div>
                            </div>
                            <div className="flex-shrink-0 w-12 h-12 border border-gray-200 flex items-center justify-center">
                                <item.icon className="h-5 w-5 text-gray-600" />
                            </div>
                            </div>
                        </MotionDiv>
                        ))}
                    </div>

                    {/* Map Section */}
                    <div className="pt-8">
                        <h3 className="text-lg font-light text-gray-900 mb-6 tracking-wide text-right">Nos encontre</h3>
                        <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 border border-gray-300 flex items-center justify-center">
                                <MapPin className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 font-light tracking-wide text-sm">Localização do restaurante</p>
                            </div>
                        </div>
                        {/* Decorative corner lines */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gray-300" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-gray-300" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-gray-300" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gray-300" />
                        </div>
                    </div>
                    </div>
                </div>
                </MotionDiv>
            </div>

            {/* Operating Hours */}
            <MotionDiv
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-32"
            >
                <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-6">
                    <div className="w-12 h-12 border border-gray-200 flex items-center justify-center mr-4">
                        <Clock className="h-6 w-6 text-gray-600" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extralight text-gray-900 tracking-tight">
                        Horário de Funcionamento
                    </h2>
                    </div>
                    <div className="w-24 h-px bg-gray-300 mx-auto" />
                </div>

                <div className="border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        { day: "Segunda a Quinta", hours: "18:00 - 23:00" },
                        { day: "Sexta e Sábado", hours: "18:00 - 00:00" },
                        { day: "Domingo", hours: "12:00 - 17:00" },
                        { day: "Feriados", hours: "Consulte horário especial" },
                    ].map((item, index) => (
                        <div
                        key={index}
                        className={`p-8 text-center ${
                            index < 3 ? "border-r border-gray-200 md:border-r-0 lg:border-r" : ""
                        } ${index < 2 ? "md:border-r" : ""} ${index === 1 ? "border-b md:border-b-0" : ""} ${
                            index === 0 || index === 2 ? "border-b lg:border-b-0" : ""
                        }`}
                        >
                        <h3 className="text-sm font-light text-gray-900 mb-3 tracking-wide">{item.day}</h3>
                        <div className="w-8 h-px bg-gray-200 mx-auto mb-3" />
                        <p className="text-gray-600 font-light text-sm">{item.hours}</p>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </MotionDiv>
            </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8 bg-white mt-20">
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
                <span className="text-gray-500 font-light tracking-wide">Atendimento personalizado</span>
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