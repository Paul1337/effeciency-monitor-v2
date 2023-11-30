import { IDeal } from '../domain/models/Deal/model';
import { IPlanItem } from '../domain/models/PlanItem/model';
import { stringifyDate } from '../lib/dates/datesOperations';

export interface IDBLongPlan {
    id: number;
    deal_id: number;
    count: number;
    date: string;
    start_date: string;
    user_id: number;
}

export const mapLongPlan = (plan: IDBLongPlan, deals: IDeal[]): IPlanItem => ({
    id: plan.id,
    startDate: plan.start_date,
    count: plan.count,
    date: stringifyDate(new Date(plan.date)),
    deal: deals.find(deal => deal.id === plan.deal_id) as IDeal,
});

export const mapLongPlans = (plans: IDBLongPlan[], deals: IDeal[]) => {
    const mapFn = (plan: IDBLongPlan) => mapLongPlan(plan, deals);
    return plans.map(mapFn);
};
