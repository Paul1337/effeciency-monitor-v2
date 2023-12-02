import { historyApi } from '../../../../api/history';
import { mapHistory } from '../../../../dbMapping/history';
import { statConfig } from '../../../config/stat/config';
import { historyActions } from '../../slices/history/historySlice';
import { AppThunk } from '../../store';

export const thunkLoadLastHistory = (): AppThunk => {
    return async dispatch => {
        const history = await historyApi.getLastHistory(statConfig.lastDays);
        dispatch(historyActions.setHistory(mapHistory(history)));
    };
};
