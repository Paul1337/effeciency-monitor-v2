import { updatePlansDataInStorage } from '../../../../data/localStorage/plans';
import { generateDailyPlanID } from '../../../../entities/PlanItem/lib';
import { IDailyPlan, TWeekdaysCount } from '../../../../entities/PlanItem/model';
import { plansActions } from '../../../slices/plans/plansSlice';
import { AppDispatch, AppThunk, RootState } from '../../../store';
import { thunkCreateDeal } from '../../deal/createDeal';

interface ICreateDailyPlanParams {
    dealName: string;
    weekdaysCount: TWeekdaysCount;
}

export const thunkCreateDailyPlan = (params: ICreateDailyPlanParams): AppThunk => {
    const thunkFn: AppThunk = (dispatch, getState) => {
        const state = getState();
        const deal = state.deals.deals.find((deal) => deal.name === params.dealName);
        if (!deal) {
            dispatch(thunkCreateDeal(params.dealName));
            return thunkFn(dispatch, getState, undefined);
        }
        const plan: IDailyPlan = {
            deal: deal,
            weekdaysCount: params.weekdaysCount,
            id: generateDailyPlanID(params),
        };
        dispatch(plansActions.addDailyPlan(plan));
        const newState = getState();
        updatePlansDataInStorage(newState.plans);
    };
    return thunkFn;
};
