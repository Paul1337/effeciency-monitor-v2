import { axiosInstance } from '../../instance';

export const getDailyRelativeStat = async (planId: number) => {
    return axiosInstance.get(`/daily-plans/${planId}/stat/daily-relative`).then(res => res.data);
};

export const getAccumulationStat = async (planId: number) => {
    return axiosInstance.get(`/daily-plans/${planId}/stat/accumulation`).then(res => res.data);
};

export const getAccumulationRelativeStat = async (planId: number) => {
    return axiosInstance.get(`/daily-plans/${planId}/stat/accumulation-relative`).then(res => res.data);
};
