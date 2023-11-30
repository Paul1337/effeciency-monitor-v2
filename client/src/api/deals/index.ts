import { createDeal } from './createDeal';
import { getDeals } from './getDeals';
import { doDeal, unDoDeal } from './manageDeal';
import { removeDeal } from './removeDeal';

export const dealsApi = {
    createDeal,
    doDeal,
    unDoDeal,
    removeDeal,
    getDeals: getDeals,
};
