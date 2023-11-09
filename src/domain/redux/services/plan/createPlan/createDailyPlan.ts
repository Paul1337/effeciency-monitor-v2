import { updatePlansDataInStorage } from '../../../../data/localStorage/plans';
import { generateDailyPlanID } from '../../../../entities/PlanItem/lib';
import { IDailyPlan } from '../../../../entities/PlanItem/model';
import { plansActions } from '../../../slices/plans/plansSlice';
import { AppThunk } from '../../../store';

interface ICreateDailyPlanParams {
    dealName: string;
    weekdays: Array<number>;
    count: number;
}

export const thunkCreateDailyPlan = (params: ICreateDailyPlanParams): AppThunk => {
    return (dispatch, getState) => {
        const state = getState();
        const deal = state.deals.deals.find(deal => deal.name === params.dealName);
        if (!deal) return;
        const plan: IDailyPlan = {
            deal: deal,
            weekdays: params.weekdays,
            count: params.count,
            id: generateDailyPlanID(params),
        };
        dispatch(plansActions.addDailyPlan(plan));
        const newState = getState();
        updatePlansDataInStorage(newState.plans);
    };
};
