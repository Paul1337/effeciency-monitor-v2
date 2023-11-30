import { axiosInstance } from '../instance';

export const createDeal = async (name: string): Promise<number> => {
    return axiosInstance
        .post('/deals', {
            name,
        })
        .then(res => res.data);
};
