import { updatePlansDataInStorage } from '../../../../data/localStorage/plans';
import { generateDailyPlanID } from '../../../../models/PlanItem/lib';
import { IDailyPlan, TWeekdaysCount } from '../../../../models/PlanItem/model';
import { stringifyDate } from '../../../../../lib/dates/datesOperations';
import { plansActions } from '../../../slices/plans/plansSlice';
import { AppThunk } from '../../../store';
import { thunkCreateDeal } from '../../deal/createDeal';
import { dailyPlansApi } from '../../../../../api/plans/dailyPlans';

interface ICreateDailyPlanParams {
    dealName: string;
    weekdaysCount: TWeekdaysCount;
}

export const thunkCreateDailyPlan = (params: ICreateDailyPlanParams): AppThunk => {
    const thunkFn: AppThunk = async (dispatch, getState) => {
        const state = getState();
        const deal = state.deals.deals.find(deal => deal.name === params.dealName);
        if (!deal) {
            await dispatch(thunkCreateDeal(params.dealName));
            return thunkFn(dispatch, getState, undefined);
        }
        const planId = await dailyPlansApi.addPlan({
            dealId: deal.id,
            weekdaysCount: params.weekdaysCount,
        });

        dispatch(
            plansActions.addDailyPlan({
                deal,
                id: planId,
                weekdaysCount: params.weekdaysCount,
                startDate: stringifyDate(new Date()),
            })
        );
    };
    return thunkFn;
};
