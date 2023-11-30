import { IDBDailyPlan } from '../../../dbMapping/dailyPlan';
import { axiosInstance } from '../../instance';

export const getPlans = async () => {
    return axiosInstance.get<IDBDailyPlan[]>('/daily-plans/').then(res => res.data);
};
