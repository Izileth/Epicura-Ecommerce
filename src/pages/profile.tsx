import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { useForm } from 'react-hook-form';
import type { UpdateUser, User } from '@/types/user';
import { User2, Edit3, Calendar, RefreshCw, Check, X, Save, AlertCircle } from "lucide-react"
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
    const getRoleLabel = (role: string) => {
        switch (role.toLowerCase()) {
        case "admin":
            return "Administrador"
        case "user":
            return "Usuário"
        case "moderator":
            return "Moderador"
        default:
            return role
        }
    }
    const currentYear = new Date().getFullYear()

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
        <div className="min-h-screen bg-gray-50">
        {/* Success Message */}
        {showSuccessMessage && (
            <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-2 duration-300">
            <div className="bg-black text-white px-6 py-3 border border-gray-200 flex items-center space-x-3">
                <Check size={16} />
                <span className="font-light">Perfil atualizado com sucesso</span>
            </div>
            </div>
        )}

        <div className="container mx-auto px-4 py-12 max-w-4xl">
            {/* Header Section */}
            <div className="bg-white border border-gray-200 mb-8">
            <div className="h-24 bg-gray-100 relative">
                <div className="absolute -bottom-12 left-8">
                <div className="w-24 h-24 bg-white border-2 border-gray-200 flex items-center justify-center">
                    <span className="text-2xl font-light text-gray-700">
                    {getInitials(user?.firstName, user?.lastName)}
                    </span>
                </div>
                </div>
            </div>

            <div className="pt-16 pb-8 px-8">
                <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h1 className="text-2xl font-light text-black mb-2">
                    {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "Usuário"}
                    </h1>
                    <p className="text-gray-600 font-light mb-6">{user?.email}</p>

                    {/* Status and Role */}
                    <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-light text-gray-600">Status:</span>
                        <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 ${user?.isActive ? "bg-black" : "bg-gray-400"}`}></div>
                        <span className="text-sm font-light text-gray-900">{user?.isActive ? "Ativo" : "Inativo"}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-light text-gray-600">Função:</span>
                        <span className="text-sm font-light text-gray-900 px-3 py-1 border border-gray-200 bg-gray-50">
                        {getRoleLabel(user?.role || "")}
                        </span>
                    </div>
                    </div>

                    {/* Metadata */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-light text-gray-500">
                    <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>Criado em {user?.createdAt && formatDate(user.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RefreshCw size={16} />
                        <span>Atualizado em {user?.updatedAt && formatDate(user.updatedAt)}</span>
                    </div>
                    </div>
                </div>

                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-200 hover:bg-gray-50 transition-colors duration-200 font-light"
                >
                    {isEditing ? <X size={16} /> : <Edit3 size={16} />}
                    <span>{isEditing ? "Cancelar" : "Editar"}</span>
                </button>
                </div>
            </div>
            </div>

            {/* Edit Form */}
            {isEditing && (
            <div className="bg-white border border-gray-200 p-8 mb-8 animate-in slide-in-from-top-4 duration-300">
                <h2 className="text-xl font-light text-black mb-6 flex items-center space-x-3">
                <User2 size={20} />
                <span>Editar Informações</span>
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                    <label className="block text-sm font-light text-gray-700">Nome</label>
                    <input
                        {...register("firstName")}
                        className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors duration-200 bg-white font-light"
                        placeholder="Digite seu nome"
                    />
                    </div>

                    <div className="space-y-2">
                    <label className="block text-sm font-light text-gray-700">Sobrenome</label>
                    <input
                        {...register("lastName")}
                        className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors duration-200 bg-white font-light"
                        placeholder="Digite seu sobrenome"
                    />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-light text-gray-700">Email</label>
                    <input
                    type="email"
                    {...register("email")}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors duration-200 bg-white font-light"
                    placeholder="Digite seu email"
                    />
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
                    <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 text-gray-600 border border-gray-200 hover:bg-gray-50 font-light transition-colors duration-200"
                    >
                    Cancelar
                    </button>
                    <button
                    type="submit"
                    disabled={!isDirty || isSubmitting}
                    className="px-6 py-3 bg-black text-white hover:bg-gray-800 font-light transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                    {isSubmitting ? (
                        <>
                        <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Salvando...</span>
                        </>
                    ) : (
                        <>
                        <Save size={16} />
                        <span>Salvar Alterações</span>
                        </>
                    )}
                    </button>
                </div>
                </form>
            </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-light text-gray-600 mb-1">Status da Conta</p>
                    <p className="text-xl font-light text-black">{user?.isActive ? "Ativa" : "Inativa"}</p>
                </div>
                <div className="w-12 h-12 border border-gray-200 flex items-center justify-center">
                    {user?.isActive ? (
                    <Check size={20} className="text-black" />
                    ) : (
                    <AlertCircle size={20} className="text-gray-400" />
                    )}
                </div>
                </div>
            </div>

            <div className="bg-white border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-light text-gray-600 mb-1">Tipo de Usuário</p>
                    <p className="text-xl font-light text-black">{getRoleLabel(user?.role || "")}</p>
                </div>
                <div className="w-12 h-12 border border-gray-200 flex items-center justify-center">
                    <User2 size={20} className="text-black" />
                </div>
                </div>
            </div>

            <div className="bg-white border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-light text-gray-600 mb-1">Membro desde</p>
                    <p className="text-xl font-light text-black">
                    {user?.createdAt && new Date(user.createdAt).getFullYear()}
                    </p>
                </div>
                <div className="w-12 h-12 border border-gray-200 flex items-center justify-center">
                    <Calendar size={20} className="text-black" />
                </div>
                </div>
            </div>
            </div>

            {/* Copyright Notice */}
            <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-xs font-light text-gray-400">
                © {currentYear} Epicura Brand. Todos os direitos reservados.
            </p>
            </div>
        </div>
        </div>
    )
}