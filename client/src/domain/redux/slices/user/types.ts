export interface IUserData {
    email: string;
}

export interface IUserSliceScheme {
    isLogged: boolean;
    userData: IUserData | null;
}
