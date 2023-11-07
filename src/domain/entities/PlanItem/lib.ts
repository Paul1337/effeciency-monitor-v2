import { IDeal } from '../Deal/model';

interface IGenerateLongPlanIDParams {
    deal: IDeal;
    date: string;
    count: number;
}

export const generateLongPlanID = (plan: IGenerateLongPlanIDParams) => {
    return plan.deal.name + plan.date + plan.count.toString();
};

interface IGenerateDailyPlanIDParams {
    deal: IDeal;
    weekdays: Array<number>;
    count: number;
}

export const generateDailyPlanID = (plan: IGenerateDailyPlanIDParams) => {
    return plan.deal.name + plan.weekdays.toString() + plan.count.toString();
};
