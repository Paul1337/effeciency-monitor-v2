import { IDBDeal } from '../../dbMapping/deal';
import { axiosInstance } from '../instance';

export const getDeals = async () => {
    return axiosInstance.get<Array<IDBDeal>>(`/deals/`).then(res => res.data);
};
