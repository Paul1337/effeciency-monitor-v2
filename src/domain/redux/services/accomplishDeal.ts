import localStorageConfig from '../../config/localStorage/localStorageConfig';
import { IDeal } from '../../entities/Deal/model';
import { historyActions } from '../slices/history/historySlice';
import { AppThunk } from '../store';

export interface IAccomplishDealParams {
    deal: IDeal;
    count?: number;
    date?: string;
}

export const thunkAccomplishDeal = (params: IAccomplishDealParams): AppThunk => {
    const { deal, count = 1, date = new Date().toString() } = params;

    return (dispatch, getState) => {
        dispatch(historyActions.accomplishDeal({ deal, count, date }));
        const history = getState().history.items;
        localStorage.setItem(localStorageConfig.HistoryKey, JSON.stringify(history));
    };
};
