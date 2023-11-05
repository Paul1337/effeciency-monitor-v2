import { IDailyPlan, IPlanItem } from '../../../entities/PlanItem/model';
import { plansActions } from '../../slices/plans/plansSlice';
import { AppThunk } from '../../store';

export const thunkRemoveDailyPlan = (plan: IDailyPlan): AppThunk => {
    return dispatch => {
        dispatch(plansActions.removeDailyPlanByID(plan.id));
    };
};

export const thunkRemoveLongPlan = (plan: IPlanItem): AppThunk => {
    return dispatch => {
        dispatch(plansActions.removeLongPlanByID(plan.id));
    };
};
