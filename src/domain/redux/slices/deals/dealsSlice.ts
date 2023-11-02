import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IDealsSliceSchema } from './types';
import { IDeal } from '../../../entities/Deal/model';
import { isValidDealName } from './lib/validateDeal';

const initialState: IDealsSliceSchema = {
    deals: [],
    addError: null,
};

const dealsSlice = createSlice({
    name: 'deals',
    initialState,
    reducers: {
        setDeals(state: IDealsSliceSchema, action: PayloadAction<IDeal[]>) {
            state.deals = action.payload;
        },
        tryAddDeal(state: IDealsSliceSchema, action: PayloadAction<IDeal>) {
            if (!isValidDealName(action.payload.name)) {
                state.addError = 'Deal name is not valid';
                return state;
            }

            const dealWithSameName = state.deals.find((deal) => deal.name === action.payload.name);
            if (!dealWithSameName) {
                state.deals.push(action.payload);
                state.addError = null;
            } else {
                state.addError = `Deal with name ${action.payload.name} already exists`;
            }
        },
        clearError(state: IDealsSliceSchema) {
            state.addError = null;
        },
        removeDeal(state: IDealsSliceSchema, action: PayloadAction<IDeal>) {
            state.deals = state.deals.filter((deal) => deal.name !== action.payload.name);
        },
    },
});

export const { actions: dealsActions } = dealsSlice;
export const { reducer: dealsReducer } = dealsSlice;
