export interface User {
    id: number;
    email: string;
    password: string;
}

export interface CreateUserParams {
    email: string;
    password: string;
}
