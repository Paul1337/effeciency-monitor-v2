import { axiosInstance } from '../instance';

interface IDoDealDto {
    dealId: number;
}

export const doDeal = (doDealDto: IDoDealDto) => {
    return updateDeal({
        dealId: doDealDto.dealId,
        count: 1,
    });
};

interface IUnDoDealDto {
    dealId: number;
}

export const unDoDeal = (undoDealDto: IUnDoDealDto) => {
    return updateDeal({
        dealId: undoDealDto.dealId,
        count: -1,
    });
};

interface IUpdateDealDto {
    dealId: number;
    count: number;
}

const updateDeal = (dto: IUpdateDealDto) => {
    return axiosInstance.post('/history/do-deal', dto).then((res) => res.data);
};
