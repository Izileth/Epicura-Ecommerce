export interface SignIn {
    email: string
    password: string
}


export interface SignUp {
    email: string;     
    password: string;
    firstName?: string;
    lastName?: string;  
}

export interface SignOut {
    email: string
}
