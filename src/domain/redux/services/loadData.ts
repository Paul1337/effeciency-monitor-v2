import localStorageConfig from '../../config/localStorage/localStorageConfig';
import { generateDailyPlanID, generateLongPlanID } from '../../entities/PlanItem/lib';
import { dealsActions } from '../slices/deals/dealsSlice';
import { historyActions } from '../slices/history/historySlice';
import { plansActions } from '../slices/plans/plansSlice';
import { IPlansSliceScheme } from '../slices/plans/types';
import { AppThunk } from '../store';

export const thunkLoadData = (): AppThunk => {
    return dispatch => {
        const dealsStr = localStorage.getItem(localStorageConfig.DealsKey);
        if (dealsStr) dispatch(dealsActions.setDeals(JSON.parse(dealsStr)));

        const historyStr = localStorage.getItem(localStorageConfig.HistoryKey);
        if (historyStr) dispatch(historyActions.setHistory(JSON.parse(historyStr)));

        const plansStr = localStorage.getItem(localStorageConfig.PlansKey);
        if (plansStr) {
            const plans = JSON.parse(plansStr) as IPlansSliceScheme;
            for (const plan of plans.dailyPlans) {
                if (plan.id) continue;
                plan.id = generateDailyPlanID(plan);
            }
            for (const plan of plans.longPlans) {
                if (plan.id) continue;
                plan.id = generateLongPlanID(plan);
            }
            dispatch(plansActions.setData(plans));
        }
    };
};
