import { updateDealsDataInStorage } from '../../../data/localStorage/deals';
import { dealsActions } from '../../slices/deals/dealsSlice';
import { AppThunk } from '../../store';

export const buildDeal = (dealName: string) => ({
    name: dealName,
});

export const thunkCreateDeal = (dealName: string): AppThunk => {
    return (dispatch, getState) => {
        const newDeal = buildDeal(dealName);
        dispatch(dealsActions.tryAddDeal(newDeal));
        updateDealsDataInStorage(getState().deals.deals);
    };
};
