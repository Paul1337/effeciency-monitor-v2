import { IHistoryItem } from '../domain/models/HistoryItem/model';
import { stringifyDate } from '../lib/dates/datesOperations';

export interface IDBHistoryItem {
    id: number;
    deal_id: number;
    done_count: number;
    date: string;
    user_id: number;
    deal_name: string;
}

export const mapHistory = (items: IDBHistoryItem[]): IHistoryItem[] => {
    const historyTable: Record<string, IDBHistoryItem[]> = {};

    for (const item of items) {
        item.date = stringifyDate(new Date(item.date));
    }

    for (const item of items) {
        if (!historyTable[item.date]) historyTable[item.date] = [];
        historyTable[item.date].push(item);
    }

    return Object.entries(historyTable).map(([key, historyItems]) => {
        const done: Record<string, number> = {};

        historyItems.forEach(item => {
            done[item.deal_name] = item.done_count;
        });

        return {
            date: key,
            done,
        };
    });
};
