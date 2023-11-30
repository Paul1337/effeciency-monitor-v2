import { dealsApi } from '../../../../api/deals';
import { IDeal } from '../../../models/Deal/model';
import { historyActions } from '../../slices/history/historySlice';
import { AppThunk } from '../../store';

export interface IAccomplishDealParams {
    deal: IDeal;
}

export const thunkAccomplishDeal = (params: IAccomplishDealParams): AppThunk => {
    const { deal } = params;

    return (dispatch, getState) => {
        dealsApi
            .doDeal({
                dealId: deal.id,
            })
            .then(() => {
                dispatch(historyActions.accomplishDeal({ deal }));
            });
    };
};
