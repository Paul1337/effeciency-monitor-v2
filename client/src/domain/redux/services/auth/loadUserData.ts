import { authApi } from '../../../../api/auth';
import { userActions } from '../../slices/user/userSlice';
import { AppThunk } from '../../store';

export const thunkLoadUserData = (): AppThunk<Promise<any>> => {
    return async dispatch => {
        try {
            const response = await authApi.loadUserData();
            console.log('Auth ok', response);
            dispatch(userActions.setLogged(true));
            dispatch(userActions.setUserData(response));
        } catch (err) {
            console.log('Not authed');
            dispatch(userActions.setLogged(false));
        }
        return Promise.resolve();
    };
};
