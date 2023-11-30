import { dealsApi } from '../../../../api/deals';
import { IDeal } from '../../../models/Deal/model';
import { dealsActions } from '../../slices/deals/dealsSlice';
import { AppThunk } from '../../store';

export const thunkCreateDeal = (dealName: string): AppThunk<Promise<any>> => {
    return async (dispatch, getState) => {
        try {
            await dealsApi.createDeal(dealName).then(dealId => {
                const newDeal: IDeal = {
                    name: dealName,
                    id: dealId,
                };
                dispatch(dealsActions.tryAddDeal(newDeal));
            });
        } catch (err) {
            console.log('Error while creating deal: ', err);
        }
    };
};
