import localStorageConfig from '../../config/localStorage/localStorageConfig';
import { dealsActions } from '../slices/deals/dealsSlice';
import { AppThunk } from '../store';

export const buildDeal = (dealName: string) => ({
    name: dealName,
});

export const thunkCreateDeal = (dealName: string): AppThunk => {
    return (dispatch, getState) => {
        const newDeal = buildDeal(dealName);
        dispatch(dealsActions.tryAddDeal(newDeal));
        const { deals, addError } = getState().deals;
        if (!addError) {
            localStorage.setItem(localStorageConfig.DealsKey, JSON.stringify(deals));
        }
    };
};
