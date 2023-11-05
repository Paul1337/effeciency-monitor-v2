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
            const samePlan = (plan: IPlanItem) => plan.id === action.payload.id;
            if (!state.longPlans.find(samePlan)) {
                state.longPlans.push(action.payload);
            }
        },
        addDailyPlan(state: IPlansSliceScheme, action: PayloadAction<IDailyPlan>) {
            const samePlan = (plan: IDailyPlan) => plan.id === action.payload.id;
            if (!state.dailyPlans.find(samePlan)) {
                state.dailyPlans.push(action.payload);
            }
        },
        removeDailyPlanByID(state: IPlansSliceScheme, action: PayloadAction<IDailyPlan['id']>) {
            state.dailyPlans = state.dailyPlans.filter(plan => plan.id !== action.payload);
        },
        removeLongPlanByID(state: IPlansSliceScheme, action: PayloadAction<IPlanItem['id']>) {
            state.longPlans = state.longPlans.filter(plan => plan.id !== action.payload);
        },
    },
});

export const { actions: plansActions } = plansSlice;
export const { reducer: plansReducer } = plansSlice;
