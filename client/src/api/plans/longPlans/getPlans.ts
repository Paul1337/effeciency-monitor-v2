import { IDBLongPlan } from '../../../dbMapping/longPlan';
import { axiosInstance } from '../../instance';

export const getPlans = async () => {
    return axiosInstance.get<IDBLongPlan[]>(`/long-plans/`).then(res => res.data);
};
