import { updateDealsDataInStorage } from '../../../data/localStorage/deals';
import { updatePlansDataInStorage } from '../../../data/localStorage/plans';
import { IDeal } from '../../../models/Deal/model';
import { IDailyPlan, IPlanItem } from '../../../models/PlanItem/model';
import { plansActions } from '../../slices/plans/plansSlice';
import { AppThunk, RootState } from '../../store';
import { thunkRemoveDeal } from '../deal/removeDeal';

const isDealUseless = (state: RootState, deal: IDeal): boolean => {
    const inDailyPlans = state.plans.dailyPlans.some(plan => plan.deal.name === deal.name);
    const inLongPlans = state.plans.longPlans.some(plan => plan.deal.name === deal.name);

    return !inDailyPlans && !inLongPlans;
};

export const thunkRemoveDailyPlan = (plan: IDailyPlan): AppThunk => {
    return (dispatch, getState) => {
        dispatch(plansActions.removeDailyPlanByID(plan.id));
        const plansState = getState().plans;
        updatePlansDataInStorage(plansState);

        if (isDealUseless(getState(), plan.deal)) {
            dispatch(thunkRemoveDeal(plan.deal));
            const dealsState = getState().deals.deals;
            updateDealsDataInStorage(dealsState);
        }
    };
};

export const thunkRemoveLongPlan = (plan: IPlanItem): AppThunk => {
    return (dispatch, getState) => {
        dispatch(plansActions.removeLongPlanByID(plan.id));
        updatePlansDataInStorage(getState().plans);

        if (isDealUseless(getState(), plan.deal)) {
            dispatch(thunkRemoveDeal(plan.deal));
            const dealsState = getState().deals.deals;
            updateDealsDataInStorage(dealsState);
        }
    };
};
