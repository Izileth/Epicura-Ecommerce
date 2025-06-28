
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '@/services/auth';
import useAuthStore from '@/store/auth';
import { useNavigate } from '@tanstack/react-router';
import { useCartStore } from '@/store/cart';
import type { AuthResponse } from '@/types/reponse';


export const useAuth = () => {
    const queryClient = useQueryClient();
    const {clearCart, initializeCart} = useCartStore()
    const { setUser, clearUser } = useAuthStore();
    const { isAuthenticated, user } = useAuthStore(); // Adicione esta linha

    const navigate = useNavigate();


     const handleAuthSuccess = (data: AuthResponse) => {
        // Armazena o token JWT
        localStorage.setItem('access_token', data.token);
        console.log("Dados recebidos no hook:", data);
        if (data.refreshToken) {
            localStorage.setItem('refresh_token', data.refreshToken);
        } 
          
        // Atualiza o store com os dados do usuário
        setUser({
            id: data.user.id,
            email: data.user.email,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            role: data.user.role,
            isActive: data.user.isActive,
            createdAt: data.user.createdAt,
            updatedAt: data.user.updatedAt,
            reset_code: data.user.reset_code
        });
        
      

        

        initializeCart(data.user.id);
        navigate({ to: '/profile' });
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        clearUser();
        clearCart();
        queryClient.clear();
        navigate({ to: '/login' }); // Login
    };

    const signInMutation = useMutation({
        mutationFn: AuthService.signIn,
        onSuccess: handleAuthSuccess,

        onError: (error: string) => {
        console.error('Login failed:', error);
        },
    });

    const signUpMutation = useMutation({
        mutationFn: AuthService.signUp,
        onSuccess: handleAuthSuccess,
    });

    const signOutMutation = useMutation({
        mutationFn: AuthService.signOut,
        onSuccess: handleLogout,
    });

    return {
        signIn: signInMutation.mutateAsync,
        signUp: signUpMutation.mutateAsync,
        signOut: signOutMutation.mutateAsync,
        isLoading: signInMutation.isPending || signUpMutation.isPending,
        error: signInMutation.error || signUpMutation.error,
        isAuthenticated,
        user 
    };
};