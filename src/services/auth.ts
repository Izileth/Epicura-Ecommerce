import api from './api';
import type { SignIn, SignUp } from '@/types/auth';
import type { AuthResponse } from '@/types/reponse';

export const AuthService = {
    async signUp(data: SignUp): Promise<AuthResponse> {
        const response = await api.post('/auth/signup', data);
        return response.data;
    },

    async signIn(data: SignIn): Promise<AuthResponse> {
        const response = await api.post('/auth/signin', data);
        return response.data;
    },

    async signOut(): Promise<void> {
        await api.post('/auth/signout');
    },
};