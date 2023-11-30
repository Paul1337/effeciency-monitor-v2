import { IDeal } from '../domain/models/Deal/model';
import { IDailyPlan, TWeekdaysCount } from '../domain/models/PlanItem/model';
import { stringifyDate } from '../lib/dates/datesOperations';

export interface IDBDailyPlan {
    id: number;
    deal_id: number;
    weekdays_count: string;
    start_date: string;
    user_id: number;
}

export const mapDailyPlan = (plan: IDBDailyPlan, deals: IDeal[]): IDailyPlan => ({
    id: plan.id,
    startDate: stringifyDate(new Date(plan.start_date)),
    weekdaysCount: JSON.parse(plan.weekdays_count) as TWeekdaysCount,
    deal: deals.find(deal => deal.id === plan.deal_id) as IDeal,
});

export const mapDailyPlans = (plans: IDBDailyPlan[], deals: IDeal[]) => {
    const mapFn = (plan: IDBDailyPlan) => mapDailyPlan(plan, deals);
    return plans.map(mapFn);
};
