import { updatePlansDataInStorage } from '../../../data/localStorage/plans';
import { IDailyPlan, IPlanItem } from '../../../entities/PlanItem/model';
import { plansActions } from '../../slices/plans/plansSlice';
import { AppThunk } from '../../store';

export const thunkRemoveDailyPlan = (plan: IDailyPlan): AppThunk => {
    return (dispatch, getState) => {
        dispatch(plansActions.removeDailyPlanByID(plan.id));
        updatePlansDataInStorage(getState().plans);
    };
};

export const thunkRemoveLongPlan = (plan: IPlanItem): AppThunk => {
    return (dispatch, getState) => {
        dispatch(plansActions.removeLongPlanByID(plan.id));
        updatePlansDataInStorage(getState().plans);
    };
};
