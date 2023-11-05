import { IDeal } from '../../../entities/Deal/model';
import { IDailyPlan, IPlanItem } from '../../../entities/PlanItem/model';
import { plansActions } from '../../slices/plans/plansSlice';
import { AppThunk } from '../../store';

interface ICreateDailyPlanParams {
    deal: IDeal;
    weekdays: Array<number>;
    count: number;
}

const generateDailyPlanID = (params: ICreateDailyPlanParams) => {
    return params.deal.name + params.weekdays.toString() + params.count.toString();
};

export const thunkCreateDailyPlan = (params: ICreateDailyPlanParams): AppThunk => {
    return dispatch => {
        const plan: IDailyPlan = {
            deal: params.deal,
            weekdays: params.weekdays,
            count: params.count,
            id: generateDailyPlanID(params),
        };
        dispatch(plansActions.addDailyPlan(plan));
    };
};

interface ICreateLongPlanParams {
    deal: IDeal;
    date: string;
    count: number;
}

const generateLongPlanID = (params: ICreateLongPlanParams) => {
    return params.deal.name + params.date + params.count.toString();
};

export const thunkCreateLongPlan = (params: ICreateLongPlanParams): AppThunk => {
    return dispatch => {
        const plan: IPlanItem = {
            deal: params.deal,
            count: params.count,
            date: params.date,
            startDate: stringifyDate(new Date()),
            id: generateLongPlanID(params),
        };
        dispatch(plansActions.addLongPlan(plan));
    };
};
