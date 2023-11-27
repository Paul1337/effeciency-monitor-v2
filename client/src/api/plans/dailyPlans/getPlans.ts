import { axiosInstance } from '../../instance';

export const getPlans = () => {
    return axiosInstance.get(`/daily-plans/`).then(res => res.data);
};
