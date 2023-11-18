import { IDeal } from '../Deal/model';

export interface IHistoryItem {
    done: Record<IDeal['name'], number>;
    date: string;
}
