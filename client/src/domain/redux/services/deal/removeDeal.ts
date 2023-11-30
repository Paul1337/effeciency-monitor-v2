import { IDeal } from '../../../models/Deal/model';
import { dealsActions } from '../../slices/deals/dealsSlice';
import { AppThunk } from '../../store';

export const thunkRemoveDeal = (deal: IDeal): AppThunk => {
    return (dispatch, getState) => {
        // dealsApi
        //     .removeDeal({
        //         dealId: deal.id,
        //     })
        //     .then(() => {
        //     });
        dispatch(dealsActions.removeDeal(deal));
    };
};
