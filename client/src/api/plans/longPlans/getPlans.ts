import { axiosInstance } from '../../instance';

export const getPlans = () => {
    return axiosInstance.get(`/long-plans/`).then(res => res.data);
};
