import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IDealsSliceSchema } from './types';
import { IDeal } from '../../../entities/Deal/model';

const initialState: IDealsSliceSchema = {
    deals: [],
};

const dealsSlice = createSlice({
    name: 'deals',
    initialState,
    reducers: {
        setDeals(state: IDealsSliceSchema, action: PayloadAction<IDeal[]>) {
            state.deals = action.payload;
        },
        tryAddDeal(state: IDealsSliceSchema, action: PayloadAction<IDeal>) {
            state.deals.push(action.payload);
        },
        removeDeal(state: IDealsSliceSchema, action: PayloadAction<IDeal>) {
            state.deals = state.deals.filter(deal => deal.name !== action.payload.name);
        },
    },
});

export const { actions: dealsActions } = dealsSlice;
export const { reducer: dealsReducer } = dealsSlice;
