import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X, ShoppingBag, User, ChevronDown, LogOut, Settings, Package, Home, Info, Utensils } from "lucide-react"
function Bar() {
    const { isAuthenticated, user, signOut } = useAuth(); // Adicionado logout
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Novo estado para menu do usuário
    const [cartItems] = useState([
        { id: 1, name: 'Default Product', price: 0.00, quantity: 1, image: '/api/placeholder/60/60' }
    ]);
    
    const getInitials = (email?: string) => {
        if (!email) return '?';
        const [username] = email.split('@');
        return username.charAt(0).toUpperCase();
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (isCartOpen) setIsCartOpen(false);
        if (isUserMenuOpen) setIsUserMenuOpen(false);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        if (isUserMenuOpen) setIsUserMenuOpen(false);
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        if (isCartOpen) setIsCartOpen(false);
    };

    const closeMenus = () => {
        setIsMobileMenuOpen(false);
        setIsCartOpen(false);
        setIsUserMenuOpen(false);
    };

    const handleLogout = () => {
        signOut();
        closeMenus();
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };
    
    const currentYear = new Date().getFullYear()

    
    return (
        <>
        {/* Header */}
        <header className="bg-white border-b border-gray-100 w-full h-16 flex justify-center items-center relative z-50">
            <nav className="w-full h-full flex flex-row justify-between items-center gap-6 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
            {/* Brand */}
            <div className="flex-shrink-0">
                <a
                href="/"
                className="text-lg font-light text-black tracking-wide hover:text-gray-600 transition-colors duration-200"
                >
                Epicura <span className="font-extralight text-gray-400">Brand</span>
                </a>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center justify-center gap-8 flex-1">
                <a
                href="/home"
                className="text-sm font-light text-gray-700 hover:text-black transition-colors duration-200 relative group"
                >
                <span className="flex items-center gap-2">
                    <Home size={16} />
                    Início
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-200 group-hover:w-full"></div>
                </a>
                {isAuthenticated && (
                <a
                    href="/profile"
                    className="text-sm font-light text-gray-700 hover:text-black transition-colors duration-200 relative group"
                >
                    <span className="flex items-center gap-2">
                    <User size={16} />
                    Perfil
                    </span>
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-200 group-hover:w-full"></div>
                </a>
                )}
                <a
                href="/about"
                className="text-sm font-light text-gray-700 hover:text-black transition-colors duration-200 relative group"
                >
                <span className="flex items-center gap-2">
                    <Info size={16} />
                    Nossa História
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-200 group-hover:w-full"></div>
                </a>
                <a
                href="/products"
                className="text-sm font-light text-gray-700 hover:text-black transition-colors duration-200 relative group"
                >
                <span className="flex items-center gap-2">
                    <Utensils size={16} />
                    Serviços & Pratos
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-200 group-hover:w-full"></div>
                </a>
                {isAuthenticated && (
                <a
                    href="/orders"
                    className="text-sm font-light text-gray-700 hover:text-black transition-colors duration-200 relative group"
                >
                    <span className="flex items-center gap-2">
                    <Package size={16} />
                    Encomendas
                    </span>
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-200 group-hover:w-full"></div>
                </a>
                )}
            </div>

            {/* Desktop Right Side */}
            <div className="hidden lg:flex items-center justify-end gap-4 flex-1">
                {isAuthenticated ? (
                <>
                    {/* User Menu Dropdown */}
                    <div className="relative">
                    <button
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 transition-colors duration-200 border border-transparent hover:border-gray-200 rounded-sm"
                        onClick={toggleUserMenu}
                    >
                        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-xs font-light">
                        {getInitials(user?.email)}
                        </div>
                        <span className="text-sm font-light text-gray-700 max-w-32 truncate">{user?.email}</span>
                        <ChevronDown
                        size={16}
                        className={`text-gray-400 transition-transform duration-200 ${isUserMenuOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {isUserMenuOpen && (
                        <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-100 shadow-lg py-1 z-50">
                        <a
                            href="/profile"
                            className="flex items-center gap-3 px-4 py-2 text-sm font-light text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                            onClick={closeMenus}
                        >
                            <User size={16} />
                            Ver Perfil
                        </a>
                        <a
                            href="/products/create"
                            className="flex items-center gap-3 px-4 py-2 text-sm font-light text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                            onClick={closeMenus}
                        >
                            <Package size={16} />
                            Adicionar Especiaria
                        </a>
                          <a
                            href="/products/user"
                            className="flex items-center gap-3 px-4 py-2 text-sm font-light text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                            onClick={closeMenus}
                        >
                            <Package size={16} />
                            Minhas Especiarias
                        </a>
                        <a
                            href="/settings"
                            className="flex items-center gap-3 px-4 py-2 text-sm font-light text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                            onClick={closeMenus}
                        >
                            <Settings size={16} />
                            Configurações
                        </a>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-2 text-sm font-light text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                            <LogOut size={16} />
                            Sair
                        </button>
                        </div>
                    )}
                    </div>

                    {/* Cart */}
                    <div className="relative">
                    <button
                        className="w-10 h-10 border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-all duration-200 hover:bg-gray-50 relative"
                        onClick={toggleCart}
                    >
                        <ShoppingBag size={18} className="text-gray-700" />
                        {getTotalItems() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-light">
                            {getTotalItems()}
                        </span>
                        )}
                    </button>
                    </div>
                </>
                ) : (
                <>
                    <a
                    href="/login"
                    className="text-sm font-light text-gray-700 hover:text-black transition-colors duration-200"
                    >
                    Entrar
                    </a>
                    <a
                    href="/register"
                    className="px-4 py-2 bg-black text-white text-sm font-light border border-black hover:bg-white hover:text-black transition-all duration-200"
                    >
                    Cadastrar
                    </a>
                </>
                )}
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-4">
                {/* Cart Button Mobile */}
                <div className="relative">
                <button
                    className="w-10 h-10 border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-all duration-200 hover:bg-gray-50 relative"
                    onClick={toggleCart}
                >
                    <ShoppingBag size={18} className="text-gray-700" />
                    {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-light">
                        {getTotalItems()}
                    </span>
                    )}
                </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                className="w-10 h-10 border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-all duration-200 hover:bg-gray-50"
                onClick={toggleMobileMenu}
                >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>
            </nav>
        </header>

        {/* Overlay */}
        {(isMobileMenuOpen || isCartOpen || isUserMenuOpen) && (
            <div className="fixed inset-0 bg-black bg-opacity-20 z-40 backdrop-blur-sm" onClick={closeMenus}></div>
        )}

        {/* Mobile Sidebar Menu */}
        <div
            className={`fixed top-0 left-0 h-full w-80 sm:w-full bg-white z-50 transform transition-transform duration-300 ease-out border-r border-gray-100 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <a href="/" className="text-lg font-light text-black tracking-wide">
                Epicura <span className="font-extralight text-gray-400">Brand</span>
            </a>
            <button
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black transition-colors duration-200"
                onClick={toggleMobileMenu}
            >
                <X size={20} />
            </button>
            </div>

            {/* User Info Section Mobile */}
            {isAuthenticated && (
            <div className="p-6 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-sm font-light">
                    {getInitials(user?.email)}
                </div>
                <div>
                    <p className="text-sm font-light text-black truncate">
                    {user?.firstName || user?.email?.split("@")[0]}
                    </p>
                    <p className="text-xs font-light text-gray-500 truncate">{user?.email}</p>
                </div>
                </div>
            </div>
            )}

            <div className="py-4">
            <a
                href="/home"
                className="flex items-center gap-4 py-4 px-6 text-lg font-light text-black hover:bg-gray-50 transition-colors duration-200 border-l-2 border-transparent hover:border-black"
                onClick={closeMenus}
            >
                <Home size={20} />
                Início
            </a>

            {isAuthenticated ? (
                <>
                <a
                    href="/profile"
                    className="flex items-center gap-4 py-4 px-6 text-lg font-light text-black hover:bg-gray-50 transition-colors duration-200 border-l-2 border-transparent hover:border-black"
                    onClick={closeMenus}
                >
                    <User size={20} />
                    Perfil
                </a>
                <a
                    href="/orders"
                    className="flex items-center gap-4 py-4 px-6 text-lg font-light text-black hover:bg-gray-50 transition-colors duration-200 border-l-2 border-transparent hover:border-black"
                    onClick={closeMenus}
                >
                    <Package size={20} />
                    Encomendas
                </a>
                <a
                    href="/settings"
                    className="flex items-center gap-4 py-4 px-6 text-lg font-light text-black hover:bg-gray-50 transition-colors duration-200 border-l-2 border-transparent hover:border-black"
                    onClick={closeMenus}
                >
                    <Settings size={20} />
                    Configurações
                </a>
                </>
            ) : null}

            <a
                href="/about"
                className="flex items-center gap-4 py-4 px-6 text-lg font-light text-black hover:bg-gray-50 transition-colors duration-200 border-l-2 border-transparent hover:border-black"
                onClick={closeMenus}
            >
                <Info size={20} />
                Nossa História
            </a>
            <a
                href="/products"
                className="flex items-center gap-4 py-4 px-6 text-lg font-light text-black hover:bg-gray-50 transition-colors duration-200 border-l-2 border-transparent hover:border-black"
                onClick={closeMenus}
            >
                <Utensils size={20} />
                Produtos & Serviços
            </a>
            </div>

            {/* Login/Logout Section Mobile */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100">
            {isAuthenticated ? (
                <div className="p-6">
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full py-3 text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 font-light"
                >
                    <LogOut size={16} />
                    Sair da Conta
                </button>
                </div>
            ) : (
                <div className="p-6 space-y-3">
                <a
                    href="/login"
                    className="block w-full py-3 text-center text-black bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 font-light"
                    onClick={closeMenus}
                >
                    Entrar
                </a>
                <a
                    href="/register"
                    className="block w-full py-3 text-center text-white bg-black border border-black hover:bg-gray-800 transition-colors duration-200 font-light"
                    onClick={closeMenus}
                >
                    Cadastrar
                </a>
                </div>
            )}

            {/* Copyright Notice */}
            <div className="px-6 pb-6 pt-4 border-t border-gray-100">
                <p className="text-xs font-light text-gray-400 text-center">
                © {currentYear} Epicura Brand. Todos os direitos reservados.
                </p>
            </div>
            </div>
        </div>

        {/* Cart Sidebar */}
        <div
            className={`fixed top-0 right-0 h-full w-80 sm:w-full bg-white z-50 transform transition-transform duration-300 ease-out border-l border-gray-100 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h3 className="text-lg font-light text-black">Carrinho</h3>
            <button
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black transition-colors duration-200"
                onClick={toggleCart}
            >
                <X size={20} />
            </button>
            </div>

            <div className="flex flex-col h-full">
            {cartItems.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
                <ShoppingBag size={48} className="mb-4" />
                <p className="font-light">Seu carrinho está vazio</p>
                </div>
            ) : (
                <>
                <div className="flex-1 overflow-y-auto p-4">
                    {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4 border-b border-gray-100 last:border-b-0">
                        <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gray-100 border border-gray-200"></div>
                        </div>
                        <div className="flex-1">
                        <h4 className="text-sm font-light text-black mb-1">{item.name}</h4>
                        <p className="text-sm font-light text-gray-600 mb-2">R$ {item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-3">
                            <button className="w-8 h-8 border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 text-gray-600">
                            -
                            </button>
                            <span className="text-sm font-light">{item.quantity}</span>
                            <button className="w-8 h-8 border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 text-gray-600">
                            +
                            </button>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>

                <div className="p-6 border-t border-gray-100">
                    <div className="mb-4">
                    <div className="flex justify-between items-center">
                        <span className="font-light text-gray-600">Total:</span>
                        <span className="text-lg font-light text-black">R$ {getTotalPrice().toFixed(2)}</span>
                    </div>
                    </div>
                    <button className="w-full py-3 bg-black text-white border border-black font-light hover:bg-gray-800 transition-colors duration-200">
                    Finalizar Compra
                    </button>
                </div>
                </>
            )}
            </div>
        </div>
        </>
    )
}

export default Bar;