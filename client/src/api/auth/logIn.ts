import { IUserData } from '../../domain/redux/slices/user/types';
import { axiosInstance } from '../instance';

interface ILogInParams {
    email: string;
    password: string;
}

interface ILoginResponse {
    data: {
        authToken: string;
        userData: IUserData;
    };
}

export const logIn = async (data: ILogInParams) => {
    return axiosInstance.post<any, ILoginResponse>('/auth/log_in', data).then(res => res.data);
};
