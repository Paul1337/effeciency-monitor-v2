import { loadUserData } from '../../../../api/auth/loadUserData';
import { userActions } from '../../slices/user/userSlice';
import { AppThunk } from '../../store';

export const thunkLoadUserData = (): AppThunk => {
    return async dispatch => {
        try {
            const response = await loadUserData();
            console.log('Auth ok', response);
            dispatch(userActions.setLogged(true));
            dispatch(userActions.setUserData(response));
        } catch (err) {
            console.log('Not authed');
            dispatch(userActions.setLogged(false));
        }
    };
};
