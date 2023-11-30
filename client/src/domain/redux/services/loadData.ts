import { dealsApi } from '../../../api/deals';
import { historyApi } from '../../../api/history';
import { dailyPlansApi } from '../../../api/plans/dailyPlans';
import { longPlansApi } from '../../../api/plans/longPlans';
import { mapDailyPlans } from '../../../dbMapping/dailyPlan';
import { mapHistory } from '../../../dbMapping/history';
import { mapLongPlans } from '../../../dbMapping/longPlan';
import { dealsActions } from '../slices/deals/dealsSlice';
import { historyActions } from '../slices/history/historySlice';
import { plansActions } from '../slices/plans/plansSlice';
import { AppThunk } from '../store';

export const thunkLoadData = (): AppThunk => {
    return async dispatch => {
        try {
            const deals = await dealsApi.getDeals();
            dispatch(dealsActions.setDeals(deals));

            const history = await historyApi.getHistory();
            dispatch(historyActions.setHistory(mapHistory(history)));

            const dailyPlans = await dailyPlansApi.getPlans();
            const longPlans = await longPlansApi.getPlans();

            dispatch(
                plansActions.setData({
                    dailyPlans: mapDailyPlans(dailyPlans, deals),
                    longPlans: mapLongPlans(longPlans, deals),
                })
            );
        } catch (err) {
            console.log('Could not load data: ', err);
        }
    };
};
