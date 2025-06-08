// src/stores/auth.store.ts
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
  } | null;
  isAuthenticated: boolean;
}
interface AuthActions {
    setUser: (user: User) => void;
    clearUser: () => void;
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
        
        clearUser: () => set({ 
            user: null, 
            isAuthenticated: false 
        }),
        }),
        {
        name: 'auth-storage', 
        partialize: (state) => ({ 
            user: state.user, 
            isAuthenticated: state.isAuthenticated 
        }), 
        }
    )
);

export default useAuthStore;