import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IHistorySliceScheme } from './types';
import { IHistoryItem } from '../../../models/HistoryItem/model';
import { IDeal } from '../../../models/Deal/model';
import { sameDay } from '../../../../lib/dates/compareDates';

const initialState: IHistorySliceScheme = {
    items: [],
};

export interface IAccomplishDealPayload {
    date: string;
    count: number;
    deal: IDeal;
}

export interface IDecomplishDealPayload {
    date: string;
    deal: IDeal;
}

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setHistory(state: IHistorySliceScheme, action: PayloadAction<IHistoryItem[]>) {
            state.items = action.payload;
        },
        accomplishDeal(state: IHistorySliceScheme, action: PayloadAction<IAccomplishDealPayload>) {
            const { deal, date, count } = action.payload;
            const historyItem = state.items.find(item => sameDay(item.date, date));
            if (historyItem) {
                if (!historyItem.done[deal.name]) historyItem.done[deal.name] = 0;
                historyItem.done[deal.name] += count;
            } else {
                const newHistoryItem: IHistoryItem = {
                    date,
                    done: {
                        [deal.name]: count,
                    },
                };
                state.items.push(newHistoryItem);
            }
        },
        decomplishDeal(state: IHistorySliceScheme, action: PayloadAction<IDecomplishDealPayload>) {
            const { deal, date } = action.payload;
            const historyItem = state.items.find(item => sameDay(item.date, date));
            if (historyItem) {
                if (historyItem.done[deal.name] && historyItem.done[deal.name] > 0) {
                    historyItem.done[deal.name]--;
                }
            }
        },
    },
});

export const { actions: historyActions } = historySlice;
export const { reducer: historyReducer } = historySlice;
