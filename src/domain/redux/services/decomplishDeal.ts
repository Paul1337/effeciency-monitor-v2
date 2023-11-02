import localStorageConfig from '../../config/localStorage/localStorageConfig';
import { IDeal } from '../../entities/Deal/model';
import { historyActions } from '../slices/history/historySlice';
import { AppThunk } from '../store';

export interface IDecomplishDealParams {
    deal: IDeal;
    date?: string;
}

export const thunkDecomplishDeal = (params: IDecomplishDealParams): AppThunk => {
    const { deal, date = new Date().toString() } = params;

    return (dispatch, getState) => {
        dispatch(historyActions.decomplishDeal({ deal, date }));
        const history = getState().history.items;
        localStorage.setItem(localStorageConfig.HistoryKey, JSON.stringify(history));
    };
};
