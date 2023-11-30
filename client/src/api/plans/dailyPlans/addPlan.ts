import { axiosInstance } from '../../instance';

interface IAddPlanDto {
    dealId: number;
    weekdaysCount: [number, number, number, number, number, number, number];
}

export const addPlan = (data: IAddPlanDto): Promise<number> => {
    return axiosInstance.post('/daily-plans', data);
};
