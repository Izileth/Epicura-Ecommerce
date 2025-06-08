// src/hooks/useUser.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import { UserService } from '@/services/user';
import useUserStore from '@/store/user';
import { useAuth } from './useAuth';
import type { User } from '@/types/user';

export const useUser = () => {
    const { currentUser, setUser, clearUser, setLoading, setError } = useUserStore();
    const { signOut } = useAuth();

    // Consulta dos dados do usuário
    const { refetch: fetchUser } = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
        setLoading(true);
        try {
            const user = await UserService.getMe();
            setUser(user);
            return user;
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Unknown error');
            throw error;
        } finally {
            setLoading(false);
        }
        },
        enabled: false, // Desativa execução automática
    });

    // Mutação para atualizar usuário
    const updateUserMutation = useMutation({
        mutationFn: UserService.updateUser,
        onSuccess: (updatedUser) => {
        setUser(updatedUser as User);
        },
        onError: (error) => {
        setError(error instanceof Error ? error.message : 'Update failed');
        },
    });

    // Mutação para deletar usuário
    const deleteUserMutation = useMutation({
        mutationFn: UserService.deleteUser,
        onSuccess: () => {
        clearUser();
        signOut(); // Desloga após deletar
        },
        onError: (error) => {
        setError(error instanceof Error ? error.message : 'Deletion failed');
        },
    });

    return {
        user: currentUser,
        isLoading: useUserStore.getState().isLoading,
        error: useUserStore.getState().error,
        fetchUser,
        updateUser: updateUserMutation.mutateAsync,
        deleteUser: deleteUserMutation.mutateAsync,
    };
};