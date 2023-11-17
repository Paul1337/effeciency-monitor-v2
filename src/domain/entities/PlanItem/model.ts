import { IDeal } from '../Deal/model';

export enum EPlanType {
    Daily,
    Long,
}

export type TWeekdaysCount = [number, number, number, number, number, number, number];

export interface IDailyPlan {
    deal: IDeal;
    weekdaysCount: TWeekdaysCount;
    startDate: string;
    id: string;
}

export interface IPlanItem {
    deal: IDeal;
    count: number;
    date: string;
    startDate: string;
    id: string;
}
