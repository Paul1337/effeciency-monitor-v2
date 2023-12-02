import { IDBHistoryItem } from '../../dbMapping/history';
import { axiosInstance } from '../instance';

export const getHistory = async () => {
    return axiosInstance.get<Array<IDBHistoryItem>>('/history/').then(res => res.data);
};

export const getLastHistory = async (lastDaysCount: number) => {
    return axiosInstance
        .get<Array<IDBHistoryItem>>(`/history/recent/${lastDaysCount}`)
        .then(res => res.data);
};
