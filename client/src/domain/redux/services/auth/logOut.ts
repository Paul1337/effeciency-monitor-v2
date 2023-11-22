import { removeAuthToken } from '../../../data/localStorage/auth';
import { userActions } from '../../slices/user/userSlice';
import { AppThunk } from '../../store';

export const thunkLogout = (): AppThunk => {
    return (dispatch) => {
        removeAuthToken();
        dispatch(userActions.logout());
    };
};
