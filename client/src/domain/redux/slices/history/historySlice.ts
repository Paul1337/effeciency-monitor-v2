import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IDeal } from '../../../models/Deal/model';
import { IHistoryItem } from '../../../models/HistoryItem/model';
import { IHistorySliceScheme } from './types';
import { stringifyDate } from '../../../../lib/dates/datesOperations';

const initialState: IHistorySliceScheme = {
    items: [],
    today: null,
};

export interface IAccomplishDealPayload {
    deal: IDeal;
}

export interface IDecomplishDealPayload {
    deal: IDeal;
}

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setHistory(state: IHistorySliceScheme, action: PayloadAction<IHistoryItem[]>) {
            state.items = action.payload;
        },
        setTodayHistory(state: IHistorySliceScheme, action: PayloadAction<IHistoryItem | undefined>) {
            if (action.payload) {
                state.today = action.payload;
            } else {
                state.today = {
                    date: stringifyDate(new Date()),
                    done: {},
                };
            }
        },
        accomplishDeal(state: IHistorySliceScheme, action: PayloadAction<IAccomplishDealPayload>) {
            const { deal } = action.payload;
            if (!state.today) return state;
            if (!state.today.done[deal.name]) state.today.done[deal.name] = 0;
            state.today.done[deal.name]++;
        },
        decomplishDeal(state: IHistorySliceScheme, action: PayloadAction<IDecomplishDealPayload>) {
            const { deal } = action.payload;
            if (!state.today) return state;
            if (state.today.done[deal.name]) {
                state.today.done[deal.name]--;
            }
        },
    },
});

export const { actions: historyActions } = historySlice;
export const { reducer: historyReducer } = historySlice;
