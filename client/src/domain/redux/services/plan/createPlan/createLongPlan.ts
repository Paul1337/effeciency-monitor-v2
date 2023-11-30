import { updatePlansDataInStorage } from '../../../../data/localStorage/plans';
import { generateLongPlanID } from '../../../../models/PlanItem/lib';
import { IPlanItem } from '../../../../models/PlanItem/model';
import { stringifyDate } from '../../../../../lib/dates/datesOperations';
import { plansActions } from '../../../slices/plans/plansSlice';
import { AppThunk } from '../../../store';
import { longPlansApi } from '../../../../../api/plans/longPlans';

interface ICreateLongPlanParams {
    dealName: string;
    date: string;
    count: number;
}

export const thunkCreateLongPlan = (params: ICreateLongPlanParams): AppThunk => {
    return async (dispatch, getState) => {
        const state = getState();
        const deal = state.deals.deals.find(deal => deal.name === params.dealName);
        if (!deal) return;
        const planId = await longPlansApi.addPlan({
            count: params.count,
            date: params.date,
            dealId: deal.id,
        });
        dispatch(
            plansActions.addLongPlan({
                deal,
                count: params.count,
                date: params.date,
                startDate: stringifyDate(new Date()),
                id: planId,
            })
        );
    };
};
