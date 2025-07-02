import { MotionDiv } from "@/components/template/Motion/container"
import { Button } from "@/components/ui/button"
import { Construction, Phone, ArrowLeft, Clock, ChefHat } from "lucide-react"

import { useNavigate } from "@tanstack/react-router"
export default function OrdersPage() {
    const currentYear = new Date().getFullYear()
    const navigate = useNavigate()
    function handleRedirect() {
        // This function can be used to handle any additional logic before redirecting
        navigate({ to: "/home" })
    }
    function handleSendReservation() {
        navigate({ to: "/register" })
    }
    return (
        <div className="min-h-screen bg-white flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl w-full">
            {/* Geometric Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gray-100 transform -rotate-45" />
                <div className="absolute top-1/3 right-1/4 w-px h-24 bg-gray-100 transform rotate-45" />
                <div className="absolute bottom-1/3 left-1/3 w-16 h-px bg-gray-100" />
                <div className="absolute bottom-1/4 right-1/3 w-12 h-px bg-gray-100" />
            </div>

            <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-center relative z-10"
            >
                {/* Icon Section */}
                <div className="mb-12">
                <div className="relative mx-auto w-32 h-32 border border-gray-200 flex items-center justify-center mb-8">
                    <Construction className="h-16 w-16 text-gray-600" />
                    {/* Decorative corner elements */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gray-400" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gray-400" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gray-400" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gray-400" />
                </div>
                <div className="w-24 h-px bg-gray-300 mx-auto" />
                </div>

                {/* Title Section */}
                <div className="mb-16">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-gray-900 mb-6 leading-tight tracking-tight">
                    Sistema de Pedidos Online
                </h1>
                <h2 className="text-2xl md:text-3xl font-extralight text-gray-600 mb-8 tracking-wide">
                    Em Desenvolvimento
                </h2>
                <div className="w-32 h-px bg-gray-200 mx-auto" />
                </div>

                {/* Description */}
                <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mb-16"
                >
                <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed max-w-3xl mx-auto mb-8">
                    Estamos criando uma experiência de pedidos online à altura da qualidade Epicura. Nossa plataforma será
                    tão refinada quanto nossos pratos, oferecendo uma jornada digital excepcional.
                </p>
                <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
                    Enquanto isso, convidamos você a fazer reservas pelo telefone ou visitar nosso restaurante para
                    vivenciar nossa experiência gastronômica completa.
                </p>
                </MotionDiv>

                {/* Action Buttons */}
                <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row justify-center gap-6 mb-20"
                >
                <Button 
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-sm tracking-wider font-light transition-all duration-300"
                onClick={handleSendReservation}
                variant="outline"
                >
                    <Phone className="mr-3 h-4 w-4" />
                    FAZER RESERVA
                </Button>
                <Button
                    variant="outline"
                    className="border border-gray-300 text-gray-900 hover:bg-gray-50 px-8 py-4 text-sm tracking-wider font-light transition-all duration-300 bg-transparent"
                    onClick={handleRedirect}
                >
                    <ArrowLeft className="mr-3 h-4 w-4" />
                    VOLTAR À PÁGINA INICIAL
                </Button>
                </MotionDiv>

                {/* Additional Information */}
                <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                >
                {[
                    {
                    icon: Clock,
                    title: "Reservas Imediatas",
                    description: "Ligue para +55 (11) 98765-4321 e garanta sua mesa",
                    },
                    {
                    icon: ChefHat,
                    title: "Experiência Completa",
                    description: "Visite nosso restaurante para a experiência gastronômica integral",
                    },
                    {
                    icon: Construction,
                    title: "Em Breve",
                    description: "Sistema de pedidos online com a qualidade que você espera",
                    },
                ].map((item, index) => (
                    <MotionDiv
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="text-center group"
                    >
                    <div className="border border-gray-200 p-8 h-full transition-all duration-300 hover:border-gray-400">
                        <div className="w-12 h-12 mx-auto mb-6 border border-gray-200 flex items-center justify-center group-hover:border-gray-400 transition-colors duration-300">
                        <item.icon className="h-6 w-6 text-gray-600" />
                        </div>
                        <h3 className="text-lg font-light text-gray-900 mb-4 tracking-wide">{item.title}</h3>
                        <div className="w-8 h-px bg-gray-200 mx-auto mb-4 group-hover:bg-gray-400 transition-colors duration-300" />
                        <p className="text-gray-600 font-light text-sm leading-relaxed">{item.description}</p>
                    </div>
                    </MotionDiv>
                ))}
                </MotionDiv>
            </MotionDiv>
            </div>
        </div>

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
                <span className="text-gray-500 font-light tracking-wide">Reservas: +55 (11) 98765-4321</span>
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