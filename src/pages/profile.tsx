import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { useForm } from 'react-hook-form';
import type { UpdateUser, User } from '@/types/user';

export function ProfilePage() {
    const { user, isLoading, fetchUser, updateUser } = useUser();
    const { register, handleSubmit, reset, formState: { isDirty, isSubmitting } } = useForm<UpdateUser>();
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Carrega dados do usuário ao montar o componente
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    // Preenche o formulário quando os dados do usuário são carregados
    useEffect(() => {
        if (user) {
            reset({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            });
        }
    }, [user, reset]);

    const onSubmit = async (data: UpdateUser) => {
        try {
            await updateUser(data as User);
            setShowSuccessMessage(true);
            setIsEditing(false);
            setTimeout(() => setShowSuccessMessage(false), 3000);
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    // Função para gerar iniciais
    const getInitials = (firstName?: string | null, lastName?: string | null) => {
        const first = firstName?.charAt(0)?.toUpperCase() || '';
        const last = lastName?.charAt(0)?.toUpperCase() || '';
        return first + last || 'U';
    };

    // Função para formatar data
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    // Função para obter cor do role
    const getRoleColor = (role: string) => {
        switch (role.toLowerCase()) {
            case 'admin':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'user':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'moderator':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
                    <p className="text-slate-600 font-medium">Carregando perfil...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Success Message */}
            {showSuccessMessage && (
                <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
                    <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="font-medium">Perfil atualizado com sucesso!</span>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header Section */}
                <div className="bg-white  shadow-xl overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 h-32 relative">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute -bottom-16 left-8">
                            <div className="w-32 h-32 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-white">
                                <span className="text-3xl font-bold text-slate-700">
                                    {getInitials(user?.firstName, user?.lastName)}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-20 pb-8 px-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                                    {user?.firstName && user?.lastName 
                                        ? `${user.firstName} ${user.lastName}`
                                        : 'Usuário'
                                    }
                                </h1>
                                <p className="text-slate-600 mb-4">{user?.email}</p>
                                
                                {/* Role Badge */}
                                <div className="flex items-center space-x-3 mb-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(user?.role || '')}`}>
                                        {user?.role}
                                    </span>
                                    <div className="flex items-center space-x-1">
                                        <div className={`w-2 h-2 rounded-full ${user?.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        <span className="text-sm text-slate-600">
                                            {user?.isActive ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </div>
                                </div>

                                {/* Metadata */}
                                <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 text-sm text-slate-500">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        <span>Criado em {user?.createdAt && formatDate(user.createdAt)}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                        </svg>
                                        <span>Atualizado em {user?.updatedAt && formatDate(user.updatedAt)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="inline-flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors duration-200 font-medium"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                                {isEditing ? 'Cancelar' : 'Editar Perfil'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                {isEditing && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 animate-in slide-in-from-top-4 duration-300">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                            <svg className="w-6 h-6 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            Editar Informações
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">
                                        Nome
                                    </label>
                                    <input
                                        {...register('firstName')}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                                        placeholder="Digite seu nome"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">
                                        Sobrenome
                                    </label>
                                    <input
                                        {...register('lastName')}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                                        placeholder="Digite seu sobrenome"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    {...register('email')}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                                    placeholder="Digite seu email"
                                />
                            </div>

                            <div className="flex justify-end space-x-4 pt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-3 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-colors duration-200"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={!isDirty || isSubmitting}
                                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            <span>Salvando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <span>Salvar Alterações</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-white  shadow-lg p-6 border-l-4 border-indigo-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Status da Conta</p>
                                <p className="text-2xl font-bold text-slate-800">
                                    {user?.isActive ? 'Ativa' : 'Inativa'}
                                </p>
                            </div>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${user?.isActive ? 'bg-green-100' : 'bg-red-100'}`}>
                                <svg className={`w-6 h-6 ${user?.isActive ? 'text-green-600' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white  shadow-lg p-6 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Tipo de Usuário</p>
                                <p className="text-2xl font-bold text-slate-800">{user?.role}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white  shadow-lg p-6 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Membro desde</p>
                                <p className="text-lg font-bold text-slate-800">
                                    {user?.createdAt && new Date(user.createdAt).getFullYear()}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}