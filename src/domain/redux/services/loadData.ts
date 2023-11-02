import localStorageConfig from '../../config/localStorage/localStorageConfig';
import { dealsActions } from '../slices/deals/dealsSlice';
import { historyActions } from '../slices/history/historySlice';
import { plansActions } from '../slices/plans/plansSlice';
import { AppThunk } from '../store';

export const thunkLoadData = (): AppThunk => {
    return (dispatch) => {
        const dealsStr = localStorage.getItem(localStorageConfig.DealsKey);
        if (dealsStr) dispatch(dealsActions.setDeals(JSON.parse(dealsStr)));

        const historyStr = localStorage.getItem(localStorageConfig.HistoryKey);
        if (historyStr) dispatch(historyActions.setHistory(JSON.parse(historyStr)));

        const plansStr = localStorage.getItem(localStorageConfig.PlansKey);
        if (plansStr) dispatch(plansActions.setData(JSON.parse(plansStr)));
    };
};
