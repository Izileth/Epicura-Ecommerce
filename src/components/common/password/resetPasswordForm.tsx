import { usePassword } from '@/hooks/usePassword';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import type { ResetPassword } from '@/types/password';

interface ResetPasswordFormData {
    token?: string;
    code?: string;
    newPassword: string;
    confirmPassword: string;
}

export function ResetPasswordForm() {
    const navigate = useNavigate();
    const search = useSearch({ strict: false }) as { token?: string; code?: string };
    const [resetSuccess, setResetSuccess] = useState(false);

    const { 
        resetPassword, 
        isResetPasswordLoading, 
        resetPasswordError,
    } = usePassword({
        onResetPasswordSuccess: (data) => {
        setResetSuccess(true);
        // Salvar token se necessário
        if (data.token) {
            localStorage.setItem('access_token', data.token);
        }
        // Redirecionar após 3 segundos
        setTimeout(() => {
            navigate({ to: '/profile' });
        }, 3000);
        }
    });

    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        watch,
        setValue 
    } = useForm<ResetPasswordFormData>();

    const newPassword = watch('newPassword');

    // Preencher token/code da URL
    useEffect(() => {
        if (search.token) {
        setValue('token', search.token);
        }
        if (search.code) {
        setValue('code', search.code);
        }
    }, [search.token, search.code, setValue]);

    const onSubmit = async (data: ResetPasswordFormData) => {
        const payload: ResetPassword = {
        newPassword: data.newPassword
        };

        if (data.token) payload.token = data.token;
        if (data.code) payload.code = data.code;

        await resetPassword(payload);
    };

    if (resetSuccess) {
        return (
        <div className="max-w-xl w-full mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="text-center">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 text-green-600">Senha Redefinida!</h2>
                <p className="text-gray-600">
                Sua senha foi alterada com sucesso.
                </p>
            </div>

            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                Redirecionando para o dashboard em 3 segundos...
                </p>
            </div>

            <Link 
                to="/profile"
                className="inline-block bg-zinc-950 text-white py-2 px-6 rounded hover:bg-zinc-800"
            >
                Ir para Dashboard
            </Link>
            </div>
        </div>
        );
    }

    return (
        <div className="max-w-xl w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Redefinir Senha</h2>
        <p className="text-gray-600 text-center mb-6">
            Digite sua nova senha abaixo
        </p>
        
        {resetPasswordError && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {resetPasswordError}
            </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Token field (hidden se vier da URL) */}
            {!search.token && (
            <div>
                <label htmlFor="token" className="block mb-1 font-medium">
                Token de Recuperação
                </label>
                <input
                id="token"
                type="text"
                {...register('token')}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-zinc-950"
                placeholder="Cole o token aqui"
                />
            </div>
            )}

            {/* Code field (hidden se vier da URL) */}
            {!search.code && (
            <div>
                <label htmlFor="code" className="block mb-1 font-medium">
                Código de Verificação
                </label>
                <input
                id="code"
                type="text"
                {...register('code')}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-zinc-950"
                placeholder="Digite o código recebido"
                />
            </div>
            )}

            <div>
            <label htmlFor="newPassword" className="block mb-1 font-medium">
                Nova Senha
            </label>
            <input
                id="newPassword"
                type="password"
                {...register('newPassword', { 
                required: 'Nova senha é obrigatória',
                minLength: {
                    value: 6,
                    message: 'Senha deve ter pelo menos 6 caracteres'
                }
                })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-zinc-950"
                placeholder="Digite sua nova senha"
            />
            {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
            )}
            </div>

            <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-medium">
                Confirmar Nova Senha
            </label>
            <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', { 
                required: 'Confirmação de senha é obrigatória',
                validate: value => value === newPassword || 'Senhas não coincidem'
                })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-zinc-950"
                placeholder="Confirme sua nova senha"
            />
            {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
            </div>

            <button
            type="submit"
            disabled={isResetPasswordLoading}
            className="w-full bg-zinc-950 text-white py-2 px-4 rounded hover:bg-zinc-800 disabled:bg-gray-300"
            >
            {isResetPasswordLoading ? 'Redefinindo...' : 'Redefinir Senha'}
            </button>

            <div className="flex flex-row justify-center items-center text-center mt-4">
            <Link to="/login" className="text-zinc-950 hover:underline">
                Voltar ao login
            </Link>
            </div>
        </form>
        </div>
    );
}