
export interface ResetPassword {
    token?: string;
    code?: string;
    email: string;
    newPassword: string;
}

export interface ForgotPassword {
    message: string;
}

export interface RefreshToken {
    access_token: string;
    refresh_token?: string;
}