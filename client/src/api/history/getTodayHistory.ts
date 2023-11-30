import { IDBHistoryItem } from '../../dbMapping/history';
import { axiosInstance } from '../instance';

export const getTodayHistory = async () => {
    return axiosInstance.get<Array<IDBHistoryItem>>('/history/today').then(res => res.data);
};
