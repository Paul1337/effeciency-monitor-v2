import localStorageConfig from '../../../../config/localStorage/localStorageConfig';
import { IDeal } from '../../../models/Deal/model';
import { dealsActions } from '../../slices/deals/dealsSlice';
import { AppThunk } from '../../store';

export const thunkRemoveDeal = (deal: IDeal): AppThunk => {
    return (dispatch, getState) => {
        dispatch(dealsActions.removeDeal(deal));
        const deals = getState().deals.deals;
        localStorage.setItem(localStorageConfig.DealsKey, JSON.stringify(deals));
    };
};
