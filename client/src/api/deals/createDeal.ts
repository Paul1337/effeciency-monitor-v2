import { axiosInstance } from '../instance';

export const createDeal = (name: string) => {
    return axiosInstance
        .post('/deals', {
            name,
        })
        .then((res) => res.data);
};
