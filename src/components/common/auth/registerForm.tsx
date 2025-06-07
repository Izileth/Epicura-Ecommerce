// src/components/auth/RegisterForm.tsx
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import type { SignUp } from '@/types/auth';
import { Link } from '@tanstack/react-router';

export function RegisterForm() {
    const { signUp, isLoading, error } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<SignUp>();

    const onSubmit = async (data: SignUp) => {
        await signUp(data);
    };

    return (
        <div className="max-w-xl w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registrar-se</h2>
        
        {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {typeof error === 'string' ? error : 'Erro ao criar conta'}
            </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
            <label htmlFor="name" className="block mb-1 font-medium">
                Email
            </label>
            <input
                id="name"
                {...register('email', { required: 'Email é obrigatório' })}
                className="w-full p-2 border rounded"
            />
            {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            </div>

            <div>
            <label htmlFor="email" className="block mb-1 font-medium">
                Confirmar Email
            </label>
            <input
                id="email"
                type="email"
                {...register('email', { 
                required: 'Cofirme o seu email obrigatório',
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido'
                }
                })}
                className="w-full p-2 border rounded"
            />
            {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            </div>

            <div>
            <label htmlFor="password" className="block mb-1 font-medium">
                Senha
            </label>
            <input
                id="password"
                type="password"
                {...register('password', { 
                required: 'Senha é obrigatória',
                minLength: {
                    value: 6,
                    message: 'Senha deve ter pelo menos 6 caracteres'
                }
                })}
                className="w-full p-2 border rounded"
            />
            {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            </div>

            <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-zinc-950 text-white py-2 px-4 rounded hover:bg-zinc-800 disabled:bg-green-300"
            >
            {isLoading ? 'Criando conta...' : 'Criar Conta'}
            </button>

            <div className="text-center mt-4">
            <Link to="/login" className="text-zinc-950 hover:underline">
                Já tem uma conta? Faça login
            </Link>
            </div>
        </form>
        </div>
    );
}