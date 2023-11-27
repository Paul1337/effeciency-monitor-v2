import { axiosInstance } from '../instance';

export const getDeals = () => {
    return axiosInstance.get(`/deals/`).then(res => res.data);
};
