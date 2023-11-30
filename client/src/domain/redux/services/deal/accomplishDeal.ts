import localStorageConfig from '../../../../config/localStorage/localStorageConfig';
import { IDeal } from '../../../models/Deal/model';
import { stringifyDate } from '../../../../lib/dates/datesOperations';
import { historyActions } from '../../slices/history/historySlice';
import { AppThunk } from '../../store';
import { dealsApi } from '../../../../api/deals';

export interface IAccomplishDealParams {
    deal: IDeal;
    date?: string;
}

export const thunkAccomplishDeal = (params: IAccomplishDealParams): AppThunk => {
    const { deal, date = stringifyDate(new Date()) } = params;

    return (dispatch, getState) => {
        dealsApi
            .doDeal({
                dealId: deal.id,
            })
            .then(() => {
                dispatch(historyActions.accomplishDeal({ deal, count: 1, date }));
            });
    };
};
