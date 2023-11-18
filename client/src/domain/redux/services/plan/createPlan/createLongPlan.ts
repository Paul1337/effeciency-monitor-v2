import { updatePlansDataInStorage } from '../../../../data/localStorage/plans';
import { generateLongPlanID } from '../../../../models/PlanItem/lib';
import { IPlanItem } from '../../../../models/PlanItem/model';
import { stringifyDate } from '../../../../../lib/dates/datesOperations';
import { plansActions } from '../../../slices/plans/plansSlice';
import { AppThunk } from '../../../store';

interface ICreateLongPlanParams {
    dealName: string;
    date: string;
    count: number;
}

export const thunkCreateLongPlan = (params: ICreateLongPlanParams): AppThunk => {
    return (dispatch, getState) => {
        const state = getState();
        const deal = state.deals.deals.find(deal => deal.name === params.dealName);
        if (!deal) return;
        const plan: IPlanItem = {
            deal,
            count: params.count,
            date: params.date,
            startDate: stringifyDate(new Date()),
            id: generateLongPlanID(params),
        };
        dispatch(plansActions.addLongPlan(plan));
        const newState = getState();
        updatePlansDataInStorage(newState.plans);
    };
};
