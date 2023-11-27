import { authApi } from '../../../../api/auth';
import { setAuthToken } from '../../../data/localStorage/auth';
import { userActions } from '../../slices/user/userSlice';
import { AppThunk } from '../../store';

interface IThunkLogIn {
    email: string;
    password: string;
}

export const thunkLogIn = (data: IThunkLogIn): AppThunk => {
    return async (dispatch) => {
        try {
            const response = await authApi.logIn(data);
            const { authToken, userData } = response;
            setAuthToken(authToken);
            dispatch(userActions.setLogged(true));
            dispatch(userActions.setUserData(userData));
            console.log('Login response', response);
        } catch (err) {
            console.log('Error logging in', err);
        }
    };
};
