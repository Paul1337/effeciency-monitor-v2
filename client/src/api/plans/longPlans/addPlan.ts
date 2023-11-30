import { axiosInstance } from '../../instance';

interface IAddPlanDto {
    dealId: number;
    count: number;
    date: string;
}

export const addPlan = async (data: IAddPlanDto): Promise<number> => {
    return axiosInstance
        .post('/long-plans', {
            ...data,
            date: data.date,
        })
        .then(res => res.data);
};
