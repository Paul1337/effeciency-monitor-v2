import { axiosInstance } from '../instance';

interface IRemoveDealDto {
    dealId: number;
}

export const removeDeal = (dto: IRemoveDealDto) => {
    return axiosInstance.delete(`/deals/${dto.dealId}`);
};
