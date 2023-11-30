import { AxiosError } from 'axios';
import { authApi } from '../../../../api/auth';
import { AppThunk } from '../../store';

interface IThunkRegister {
    email: string;
    password: string;
}

interface IThunkRegisterResult {
    error?: string;
}

export const thunkRegister = (data: IThunkRegister): AppThunk<Promise<IThunkRegisterResult>> => {
    return async dispatch => {
        try {
            const response = await authApi.register(data);
            console.log('Register response', response);
            return {};
        } catch (err) {
            console.log('Error registering', err);
            return {
                error: err?.toString() ?? 'Server error',
            };
        }
    };
};
