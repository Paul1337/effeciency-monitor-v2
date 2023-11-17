import localStorageConfig from '../../../../config/localStorage/localStorageConfig';
import { IDeal } from '../../../models/Deal/model';
import { stringifyDate } from '../../../../lib/dates/datesOperations';
import { historyActions } from '../../slices/history/historySlice';
import { AppThunk } from '../../store';

export interface IDecomplishDealParams {
    deal: IDeal;
    date?: string;
}

export const thunkDecomplishDeal = (params: IDecomplishDealParams): AppThunk => {
    const { deal, date = stringifyDate(new Date()) } = params;

    return (dispatch, getState) => {
        dispatch(historyActions.decomplishDeal({ deal, date }));
        const history = getState().history.items;
        localStorage.setItem(localStorageConfig.HistoryKey, JSON.stringify(history));
    };
};
