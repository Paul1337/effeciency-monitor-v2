import localStorageConfig from '../../../config/localStorage/localStorageConfig';
import { IDeal } from '../../../entities/Deal/model';
import { stringifyDate } from '../../../shared/dates/datesOperations';
import { historyActions } from '../../slices/history/historySlice';
import { AppThunk } from '../../store';

export interface IAccomplishDealParams {
    deal: IDeal;
    count?: number;
    date?: string;
}

export const thunkAccomplishDeal = (params: IAccomplishDealParams): AppThunk => {
    const { deal, count = 1, date = stringifyDate(new Date()) } = params;

    return (dispatch, getState) => {
        dispatch(historyActions.accomplishDeal({ deal, count, date }));
        const history = getState().history.items;
        localStorage.setItem(localStorageConfig.HistoryKey, JSON.stringify(history));
    };
};
