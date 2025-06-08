// src/stores/user.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/user';

interface UserState {
    currentUser: User | null;
    isLoading: boolean;
    error: string | null;
}

interface UserActions {
    setUser: (user: User) => void;
    clearUser: () => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    }

const useUserStore = create<UserState & UserActions>()(
    persist(
        (set) => ({
        currentUser: null,
        isLoading: false,
        error: null,
        
        setUser: (user) => set({ currentUser: user }),
        clearUser: () => set({ currentUser: null }),
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
        }),
        {
        name: 'user-storage',
        partialize: (state) => ({ 
            currentUser: state.currentUser 
        }),
        }
    )
);

export default useUserStore;