import { axiosInstance } from '../../instance';

interface IAddPlanDto {
    dealId: number;
    count: number;
    date: Date;
}

export const addPlan = (data: IAddPlanDto) => {
    return axiosInstance.post('/long-plans', {
        ...data,
        date: formatDate(data.date),
    });
};

const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date
        .getDate()
        .toString()
        .padStart(2, '0')}`;
};
