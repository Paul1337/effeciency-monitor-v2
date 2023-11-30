import { dailyPlansApi } from '../../../../api/plans/dailyPlans';
import { longPlansApi } from '../../../../api/plans/longPlans';
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
    return async (dispatch, getState) => {
        await dailyPlansApi.removePlan({
            planId: plan.id,
        });

        dispatch(plansActions.removeDailyPlanByID(plan.id));

        if (isDealUseless(getState(), plan.deal)) {
            dispatch(thunkRemoveDeal(plan.deal));
        }
    };
};

export const thunkRemoveLongPlan = (plan: IPlanItem): AppThunk => {
    return async (dispatch, getState) => {
        await longPlansApi.removePlan({
            planId: plan.id,
        });

        dispatch(plansActions.removeLongPlanByID(plan.id));

        if (isDealUseless(getState(), plan.deal)) {
            dispatch(thunkRemoveDeal(plan.deal));
        }
    };
};
