import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from '@tanstack/react-router';

function Bar() {
    const { isAuthenticated, user, signOut } = useAuth(); // Adicionado logout
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Novo estado para menu do usuário
    const [cartItems] = useState([
        { id: 1, name: 'Ritual Essence', price: 89.90, quantity: 1, image: '/api/placeholder/60/60' },
        { id: 2, name: 'Root Serum', price: 124.50, quantity: 2, image: '/api/placeholder/60/60' },
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

    return (
        <>
            {/* Header */}
            <header className="bg-zinc-50 w-full h-20 flex justify-center items-center relative z-50">
                <nav className="w-full h-full flex flex-row justify-between items-center gap-5 px-[10%] md:px-[5%] sm:px-4">
                    {/* Brand */}
                    <div className="flex-shrink-0">
                        <a href='/' className="m-0 text-xl sm:text-lg text-black">
                            Epicura <span className="font-light text-gray-600">Brand</span>
                        </a>
                    </div>
                    
                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center justify-center gap-8 flex-1">
                        <a href="/home" className="text-black no-underline py-2 transition-all duration-300 hover:text-gray-600">
                            Início
                        </a>
                        {isAuthenticated && (
                            <a href="/profile" className="text-black no-underline py-2 transition-all duration-300 hover:text-gray-600">
                                Perfil
                            </a>
                        )}
                        <a href="/about" className="text-black no-underline py-2 transition-all duration-300 hover:text-gray-600">
                            Nossa História
                        </a>
                        <a href="/products" className="text-black no-underline py-2 transition-all duration-300 hover:text-gray-600">
                            Serviços & Pratos
                        </a>
                        {isAuthenticated && (
                            <a href="/orders" className="text-black no-underline py-2 transition-all duration-300 hover:text-gray-600">
                                Encomendas
                            </a>
                        )}
                    </div>

                    {/* Desktop Right Side */}
                    <div className="hidden md:flex items-center justify-end gap-4 flex-1">
                        {isAuthenticated ? (
                            <>
                                {/* User Menu Dropdown */}
                                <div className="relative">
                                    <button 
                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                                        onClick={toggleUserMenu}
                                    >
                                        {/* Avatar com inicial */}
                                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                                            {getInitials(user?.email)}
                                        </div>
                                        {/* Email (visível apenas em desktop) */}
                                        <span className="text-sm text-gray-700 hidden lg:block max-w-32 truncate">
                                            {user?.email}
                                        </span>
                                        {/* Seta dropdown */}
                                        <svg 
                                            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                            <a 
                                                href="/profile" 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                                onClick={closeMenus}
                                            >
                                                Ver Perfil
                                            </a>
                                            <a 
                                                href="/orders" 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                                onClick={closeMenus}
                                            >
                                                Meus Pedidos
                                            </a>
                                            <a 
                                                href="/products/new" 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                                onClick={closeMenus}
                                            >
                                                Criar Pratos
                                            </a>
                                            <a 
                                                href="/products/user" 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                                onClick={closeMenus}
                                            >
                                                Configurações
                                            </a>
                                            <hr className="my-2 border-gray-200" />
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                                            >
                                                Sair
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Carrinho */}
                                <div className="relative">
                                    <button 
                                        className="w-11 h-11 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg relative"
                                        onClick={toggleCart}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                                        </svg>
                                        {getTotalItems() > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                                {getTotalItems()}
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm text-gray-700 hover:text-black transition-colors duration-200">
                                    Entrar
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    Cadastrar
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex md:hidden items-center gap-4">
                        {/* Cart Button Mobile */}
                        <div className="relative">
                            <button 
                                className="w-11 h-11 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg relative"
                                onClick={toggleCart}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                                </svg>
                                {getTotalItems() > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                        {getTotalItems()}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                            className="bg-transparent border-none cursor-pointer p-2"
                            onClick={toggleMobileMenu}
                        >
                            <div className="w-6 h-4 relative transform rotate-0 transition-all duration-300 ease-in-out">
                                <span className={`block absolute h-0.5 w-full bg-black rounded-sm opacity-100 left-0 transform rotate-0 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'top-2 rotate-45' : 'top-0'}`}></span>
                                <span className={`block absolute h-0.5 w-full bg-black rounded-sm opacity-100 left-0 transform rotate-0 transition-all duration-300 ease-in-out top-2 ${isMobileMenuOpen ? 'opacity-0 -left-15' : ''}`}></span>
                                <span className={`block absolute h-0.5 w-full bg-black rounded-sm opacity-100 left-0 transform rotate-0 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'}`}></span>
                            </div>
                        </button>
                    </div>
                </nav>
            </header>

            {/* Overlay */}
            {(isMobileMenuOpen || isCartOpen || isUserMenuOpen) && (
                <div 
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 backdrop-blur-sm animate-in fade-in duration-300"
                    onClick={closeMenus}
                ></div>
            )}

            {/* Mobile Sidebar Menu */}
            <div className={`fixed top-0 left-0 h-full w-80 sm:w-full bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <a href='/' className="m-0 text-xl sm:text-lg text-black">
                        Epicura <span className="font-light text-gray-600">Brand</span>
                    </a>
                    <button 
                        className="bg-transparent border-none cursor-pointer p-1 text-gray-600 hover:text-black transition-colors duration-300"
                        onClick={toggleMobileMenu}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                
                {/* User Info Section Mobile */}
                {isAuthenticated && (
                    <div className="p-6 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium text-lg">
                                {getInitials(user?.email)}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {user?.firstName || user?.email?.split('@')[0]}
                                </p>
                                <p className="text-xs text-gray-600 truncate">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="py-4">
                    <a 
                        href="/home" 
                        className="block py-4 px-6 text-3xl text-black no-underline transition-all duration-300 border-l-4 border-transparent hover:bg-gray-100 hover:pl-8"
                        onClick={closeMenus}
                    >
                        Início
                    </a>
                    
                    {isAuthenticated ? (
                        <>
                            <a 
                                href="/profile" 
                                className="block py-4 px-6 text-3xl text-black no-underline transition-all duration-300 border-l-4 border-transparent hover:bg-gray-100 hover:pl-8"
                                onClick={closeMenus}
                            >
                                Perfil
                            </a>
                            <a 
                                href="/orders" 
                                className="block py-4 px-6 text-3xl text-black no-underline transition-all duration-300 border-l-4 border-transparent hover:bg-gray-100 hover:pl-8"
                                onClick={closeMenus}
                            >
                                Encomendas
                            </a>
                            <a 
                                href="/settings" 
                                className="block py-4 px-6 text-3xl text-black no-underline transition-all duration-300 border-l-4 border-transparent hover:bg-gray-100 hover:pl-8"
                                onClick={closeMenus}
                            >
                                Criar Pratos
                            </a>
                            <a 
                                href="/products/user" 
                                className="block py-4 px-6 text-3xl text-black no-underline transition-all duration-300 border-l-4 border-transparent hover:bg-gray-100 hover:pl-8"
                                onClick={closeMenus}
                            >
                                Configurações
                            </a>
                        </>
                    ) : null}
                    
                    <a 
                        href="/about" 
                        className="block py-4 px-6 text-3xl text-black no-underline transition-all duration-300 border-l-4 border-transparent hover:bg-gray-100 hover:pl-8"
                        onClick={closeMenus}
                    >
                        Nossa História
                    </a>
                    <a 
                        href="/products" 
                        className="block py-4 px-6 text-2xl text-black no-underline transition-all duration-300 border-l-4 border-transparent hover:bg-gray-100 hover:pl-8"
                        onClick={closeMenus}
                    >
                        Produtos & Serviços
                    </a>
                </div>

                {/* Login/Logout Section Mobile */}
                <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-gray-50">
                    {isAuthenticated ? (
                        <div className="p-6">
                            <button 
                                onClick={handleLogout}
                                className="w-full py-3 text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-200 font-medium"
                            >
                                Sair da Conta
                            </button>
                        </div>
                    ) : (
                        <div className="p-6 space-y-3">
                            <Link 
                                to="/login" 
                                className="block w-full py-3 text-center text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium no-underline"
                                onClick={closeMenus}
                            >
                                Entrar
                            </Link>
                            <Link 
                                to="/register" 
                                className="block w-full py-3 text-center text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium no-underline"
                                onClick={closeMenus}
                            >
                                Cadastrar
                            </Link>
                        </div>
                    )}
                    
                    {/* Social Media Links */}
                    <div className="px-6 pb-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-4">Siga-nos</h4>
                        <div className="flex gap-4">
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-pink-600"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-blue-600"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-blue-400"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                            </a>
                            <a 
                                href="https://whatsapp.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-green-500"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.488"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cart Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-80 sm:w-full bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h3 className="m-0 text-black text-xl">Carrinho</h3>
                    <button 
                        className="bg-transparent border-none cursor-pointer p-1 text-gray-600 hover:text-black transition-colors duration-300"
                        onClick={toggleCart}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                
                <div className="flex flex-col h-full">
                    {cartItems.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-gray-600">
                            <p>Seu carrinho está vazio</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex-1 overflow-y-auto p-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex gap-4 py-4 border-b border-gray-100">
                                        <div className="flex-shrink-0">
                                            <div className="w-15 h-15 bg-gray-200 rounded-lg"></div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="m-0 mb-2 text-sm text-black">{item.name}</h4>
                                            <p className="m-0 mb-2 font-semibold text-black">R$ {item.price.toFixed(2)}</p>
                                            <div className="flex items-center gap-2">
                                                <button className="w-7 h-7 border border-gray-300 bg-white rounded flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-gray-100">
                                                    -
                                                </button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <button className="w-7 h-7 border border-gray-300 bg-white rounded flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-gray-100">
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="p-6 border-t border-gray-200 bg-gray-50">
                                <div className="mb-4">
                                    <h3 className="m-0 text-black">Total: R$ {getTotalPrice().toFixed(2)}</h3>
                                </div>
                                <button className="w-full py-4 bg-black text-white border-none rounded-lg text-base cursor-pointer transition-all duration-300 hover:bg-gray-800 hover:-translate-y-0.5">
                                    Finalizar Compra
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Bar;