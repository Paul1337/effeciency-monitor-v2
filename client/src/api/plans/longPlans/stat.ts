import { axiosInstance } from '../../instance';

export const getStat = async () => {
    return axiosInstance.get('/long-plans/stat').then(res => res.data);
};
