import { axiosInstance } from '../../instance';

interface IRemovePlanDto {
    planId: number;
}

export const removePlan = (data: IRemovePlanDto) => {
    return axiosInstance.delete(`/long-plans/${data.planId}`);
};
