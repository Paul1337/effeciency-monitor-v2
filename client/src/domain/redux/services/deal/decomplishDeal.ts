import { dealsApi } from '../../../../api/deals';
import { IDeal } from '../../../models/Deal/model';
import { historyActions } from '../../slices/history/historySlice';
import { AppThunk } from '../../store';

export interface IDecomplishDealParams {
    deal: IDeal;
}

export const thunkDecomplishDeal = (params: IDecomplishDealParams): AppThunk => {
    const { deal } = params;

    return (dispatch, getState) => {
        dealsApi
            .unDoDeal({
                dealId: deal.id,
            })
            .then(() => {
                dispatch(historyActions.decomplishDeal({ deal }));
            });
    };
};
