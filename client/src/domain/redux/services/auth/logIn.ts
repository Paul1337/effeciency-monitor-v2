import { authApi } from '../../../../api/auth';
import { axiosInstance } from '../../../../api/instance';
import { setAuthToken } from '../../../data/localStorage/auth';
import { userActions } from '../../slices/user/userSlice';
import { AppThunk } from '../../store';
import { thunkLoadData } from '../loadData';

interface IThunkLogIn {
    email: string;
    password: string;
}

export const thunkLogIn = (data: IThunkLogIn): AppThunk<Promise<any>> => {
    return async dispatch => {
        try {
            const response = await authApi.logIn(data);
            const { authToken, userData } = response;
            setAuthToken(authToken);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
            dispatch(userActions.setLogged(true));
            dispatch(userActions.setUserData(userData));
            dispatch(thunkLoadData());
            console.log('Login response', response);
            return Promise.resolve();
        } catch (err) {
            console.log('Error logging in', err);
            return Promise.reject();
        }
    };
};
