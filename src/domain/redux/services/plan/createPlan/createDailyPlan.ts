import { updatePlansDataInStorage } from '../../../../data/localStorage/plans';
import { generateDailyPlanID } from '../../../../entities/PlanItem/lib';
import { IDailyPlan, TWeekdaysCount } from '../../../../entities/PlanItem/model';
import { plansActions } from '../../../slices/plans/plansSlice';
import { AppThunk } from '../../../store';

interface ICreateDailyPlanParams {
    dealName: string;
    weekdaysCount: TWeekdaysCount;
}

export const thunkCreateDailyPlan = (params: ICreateDailyPlanParams): AppThunk => {
    return (dispatch, getState) => {
        const state = getState();
        const deal = state.deals.deals.find(deal => deal.name === params.dealName);
        if (!deal) return;
        const plan: IDailyPlan = {
            deal: deal,
            weekdaysCount: params.weekdaysCount,
            id: generateDailyPlanID(params),
        };
        dispatch(plansActions.addDailyPlan(plan));
        const newState = getState();
        updatePlansDataInStorage(newState.plans);
    };
};
