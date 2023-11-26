import { axiosInstance } from '../instance';

interface IRegisterParams {
    email: string;
    password: string;
}

export const register = async (data: IRegisterParams) => {
    return axiosInstance.post('/auth/reg', data).then(res => res.data);
};
