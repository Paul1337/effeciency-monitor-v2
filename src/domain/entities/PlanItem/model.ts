import { IDeal } from '../Deal/model';

export enum EPlanType {
    Daily,
    Long,
}

export interface IDailyPlan {
    deal: IDeal;
    count: number;
    weekdays?: Array<number>;
}

export interface IPlanItem {
    deal: IDeal;
    count: number;
    date: string;
    startDate: string;
}
