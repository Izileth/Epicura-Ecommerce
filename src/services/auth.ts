import api from './api';
import type { SignIn, SignUp } from '@/types/auth';
import type { AuthResponse } from '@/types/reponse';

export const AuthService = {
    async signUp(data: SignUp): Promise<AuthResponse> {
        const response = await api.post('/auth/signup', data);
        console.log(response.data);

        return {
            token: response.data.access_token, // Mapeia access_token para token
            user: response.data // Extrai os dados do usuário
        };
    },

    async signIn(data: SignIn): Promise<AuthResponse> {
        const response = await api.post('/auth/signin', data);
        console.log(response.data);
        return {
            token: response.data.access_token, // Mapeia access_token para token
            user: response.data.data // Extrai os dados do usuário
        }
    },

    async signOut(): Promise<void> {
        await api.post('/auth/signout');
    },
};