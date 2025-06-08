// src/components/Profile.tsx
import { useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import { useForm } from 'react-hook-form';
import type { UpdateUser, User } from '@/types/user';
export function ProfilePage() {
    const { user, isLoading, fetchUser, updateUser } = useUser();
    const { register, handleSubmit, reset } = useForm<UpdateUser>();

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
        // Feedback visual de sucesso pode ser adicionado aqui
        } catch (error) {
        console.error('Failed to update user:', error);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="max-w-xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Meu Perfil</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
            <label className="block mb-1">First Name</label>
            <input 
                {...register('firstName')} 
                className="w-full p-2 border rounded"
            />
            </div>
            
            <div>
            <label className="block mb-1">Last Name</label>
            <input 
                {...register('lastName')} 
                className="w-full p-2 border rounded"
            />
            </div>
            
            <div>
            <label className="block mb-1">Email</label>
            <input 
                type="email"
                {...register('email')} 
                className="w-full p-2 border rounded"
            />
            </div>
            
            <button 
            type="submit" 
            className="bg-zinc-950 text-white px-4 py-2 rounded hover:bg-zinc-800 disabled:bg-zinc-800 disabled:opacity-50"
            disabled={isLoading}
            >
            {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
        </form>
        </div>
    );
}