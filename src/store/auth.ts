
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/user';


interface AuthState {
    user: {
        id: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
        role: string;
        isActive: boolean;
        createdAt?: string;
        updatedAt?: string;
        reset_code?: string;
    } | null;
    isAuthenticated: boolean;
}
interface AuthActions {
    setUser: (user: User) => void;
    clearUser: () => void;
    setResetCode: (code: string) => void;
}

const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            checkAuth: () => {
                const token = localStorage.getItem('access_token');
                return !!token;
            },
                
            setUser: (user) => set({ 
                user,
                isAuthenticated: !!user 
            }),
            setResetCode: (code) => set((state) => ({
                user: state.user ? { ...state.user, reset_code: code } : null
            })),
                    
            clearUser: () => set({ 
                user: null, 
                isAuthenticated: false 
            }),
        }),
        {
        name: 'auth-storage', 
        partialize: (state) => ({  
            user: state.user, 
            setResetCode: state.user?.reset_code,
            reset_code: state.user?.reset_code,
            isAuthenticated: state.isAuthenticated 
        }), 
        }
    )
);

export default useAuthStore;