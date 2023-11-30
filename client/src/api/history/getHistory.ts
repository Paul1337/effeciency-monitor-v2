import { IDBHistoryItem } from '../../dbMapping/history';
import { axiosInstance } from '../instance';

export const getHistory = async () => {
    return axiosInstance.get<Array<IDBHistoryItem>>('/history/').then(res => res.data);
};
