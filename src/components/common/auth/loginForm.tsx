// src/components/auth/LoginForm.tsx
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import type { SignIn } from '@/types/auth';
import { Link } from '@tanstack/react-router';

export function LoginForm() {
    const { signIn, isLoading, error } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<SignIn>();

    const onSubmit = async (data: SignIn) => {
        await signIn(data);
    };

    return (
        <div className="max-w-xl w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-center ">Bem Vindo De Volta!</h2>
        
        {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {typeof error === 'string' ? error : 'Credenciais inválidas'}
            </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
            <label htmlFor="email" className="block mb-1 font-medium">
                Email
            </label>
            <input
                id="email"
                type="email"
                {...register('email', { required: 'Email é obrigatório' })}
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
                {...register('password', { required: 'Senha é obrigatória' })}
                className="w-full p-2 border rounded"
            />
            {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            </div>

            <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-zinc-950 text-white py-2 px-4 rounded hover:bg-zinc-800 disabled:bg-blue-300"
            >
            {isLoading ? 'Entrando...' : 'Entrar'}
            </button>

            <div className="text-center mt-4">
            <Link to="/register" className="text-zinc-950 hover:underline">
                Criar uma conta
            </Link>
            </div>
        </form>
        </div>
    );
}