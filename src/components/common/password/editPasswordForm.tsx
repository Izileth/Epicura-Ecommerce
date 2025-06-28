import { useState, useEffect } from 'react';
import { usePassword } from '@/hooks/usePassword';
import { useUser } from '@/hooks/useUser';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft,Shield, User, Check, AlertCircle, Loader2, EyeOff, Eye, Trash2 } from 'lucide-react';

export const SettingsPasswordForm = () => {
    const navigate = useNavigate()
    const { updateUser, isLoading: isUserLoading } = useUser()
    const { signOut, user } = useAuth()

    const { resetPassword, isResetPasswordLoading, isResetPasswordSuccess, resetPasswordError } = usePassword({
        autoClearSuccess: 5,
        autoClearErrors: 5,
        onResetPasswordSuccess: () => {
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        },
    })

    useEffect(() => {
        console.log("User no estado:", user);
        console.log("Reset code disponível:", user?.reset_code);
        console.log("Reset code length:", user?.reset_code?.length);
    }, [user]);
    

    // Estados para o formulário de senha
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    })

    // Estados para o formulário de perfil
    const [profileForm, setProfileForm] = useState({
        name: user?.firstName || "",
        email: user?.email || "",
    })

    // Estados para feedback
    const [profileSuccess, setProfileSuccess] = useState(false)
    const [profileError, setProfileError] = useState("")

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
        alert("As novas senhas não coincidem")
        return
        }
        
        if (!user?.reset_code || user.reset_code.length < 6) {
            alert("Código de reset inválido. Por favor, faça login novamente.");
            return;
        }

        try {
        await resetPassword({
            email: user?.email ?? '',
            code: user?.reset_code?? '', // Garanta que está passando o código
            newPassword,
            //currentPassword, // Adicione se necessário para sua API
            token: "", // Mantenha se sua API exigi
        })
        } catch (error) {
        console.error("Erro ao alterar senha:", error)
        }
    }

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
        await updateUser({
            id: user?.id ?? "",
            email: user?.email ?? "",
            firstName: profileForm.name,
        })
        setProfileSuccess(true)
        setTimeout(() => setProfileSuccess(false), 3000)
        } catch (error) {
        console.error("Erro ao atualizar perfil:", error)
        setProfileError("Erro ao atualizar perfil")
        setTimeout(() => setProfileError(""), 3000)
        }
    }

    const handleDeleteAccount = async () => {
        if (confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.")) {
        try {
            await signOut()
            navigate({ to: "/" })
        } catch (error) {
            console.error("Erro ao excluir conta:", error)
        }
        }
    }

    const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
        setShowPasswords((prev) => ({
        ...prev,
        [field]: !prev[field],
        }))
    }
    
    const currentYear = new Date().getFullYear()

    return (
        <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Header */}
            <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl md:text-4xl font-light text-black tracking-wide">Configurações</h1>
                <button
                onClick={() => navigate({ to: "/" })}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-200 font-light"
                >
                <ArrowLeft size={16} className="stroke-1" />
                Voltar
                </button>
            </div>
            <div className="w-16 h-px bg-black"></div>
            </div>

            <div className="space-y-8">
            {/* Profile Section */}
            <div className="bg-white border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <User size={20} className="text-black stroke-1" />
                    <h2 className="text-xl font-light text-black">Informações do Perfil</h2>
                </div>
                </div>
                <div className="p-6">
                {/* Success/Error Messages */}
                {profileSuccess && (
                    <div className="mb-6 p-4 border border-black bg-black text-white">
                    <div className="flex items-center gap-2">
                        <Check size={16} className="stroke-1" />
                        <span className="font-light">Perfil atualizado com sucesso!</span>
                    </div>
                    </div>
                )}

                {profileError && (
                    <div className="mb-6 p-4 border border-gray-300 bg-gray-50 text-black">
                    <div className="flex items-center gap-2">
                        <AlertCircle size={16} className="stroke-1" />
                        <span className="font-light">{profileError}</span>
                    </div>
                    </div>
                )}

                <form onSubmit={handleProfileSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-light text-black mb-2">
                        Nome
                        </label>
                        <input
                        type="text"
                        id="name"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors duration-200 font-light bg-white"
                        disabled={isUserLoading}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-light text-black mb-2">
                        Email
                        </label>
                        <input
                        type="email"
                        id="email"
                        value={profileForm.email}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-200 bg-gray-50 font-light text-gray-600"
                        />
                    </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        disabled={isUserLoading}
                        className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors duration-200 font-light disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isUserLoading ? (
                        <>
                            <Loader2 size={16} className="animate-spin stroke-1" />
                            Salvando...
                        </>
                        ) : (
                        "Salvar Alterações"
                        )}
                    </button>
                    </div>
                </form>
                </div>
            </div>

            {/* Security Section */}
            <div className="bg-white border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <Shield size={20} className="text-black stroke-1" />
                    <h2 className="text-xl font-light text-black">Segurança</h2>
                </div>
                </div>
                <div className="p-6">
                {/* Success/Error Messages */}
                {isResetPasswordSuccess && (
                    <div className="mb-6 p-4 border border-black bg-black text-white">
                    <div className="flex items-center gap-2">
                        <Check size={16} className="stroke-1" />
                        <span className="font-light">Senha alterada com sucesso!</span>
                    </div>
                    </div>
                )}

                {resetPasswordError && (
                    <div className="mb-6 p-4 border border-gray-300 bg-gray-50 text-black">
                    <div className="flex items-center gap-2">
                        <AlertCircle size={16} className="stroke-1" />
                        <span className="font-light">{resetPasswordError}</span>
                    </div>
                    </div>
                )}

                <form onSubmit={handlePasswordSubmit}>
                    <div className="space-y-6">
                    <div>
                        <label htmlFor="current-password" className="block text-sm font-light text-black mb-2">
                        Senha atual
                        </label>
                        <div className="relative">
                        <input
                            type={showPasswords.current ? "text" : "password"}
                            id="current-password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-3 pr-12 border border-gray-200 focus:border-black focus:outline-none transition-colors duration-200 font-light bg-white"
                            required
                            disabled={isResetPasswordLoading}
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility("current")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors duration-200"
                        >
                            {showPasswords.current ? (
                            <EyeOff size={16} className="stroke-1" />
                            ) : (
                            <Eye size={16} className="stroke-1" />
                            )}
                        </button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="new-password" className="block text-sm font-light text-black mb-2">
                        Nova senha
                        </label>
                        <div className="relative">
                        <input
                            type={showPasswords.new ? "text" : "password"}
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-3 pr-12 border border-gray-200 focus:border-black focus:outline-none transition-colors duration-200 font-light bg-white"
                            required
                            minLength={8}
                            disabled={isResetPasswordLoading}
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility("new")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors duration-200"
                        >
                            {showPasswords.new ? (
                            <EyeOff size={16} className="stroke-1" />
                            ) : (
                            <Eye size={16} className="stroke-1" />
                            )}
                        </button>
                        </div>
                        <p className="mt-1 text-xs font-light text-gray-500">Mínimo de 8 caracteres</p>
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-light text-black mb-2">
                        Confirmar nova senha
                        </label>
                        <div className="relative">
                        <input
                            type={showPasswords.confirm ? "text" : "password"}
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 pr-12 border border-gray-200 focus:border-black focus:outline-none transition-colors duration-200 font-light bg-white"
                            required
                            minLength={8}
                            disabled={isResetPasswordLoading}
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility("confirm")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors duration-200"
                        >
                            {showPasswords.confirm ? (
                            <EyeOff size={16} className="stroke-1" />
                            ) : (
                            <Eye size={16} className="stroke-1" />
                            )}
                        </button>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                        type="submit"
                        disabled={isResetPasswordLoading}
                        className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors duration-200 font-light disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                        {isResetPasswordLoading ? (
                            <>
                            <Loader2 size={16} className="animate-spin stroke-1" />
                            Alterando...
                            </>
                        ) : (
                            "Alterar Senha"
                        )}
                        </button>
                    </div>
                    </div>
                </form>
                </div>
            </div>

            {/* Account Section */}
            <div className="bg-white border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <Trash2 size={20} className="text-black stroke-1" />
                    <h2 className="text-xl font-light text-black">Gerenciar Conta</h2>
                </div>
                </div>
                <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                    <h3 className="text-lg font-light text-black mb-2">Excluir conta</h3>
                    <p className="text-sm font-light text-gray-600 leading-relaxed max-w-md">
                        Uma vez excluída, sua conta não poderá ser recuperada. Todos os seus dados serão permanentemente
                        removidos.
                    </p>
                    </div>
                    <button
                    type="button"
                    onClick={handleDeleteAccount}
                    className="px-6 py-3 border border-gray-300 text-black hover:border-black hover:bg-black hover:text-white transition-all duration-200 font-light flex items-center gap-2 self-start"
                    >
                    <Trash2 size={16} className="stroke-1" />
                    Excluir Conta
                    </button>
                </div>
                </div>
            </div>
            </div>

            {/* Copyright Notice */}
            <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-center text-xs font-light text-gray-400">
                © {currentYear} Epicura Brand. Todos os direitos reservados.
            </p>
            </div>
        </div>
        </div>
    )
}