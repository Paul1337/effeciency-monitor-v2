import { updatePlansDataInStorage } from '../../../../data/localStorage/plans';
import { generateDailyPlanID } from '../../../../entities/PlanItem/lib';
import { IDailyPlan, TWeekdaysCount } from '../../../../entities/PlanItem/model';
import { stringifyDate } from '../../../../shared/dates/datesOperations';
import { plansActions } from '../../../slices/plans/plansSlice';
import { AppThunk } from '../../../store';
import { thunkCreateDeal } from '../../deal/createDeal';

interface ICreateDailyPlanParams {
    dealName: string;
    weekdaysCount: TWeekdaysCount;
}

export const thunkCreateDailyPlan = (params: ICreateDailyPlanParams): AppThunk => {
    const thunkFn: AppThunk = (dispatch, getState) => {
        const state = getState();
        const deal = state.deals.deals.find(deal => deal.name === params.dealName);
        if (!deal) {
            dispatch(thunkCreateDeal(params.dealName));
            return thunkFn(dispatch, getState, undefined);
        }
        const plan: IDailyPlan = {
            deal: deal,
            weekdaysCount: params.weekdaysCount,
            startDate: stringifyDate(new Date()),
            id: generateDailyPlanID(params),
        };
        dispatch(plansActions.addDailyPlan(plan));
        const newState = getState();
        updatePlansDataInStorage(newState.plans);
    };
    return thunkFn;
};
