import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPlansSliceScheme } from './types';
import { IDailyPlan, IPlanItem } from '../../../entities/PlanItem/model';
import { IDeal } from '../../../entities/Deal/model';

const initialState: IPlansSliceScheme = {
    longPlans: [],
    dailyPlans: [],
};

export interface ISetDataPayload {
    longPlans: IPlansSliceScheme['longPlans'];
    dailyPlans: IPlansSliceScheme['dailyPlans'];
}

const plansSlice = createSlice({
    name: 'plans',
    initialState,
    reducers: {
        setData(state: IPlansSliceScheme, action: PayloadAction<ISetDataPayload>) {
            state.longPlans = action.payload.longPlans ?? [];
            state.dailyPlans = action.payload.dailyPlans ?? [];
        },
        addLongPlan(state: IPlansSliceScheme, action: PayloadAction<IPlanItem>) {
            const sameDeal = (plan: IPlanItem) => plan.deal.name === action.payload.deal.name;
            if (!state.longPlans.find(sameDeal)) {
                state.longPlans.push(action.payload);
            }
        },
        addDailyPlan(state: IPlansSliceScheme, action: PayloadAction<IDailyPlan>) {
            const sameDeal = (plan: IDailyPlan) => plan.deal.name === action.payload.deal.name;
            if (!state.dailyPlans.find(sameDeal)) {
                state.dailyPlans.push(action.payload);
            }
        },
        removeDailyPlanByDeal(state: IPlansSliceScheme, action: PayloadAction<IDeal>) {
            state.dailyPlans = state.dailyPlans.filter((plan) => plan.deal.name !== action.payload.name);
        },
        removeLongPlanByDeal(state: IPlansSliceScheme, action: PayloadAction<IDeal>) {
            state.longPlans = state.longPlans.filter((plan) => plan.deal.name !== action.payload.name);
        },
    },
});

export const { actions: plansActions } = plansSlice;
export const { reducer: plansReducer } = plansSlice;
